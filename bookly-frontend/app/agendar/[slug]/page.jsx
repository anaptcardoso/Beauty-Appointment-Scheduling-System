'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { providers, appointments } from '@/lib/api'

export default function AgendarPage() {
    const { slug } = useParams()
    const router = useRouter()
    const [provider, setProvider] = useState(null)
    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // Form state
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [address, setAddress] = useState('')
    const [notes, setNotes] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        async function loadProvider() {
        try {
            const [providerData, servicesData] = await Promise.all([
            providers.getBySlug(slug),
            providers.getServices(slug),
            ])
            setProvider(providerData)
            setServiceList(servicesData)
        } catch (err) {
            setError('Provider not found.')
        } finally {
            setLoading(false)
        }
        }
        if (slug) loadProvider()
    }, [slug])

    const selectedService = serviceList.find(s => s.id === serviceId)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        try {
        await appointments.create({
            providerId: provider.id,
            serviceId,
            clientName,
            clientEmail,
            clientPhone,
            date,
            startTime: startTime + ':00',
            address,
            notes,
            totalPrice: selectedService?.basePrice || 0,
        })

        setSuccess(true)
        setClientName('')
        setClientEmail('')
        setClientPhone('')
        setServiceId('')
        setDate('')
        setStartTime('')
        setAddress('')
        setNotes('')
        } catch (err) {
        setError(err.message || 'Failed to book appointment. Please try again.')
        } finally {
        setSubmitting(false)
        }
    }

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#fdf2f7' }}>
            <p className="text-sm text-gray-400">Loading...</p>
        </div>
        )
    }

    if (!provider) {
        return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#fdf2f7' }}>
            <p className="text-sm text-gray-400">Provider not found.</p>
        </div>
        )
    }

    return (
        <main className="min-h-screen px-4 py-10" style={{ background: '#fdf2f7' }}>
            <div className="mx-auto max-w-2xl">

            <button onClick={() => router.back()} className="inline-block mb-4 text-sm text-gray-400 hover:text-gray-600">← Back</button>

            <div className="bg-white rounded-2xl p-6 mb-6 text-center" style={{ border: '0.5px solid #f5d5e8' }}>
                <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium mx-auto mb-3"
                style={{ background: '#f5d5e8', color: '#d4688a' }}
                >
                {provider.name?.charAt(0)}
            </div>
            <h1 className="text-xl font-medium text-gray-900 mb-1">{provider.name}</h1>
            <p className="text-sm text-gray-400">{provider.baseAddress}</p>
        </div>

            <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '0.5px solid #f5d5e8' }}>
                <h2 className="text-sm font-medium text-gray-900 mb-4">Services</h2>
                {serviceList.length === 0 ? (
                <p className="text-sm text-gray-400">No services available.</p>
                ) : (
                <div className="space-y-3">
                    {serviceList.map((s) => (
                    <div
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                        style={{
                        border: serviceId === s.id ? '1.5px solid #d4688a' : '1px solid #f5d5e8',
                        background: serviceId === s.id ? '#fdf2f7' : 'white',
                        }}
                    >
                        <div>
                        <p className="text-sm font-medium text-gray-900">{s.name}</p>
                        {s.description && <p className="text-xs text-gray-400 mt-0.5">{s.description}</p>}
                        <p className="text-xs text-gray-400 mt-0.5">{s.durationMin} min</p>
                        </div>
                        <p className="text-sm font-medium" style={{ color: '#d4688a' }}>€{s.basePrice}</p>
                    </div>
                    ))}
                </div>
                )}
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ border: '0.5px solid #f5d5e8' }}>
                <h2 className="text-sm font-medium text-gray-900 mb-4">Book appointment</h2>

                {success && (
                <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: '#fdf2f7', border: '1px solid #f5d5e8' }}>
                    <p className="font-medium" style={{ color: '#d4688a' }}>Appointment booked successfully!</p>
                    <p className="text-gray-500 text-xs mt-1">You will receive a confirmation shortly.</p>
                </div>
                )}

                {error && (
                <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600" style={{ background: '#fff5f5', border: '1px solid #fed7d7' }}>
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Name</label>
                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required placeholder="Your name" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Phone</label>
                    <input type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required placeholder="912 345 678" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Email</label>
                    <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required placeholder="your@email.com" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Time</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Street, number, city" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Notes <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Any preferences or additional information?" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none" style={{ border: '1px solid #f5d5e8' }} />
                </div>

                {selectedService && (
                    <div className="rounded-xl px-4 py-3" style={{ background: '#fdf2f7', border: '1px solid #f5d5e8' }}>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>{selectedService.name}</span>
                        <span>€{selectedService.basePrice}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-900 pt-2" style={{ borderTop: '1px solid #f5d5e8' }}>
                        <span>Total</span>
                        <span style={{ color: '#d4688a' }}>€{selectedService.basePrice}</span>
                    </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting || !serviceId}
                    className="w-full rounded-xl py-3 text-sm font-medium text-white disabled:opacity-50"
                    style={{ background: '#d4688a' }}
                >
                    {submitting ? 'Booking...' : 'Book appointment'}
                </button>
                </form>
            </div>
            </div>
            
        </main>
        )
}