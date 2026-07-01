'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { appointments } from '@/lib/api'

export default function AppointmentsPage() {
    const router = useRouter()
    const [providerName, setProviderName] = useState('')
    const [appointmentList, setAppointmentList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
        router.push('/login')
        return
        }
        setProviderName(localStorage.getItem('providerName') || '')
        loadAppointments()
    }, [router])

    async function loadAppointments() {
        try {
        const data = await appointments.getAll()
        setAppointmentList(data)
        } catch (err) {
        setError('Failed to load appointments.')
        } finally {
        setLoading(false)
        }
    }

    async function handleUpdateStatus(id, status) {
        try {
        await appointments.updateStatus(id, status)
        loadAppointments()
        } catch (err) {
        setError('Failed to update appointment.')
        }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this appointment?')) return
        try {
        await appointments.delete(id)
        loadAppointments()
        } catch (err) {
        setError('Failed to delete appointment.')
        }
    }

    function statusStyle(status) {
        if (status === 'pending') return { background: '#fff8e6', color: '#b45309', border: '1px solid #fde68a' }
        if (status === 'confirmed') return { background: '#fdf2f7', color: '#d4688a', border: '1px solid #f5d5e8' }
        return { background: '#f5f5f5', color: '#999', border: '1px solid #e8e8e8' }
    }

    return (
        <div className="min-h-screen flex" style={{ background: '#fdf2f7' }}>

        {/* Sidebar */}
        <aside className="w-52 bg-white flex flex-col py-6 px-4" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="mb-8">
            <p className="text-sm font-medium text-gray-900">Bookly</p>
            <p className="text-xs text-gray-400 mt-0.5">{providerName}</p>
            </div>
            <nav className="flex flex-col gap-1">
            <a href="/admin" className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">Dashboard</a>
            <a href="/admin/appointments" className="px-3 py-2 rounded-xl text-sm font-medium" style={{ background: '#fdf2f7', color: '#d4688a' }}>Appointments</a>
            <a href="/admin/services" className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">Services</a>
            <a href="/admin/blockouts" className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">Blockouts</a>
            <a href="/admin/settings" className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">Settings</a>
            </nav>
            <button
            onClick={() => { localStorage.clear(); router.push('/login') }}
            className="mt-auto text-left px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-50"
            >
            Sign out
            </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
            <div className="mb-8">
            <h1 className="text-xl font-medium text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your bookings</p>
            </div>

            {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600" style={{ background: '#fff5f5', border: '1px solid #fed7d7' }}>
                {error}
            </div>
            )}

            {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
            ) : appointmentList.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center" style={{ border: '0.5px solid #f5d5e8' }}>
                <p className="text-sm text-gray-400">No appointments yet.</p>
            </div>
            ) : (
            <div className="space-y-3">
                {appointmentList.map((a) => (
                <div
                    key={a.id}
                    className="bg-white rounded-2xl p-5"
                    style={{ border: '0.5px solid #f5d5e8' }}
                >
                    <div className="flex items-start justify-between mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">{a.clientName}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle(a.status)}>
                            {a.status}
                        </span>
                        </div>
                        <p className="text-xs text-gray-400">{a.clientEmail} · {a.clientPhone}</p>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#d4688a' }}>€{a.totalPrice}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-4">
                    <div>
                        <span className="text-xs text-gray-400">Service</span>
                        <p className="text-xs font-medium text-gray-700">{a.serviceName}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400">Date</span>
                        <p className="text-xs font-medium text-gray-700">{a.date}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400">Time</span>
                        <p className="text-xs font-medium text-gray-700">{a.startTime?.slice(0, 5)} – {a.endTime?.slice(0, 5)}</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400">Address</span>
                        <p className="text-xs font-medium text-gray-700">{a.address}</p>
                    </div>
                    </div>

                    {a.notes && (
                    <p className="text-xs text-gray-400 mb-3">Notes: {a.notes}</p>
                    )}

                    <div className="flex gap-2">
                    {a.status === 'pending' && (
                        <button
                        onClick={() => handleUpdateStatus(a.id, 'confirmed')}
                        className="rounded-xl px-3 py-1.5 text-xs font-medium text-white"
                        style={{ background: '#d4688a' }}
                        >
                        Confirm
                        </button>
                    )}
                    {a.status !== 'cancelled' && (
                        <button
                        onClick={() => handleUpdateStatus(a.id, 'cancelled')}
                        className="rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600"
                        style={{ border: '1px solid #e5e7eb' }}
                        >
                        Cancel
                        </button>
                    )}
                    <button
                        onClick={() => handleDelete(a.id)}
                        className="rounded-xl px-3 py-1.5 text-xs font-medium text-red-500"
                        style={{ border: '1px solid #fee2e2' }}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </main>
        </div>
    )
}