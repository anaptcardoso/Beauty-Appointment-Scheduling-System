'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/api'

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [baseAddress, setBaseAddress] = useState('')
    const [baseTravelFee, setBaseTravelFee] = useState(5.0)
    const [pricePerKm, setPricePerKm] = useState(0.65)
    const [slug, setSlug] = useState('')

    function generateSlug(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    }

    function handleNameChange(e) {
    const value = e.target.value
    setName(value)
    setSlug(generateSlug(value))
    }

    async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
        await auth.register({
        name,
        email,
        password,
        phone,
        baseAddress,
        baseTravelFee: Number(baseTravelFee),
        pricePerKm: Number(pricePerKm),
        slug,
        })
        router.push('/login')
    } catch (err) {
        setError(err.message || 'Registration failed. Please try again.')
    } finally {
        setLoading(false)
    }
    }

    return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: '#fdf2f7' }}>
        <div className="w-full max-w-lg">

        <a href="/" className="inline-block mb-4 text-sm text-gray-400 hover:text-gray-600">← Back</a>

        <div className="bg-white rounded-2xl p-8" style={{ border: '0.5px solid #f5d5e8' }}>

            <div className="mb-6 text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">Create your account</h1>
            <p className="text-sm text-gray-400">Set up your professional profile</p>
            </div>

            <div style={{ height: '0.5px', background: '#fce8f3', marginBottom: '24px' }} />

            {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600" style={{ background: '#fff5f5', border: '1px solid #fed7d7' }}>
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Full name</label>
                <input type="text" value={name} onChange={handleNameChange} placeholder="Ana Cardoso" required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="911 164 088" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@email.com" required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">Base address</label>
                <input type="text" value={baseAddress} onChange={(e) => setBaseAddress(e.target.value)} placeholder="Rua das Oliveiras 65, Leiria" required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
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
                    bookly.pt/
                </span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ana-cardoso" required className="flex-1 px-3 py-2.5 text-sm outline-none" />
                </div>
                <p className="mt-1 text-xs text-gray-400">Auto-generated from your name. You can edit it.</p>
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-xl py-3 text-sm font-medium text-white disabled:opacity-50 transition-opacity hover:opacity-90" style={{ background: '#d4688a' }}>
                {loading ? 'Creating account...' : 'Create account'}
            </button>
            </form>

            <div style={{ height: '0.5px', background: '#fce8f3', margin: '24px 0' }} />

            <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/login" style={{ color: '#d4688a' }}>Sign in</a>
            </p>

        </div>
        </div>
    </main>
    )
}