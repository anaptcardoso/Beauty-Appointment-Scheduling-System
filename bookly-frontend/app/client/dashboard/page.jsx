'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clients } from '@/lib/api'

export default function ClientDashboardPage() {
    const router = useRouter()
    const [clientName, setClientName] = useState('')
    const [appointmentList, setAppointmentList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('clientToken')
        if (!token) {
            router.push('/client/login')
            return
        }
        setClientName(localStorage.getItem('clientName') || '')
        loadAppointments()
    }, [])

    async function loadAppointments() {
        try {
            const data = await clients.getMyAppointments()
            setAppointmentList(data)
        } catch (err) {
            setError('Failed to load your appointments.')
        } finally {
            setLoading(false)
        }
    }

    function handleLogout() {
        localStorage.removeItem('clientToken')
        localStorage.removeItem('clientName')
        localStorage.removeItem('clientEmail')
        router.push('/client/login')
    }

    const statusColors = {
        pending: { bg: '#fff8e1', color: '#b8860b' },
        confirmed: { bg: '#fdf2f7', color: '#d4688a' },
        cancelled: { bg: '#f5f5f5', color: '#9ca3af' },
        completed: { bg: '#f0fdf4', color: '#16a34a' },
    }

    return (
        <main className="min-h-screen px-4 py-10" style={{ background: '#fdf2f7' }}>
            <div className="mx-auto max-w-2xl">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-medium text-gray-900 mb-1">My appointments</h1>
                        <p className="text-sm text-gray-400">{clientName}</p>
                    </div>
                    <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-gray-600">
                        Sign out
                    </button>
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
                        <p className="text-sm text-gray-400">You don&apos;t have any appointments yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {appointmentList.map((a) => (
                            <div key={a.id} className="bg-white rounded-2xl p-5" style={{ border: '0.5px solid #f5d5e8' }}>
                                <div className="flex items-start justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-900">{a.serviceName}</p>
                                    <span
                                        className="text-xs px-2 py-1 rounded-full font-medium"
                                        style={{
                                            background: statusColors[a.status]?.bg || '#f5f5f5',
                                            color: statusColors[a.status]?.color || '#6b7280',
                                        }}
                                    >
                                        {a.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mb-1">{a.date} · {a.startTime}</p>
                                <p className="text-xs text-gray-400 mb-1">{a.address}</p>
                                <p className="text-sm font-medium mt-2" style={{ color: '#d4688a' }}>€{a.totalPrice}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    )
}