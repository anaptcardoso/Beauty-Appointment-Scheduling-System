'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { appointments, services } from '@/lib/api'

export default function AdminPage() {
    const router = useRouter()
    const [providerName, setProviderName] = useState('')
    const [appointmentList, setAppointmentList] = useState([])
    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token')
        if (!token) {
        router.push('/login')
        return
        }

        // Load provider info from localStorage
        setProviderName(localStorage.getItem('providerName') || '')

        // Load data from API
        async function loadData() {
        try {
            const [appts, svcs] = await Promise.all([
            appointments.getAll(),
            services.getAll(),
            ])
            setAppointmentList(appts)
            setServiceList(svcs)
        } catch (err) {
            console.error('Error loading data:', err)
        } finally {
            setLoading(false)
        }
        }

        loadData()
    }, [router])

    function handleLogout() {
        localStorage.clear()
        router.push('/login')
    }

    // Count pending appointments
    const pending = appointmentList.filter(a => a.status === 'pending').length
    const activeServices = serviceList.filter(s => s.active).length

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#fdf2f7' }}>
            <p className="text-sm text-gray-400">Loading...</p>
        </div>
        )
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
            <a href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: '#fdf2f7', color: '#d4688a' }}>
                Dashboard
            </a>
            <a href="/admin/appointments" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
                Appointments
            </a>
            <a href="/admin/services" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
                Services
            </a>
            <a href="/admin/blockouts" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
                Blockouts
            </a>
            <a href="/admin/settings" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
                Settings
            </a>
            </nav>

            <button
            onClick={handleLogout}
            className="mt-auto text-left px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-50"
            >
            Sign out
            </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
            <div className="mb-8">
            <h1 className="text-xl font-medium text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Welcome back, {providerName}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5" style={{ border: '0.5px solid #f5d5e8' }}>
                <p className="text-xs text-gray-400 mb-1">Total appointments</p>
                <p className="text-2xl font-medium text-gray-900">{appointmentList.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-5" style={{ border: '0.5px solid #f5d5e8' }}>
                <p className="text-xs text-gray-400 mb-1">Pending</p>
                <p className="text-2xl font-medium" style={{ color: '#b45309' }}>{pending}</p>
            </div>
            <div className="bg-white rounded-2xl p-5" style={{ border: '0.5px solid #f5d5e8' }}>
                <p className="text-xs text-gray-400 mb-1">Active services</p>
                <p className="text-2xl font-medium text-gray-900">{activeServices}</p>
            </div>
            </div>

            {/* Recent appointments */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-900">Recent appointments</h2>
                <a href="/admin/appointments" className="text-xs" style={{ color: '#d4688a' }}>View all</a>
            </div>

            {appointmentList.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No appointments yet.</p>
            ) : (
                <div className="space-y-3">
                {appointmentList.slice(0, 5).map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-3" style={{ borderBottom: '0.5px solid #fce8f3' }}>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{a.clientName}</p>
                        <p className="text-xs text-gray-400">{a.serviceName} · {a.date} · {a.startTime?.slice(0, 5)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color: '#d4688a' }}>€{a.totalPrice}</span>
                        <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                            background: a.status === 'pending' ? '#fff8e6' : a.status === 'confirmed' ? '#fdf2f7' : '#f5f5f5',
                            color: a.status === 'pending' ? '#b45309' : a.status === 'confirmed' ? '#d4688a' : '#999',
                        }}
                        >
                        {a.status}
                        </span>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </main>
        </div>
    )
}