'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/api'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
        const data = await auth.login({ email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('providerName', data.name)
        localStorage.setItem('providerEmail', data.email)
        localStorage.setItem('providerSlug', data.slug)
        router.push('/admin')
    } catch (err) {
        setError('Invalid email or password. Please try again.')
    } finally {
        setLoading(false)
    }
    }

    return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#fdf2f7' }}>
        <div className="w-full max-w-md">

            <a href="/" className="inline-block mb-4 text-sm text-gray-400 hover:text-gray-600">← Back</a>

            <div className="bg-white rounded-2xl p-8" style={{ border: '0.5px solid #f5d5e8' }}>

                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-medium text-gray-900 mb-1">Bookly</h1>
                    <p className="text-sm text-gray-400">Sign in to your account</p>
                </div>

        <div style={{ height: '0.5px', background: '#fce8f3', marginBottom: '24px' }} />

        {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600" style={{ background: '#fff5f5', border: '1px solid #fed7d7' }}>
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana@email.com"
                required
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ border: '1px solid #f5d5e8' }}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ border: '1px solid #f5d5e8' }}
            />
            </div>

            <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-medium text-white disabled:opacity-50 transition-opacity hover:opacity-90"
            style={{ background: '#d4688a' }}
            >
            {loading ? 'Signing in...' : 'Sign in'}
            </button>
        </form>

        <div style={{ height: '0.5px', background: '#fce8f3', margin: '24px 0' }} />

        <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <a href="/register" style={{ color: '#d4688a' }}>Create one</a>
        </p>

        </div>
    </div>
    </main>
    )
}