'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { services } from '@/lib/api'

export default function ServicesPage() {
    const router = useRouter()
    const [providerName, setProviderName] = useState('')
    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Form state
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [durationMin, setDurationMin] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const [active, setActive] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
        router.push('/login')
        return
        }
        setProviderName(localStorage.getItem('providerName') || '')
        loadServices()
    }, [router])

    async function loadServices() {
        try {
        const data = await services.getAll()
        setServiceList(data)
        } catch (err) {
        setError('Failed to load services.')
        } finally {
        setLoading(false)
        }
    }

    function openNewForm() {
        setEditingId(null)
        setName('')
        setDescription('')
        setDurationMin('')
        setBasePrice('')
        setActive(true)
        setShowForm(true)
    }

    function openEditForm(service) {
        setEditingId(service.id)
        setName(service.name)
        setDescription(service.description || '')
        setDurationMin(service.durationMin)
        setBasePrice(service.basePrice)
        setActive(service.active)
        setShowForm(true)
    }

    function closeForm() {
        setShowForm(false)
        setEditingId(null)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)

        const data = {
        name,
        description,
        durationMin: Number(durationMin),
        basePrice: Number(basePrice),
        active,
        }

        try {
        if (editingId) {
            await services.update(editingId, data)
        } else {
            await services.create(data)
        }
        closeForm()
        loadServices()
        } catch (err) {
        setError('Failed to save service.')
        } finally {
        setSaving(false)
        }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this service?')) return
        try {
        await services.delete(id)
        loadServices()
        } catch (err) {
        setError('Failed to delete service.')
        }
    }

    async function handleToggle(service) {
        try {
        await services.update(service.id, {
            name: service.name,
            description: service.description,
            durationMin: service.durationMin,
            basePrice: service.basePrice,
            active: !service.active,
        })
        loadServices()
        } catch (err) {
        setError('Failed to update service.')
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
            <a href="/admin/services" className="px-3 py-2 rounded-xl text-sm font-medium" style={{ background: '#fdf2f7', color: '#d4688a' }}>Services</a>
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
            <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-xl font-medium text-gray-900">Services</h1>
                <p className="text-sm text-gray-400 mt-0.5">Manage your services and pricing</p>
            </div>
            <button
                onClick={openNewForm}
                className="rounded-xl px-4 py-2 text-sm font-medium text-white"
                style={{ background: '#d4688a' }}
            >
                Add service
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
                <h2 className="text-sm font-medium text-gray-900 mb-4">
                {editingId ? 'Edit service' : 'New service'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Name</label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                    style={{ border: '1px solid #f5d5e8' }}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Description</label>
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                    style={{ border: '1px solid #f5d5e8' }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Duration (min)</label>
                    <input
                        type="number"
                        value={durationMin}
                        onChange={(e) => setDurationMin(e.target.value)}
                        required
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ border: '1px solid #f5d5e8' }}
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Price (€)</label>
                    <input
                        type="number"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        step="0.01"
                        required
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ border: '1px solid #f5d5e8' }}
                    />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    id="active"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded"
                    />
                    <label htmlFor="active" className="text-sm text-gray-700">Active (visible to clients)</label>
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
                    onClick={closeForm}
                    className="rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                    style={{ border: '0.5px solid #e5e7eb' }}
                    >
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            )}

            {/* Services list */}
            {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
            ) : serviceList.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center" style={{ border: '0.5px solid #f5d5e8' }}>
                <p className="text-sm text-gray-400">No services yet. Add your first service!</p>
            </div>
            ) : (
            <div className="space-y-3">
                {serviceList.map((s) => (
                <div
                    key={s.id}
                    className="bg-white rounded-2xl p-4 flex items-center justify-between"
                    style={{ border: '0.5px solid #f5d5e8', opacity: s.active ? 1 : 0.6 }}
                >
                    <div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">{s.name}</p>
                        <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                            background: s.active ? '#fdf2f7' : '#f5f5f5',
                            color: s.active ? '#d4688a' : '#999',
                            border: s.active ? '1px solid #f5d5e8' : '1px solid #e8e8e8',
                        }}
                        >
                        {s.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    {s.description && <p className="text-xs text-gray-400 mb-1">{s.description}</p>}
                    <p className="text-xs text-gray-400">{s.durationMin} min · €{s.basePrice}</p>
                    </div>
                    <div className="flex gap-2">
                    <button
                        onClick={() => handleToggle(s)}
                        className="rounded-xl px-3 py-1.5 text-xs font-medium"
                        style={{
                        background: s.active ? '#fff8e6' : '#fdf2f7',
                        color: s.active ? '#b45309' : '#d4688a',
                        border: s.active ? '1px solid #fde68a' : '1px solid #f5d5e8',
                        }}
                    >
                        {s.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                        onClick={() => openEditForm(s)}
                        className="rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600"
                        style={{ border: '1px solid #e5e7eb' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(s.id)}
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