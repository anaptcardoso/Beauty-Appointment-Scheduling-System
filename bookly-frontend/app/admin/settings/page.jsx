'use client'

import { useEffect, useState } from 'react'
import { providers } from '@/lib/api'
import AdminSidebar from '@/components/AdminSidebar'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
    useAuth()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [baseAddress, setBaseAddress] = useState('')
    const [baseTravelFee, setBaseTravelFee] = useState(5)
    const [pricePerKm, setPricePerKm] = useState(0.65)
    const [slug, setSlug] = useState('')

    useEffect(() => {
    async function loadProfile() {
        try {
        const data = await providers.getMe()
        setName(data.name || '')
        setPhone(data.phone || '')
        setBaseAddress(data.baseAddress || '')
        setBaseTravelFee(data.baseTravelFee || 5)
        setPricePerKm(data.pricePerKm || 0.65)
        setSlug(data.slug || '')
        } catch (err) {
        setError('Failed to load profile.')
        } finally {
        setLoading(false)
        }
    }
    loadProfile()
    }, [])

    async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
        await providers.updateMe({
        name,
        phone,
        baseAddress,
        baseTravelFee: Number(baseTravelFee),
        pricePerKm: Number(pricePerKm),
        slug,
        })
        localStorage.setItem('providerName', name)
        localStorage.setItem('providerSlug', slug)
        setSuccess(true)
    } catch (err) {
        setError('Failed to save settings.')
    } finally {
        setSaving(false)
    }
    }

    if (loading) {
    return (
        <div className="min-h-screen flex" style={{ background: '#fdf2f7' }}>
        <AdminSidebar active="Settings" />
        <main className="flex-1 p-8">
            <p className="text-sm text-gray-400">Loading...</p>
        </main>
        </div>
    )
    }

    return (
    <div className="min-h-screen flex" style={{ background: '#fdf2f7' }}>
        <AdminSidebar active="Settings" />

        <main className="flex-1 p-8">
        <div className="mb-8">
            <h1 className="text-xl font-medium text-gray-900">Settings</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your profile and pricing</p>
        </div>

        <div className="bg-white rounded-2xl p-6 max-w-2xl" style={{ border: '0.5px solid #f5d5e8' }}>

            {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600" style={{ background: '#fff5f5', border: '1px solid #fed7d7' }}>
                {error}
            </div>
            )}

            {success && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm font-medium" style={{ background: '#fdf2f7', border: '1px solid #f5d5e8', color: '#d4688a' }}>
                Settings saved successfully!
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Full name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Base address</label>
                <input type="text" value={baseAddress} onChange={(e) => setBaseAddress(e.target.value)} required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Base travel fee (€)</label>
                <input type="number" value={baseTravelFee} onChange={(e) => setBaseTravelFee(e.target.value)} step="0.01" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Price per km (€)</label>
                <input type="number" value={pricePerKm} onChange={(e) => setPricePerKm(e.target.value)} step="0.01" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Public link</label>
                <div className="flex items-center" style={{ border: '1px solid #f5d5e8', borderRadius: '12px', overflow: 'hidden' }}>
                <span className="px-3 py-2.5 text-sm text-gray-400 bg-gray-50 border-r" style={{ borderColor: '#f5d5e8' }}>
                    bookly.pt/agendamento/
                </span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="flex-1 px-3 py-2.5 text-sm outline-none" />
                </div>
            </div>

            <div style={{ height: '0.5px', background: '#fce8f3', margin: '8px 0' }} />

            <button type="submit" disabled={saving} className="rounded-xl px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50" style={{ background: '#d4688a' }}>
                {saving ? 'Saving...' : 'Save settings'}
            </button>
            </form>
        </div>
        </main>
    </div>
    )
}