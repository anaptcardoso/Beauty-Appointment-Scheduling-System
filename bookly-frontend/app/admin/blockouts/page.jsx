'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { blockouts } from '@/lib/api'

export default function BlockoutsPage() {
    const router = useRouter()
    const [providerName, setProviderName] = useState('')
    const [blockoutList, setBlockoutList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Form state
    const [showForm, setShowForm] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [reason, setReason] = useState('')
    const [type, setType] = useState('full_day')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
        router.push('/login')
        return
        }
        setProviderName(localStorage.getItem('providerName') || '')
        loadBlockouts()
    }, [router])

    async function loadBlockouts() {
        try {
        const data = await blockouts.getAll()
        setBlockoutList(data)
        } catch (err) {
        setError('Failed to load blockouts.')
        } finally {
        setLoading(false)
        }
    }

    function openForm() {
        setStartDate('')
        setEndDate('')
        setStartTime('')
        setEndTime('')
        setReason('')
        setType('full_day')
        setShowForm(true)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)

        const data = {
        startDate,
        endDate,
        startTime: type === 'time_range' ? startTime : null,
        endTime: type === 'time_range' ? endTime : null,
        reason,
        type,
        }

        try {
        await blockouts.create(data)
        setShowForm(false)
        loadBlockouts()
        } catch (err) {
        setError('Failed to save blockout.')
        } finally {
        setSaving(false)
        }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this blockout?')) return
        try {
        await blockouts.delete(id)
        loadBlockouts()
        } catch (err) {
        setError('Failed to delete blockout.')
        }
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
            <a href="/admin/appointments" className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">Appointments</a>
            <a href="/admin/services" className="px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50">Services</a>
            <a href="/admin/blockouts" className="px-3 py-2 rounded-xl text-sm font-medium" style={{ background: '#fdf2f7', color: '#d4688a' }}>Blockouts</a>
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
            <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-xl font-medium text-gray-900">Blockouts</h1>
                <p className="text-sm text-gray-400 mt-0.5">Block unavailable dates and times</p>
            </div>
            <button
                onClick={openForm}
                className="rounded-xl px-4 py-2 text-sm font-medium text-white"
                style={{ background: '#d4688a' }}
            >
                Add blockout
            </button>
            </div>

            {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600" style={{ background: '#fff5f5', border: '1px solid #fed7d7' }}>
                {error}
            </div>
            )}

            {/* Form */}
            {showForm && (
            <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '0.5px solid #f5d5e8' }}>
                <h2 className="text-sm font-medium text-gray-900 mb-4">New blockout</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Type</label>
                    <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none bg-white"
                    style={{ border: '1px solid #f5d5e8' }}
                    >
                    <option value="full_day">Full day</option>
                    <option value="time_range">Time range</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Start date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ border: '1px solid #f5d5e8' }}
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">End date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ border: '1px solid #f5d5e8' }}
                    />
                    </div>
                </div>

                {type === 'time_range' && (
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">Start time</label>
                        <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ border: '1px solid #f5d5e8' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">End time</label>
                        <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ border: '1px solid #f5d5e8' }}
                        />
                    </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Reason (optional)</label>
                    <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Holiday, training, personal..."
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                    style={{ border: '1px solid #f5d5e8' }}
                    />
                </div>

                <div className="flex gap-3">
                    <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    style={{ background: '#d4688a' }}
                    >
                    {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                    style={{ border: '0.5px solid #e5e7eb' }}
                    >
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            )}

            {/* Blockouts list */}
            {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
            ) : blockoutList.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center" style={{ border: '0.5px solid #f5d5e8' }}>
                <p className="text-sm text-gray-400">No blockouts yet.</p>
            </div>
            ) : (
            <div className="space-y-3">
                {blockoutList.map((b) => (
                <div
                    key={b.id}
                    className="bg-white rounded-2xl p-4 flex items-center justify-between"
                    style={{ border: '0.5px solid #f5d5e8' }}
                >
                    <div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">
                        {b.startDate === b.endDate ? b.startDate : `${b.startDate} → ${b.endDate}`}
                        </p>
                        <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#fdf2f7', color: '#d4688a', border: '1px solid #f5d5e8' }}
                        >
                        {b.type === 'full_day' ? 'Full day' : 'Time range'}
                        </span>
                    </div>
                    {b.type === 'time_range' && b.startTime && (
                        <p className="text-xs text-gray-400">{b.startTime?.slice(0, 5)} – {b.endTime?.slice(0, 5)}</p>
                    )}
                    {b.reason && (
                        <p className="text-xs text-gray-400">{b.reason}</p>
                    )}
                    </div>
                    <button
                    onClick={() => handleDelete(b.id)}
                    className="rounded-xl px-3 py-1.5 text-xs font-medium text-red-500"
                    style={{ border: '1px solid #fee2e2' }}
                    >
                    Delete
                    </button>
                </div>
                ))}
            </div>
            )}
        </main>
        </div>
    )
}