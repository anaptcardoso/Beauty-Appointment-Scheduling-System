import Link from 'next/link'

export default function LandingPage() {
    return (
    <main className="min-h-screen" style={{ background: '#fdf2f7' }}>

        <nav className="bg-white px-8 py-4 flex items-center justify-between" style={{ border: '0.5px solid #f5d5e8' }}>
        <p className="text-sm font-medium text-gray-900">Bookly</p>
        <div className="flex gap-3">
            <Link href="/login" className="rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50" style={{ border: '0.5px solid #e5e7eb' }}>
            Sign in
            </Link>
            <Link href="/register" className="rounded-xl px-4 py-2 text-sm font-medium text-white" style={{ background: '#d4688a' }}>
            Get started
            </Link>
        </div>
        </nav>

        <div className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h1 className="text-4xl font-medium text-gray-900 mb-4 leading-tight">
            The booking platform for beauty professionals
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Create your profile, set your services and share your link with clients. Bookings managed automatically.
        </p>
        <div className="flex gap-4 justify-center">
            <Link href="/register" className="rounded-xl px-8 py-3 text-sm font-medium text-white" style={{ background: '#d4688a' }}>
            Create free account
            </Link>
            <Link href="/agendar/ana-cardoso" className="rounded-xl px-8 py-3 text-sm text-gray-600 hover:bg-white" style={{ border: '0.5px solid #f5d5e8' }}>
            See demo
            </Link>
        </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg" style={{ background: '#fdf2f7', color: '#d4688a' }}>
                🔗
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Personal link</h3>
            <p className="text-sm text-gray-400">Share bookly.pt/your-name with your clients for direct bookings.</p>
            </div>
            <div className="bg-white rounded-2xl p-6" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg" style={{ background: '#fdf2f7', color: '#d4688a' }}>
                📅
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Automatic schedule</h3>
            <p className="text-sm text-gray-400">Conflict-free bookings, holiday blocks and full agenda control.</p>
            </div>
            <div className="bg-white rounded-2xl p-6" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg" style={{ background: '#fdf2f7', color: '#d4688a' }}>
                📍
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Travel calculation</h3>
            <p className="text-sm text-gray-400">Distance calculated automatically and added to the service price.</p>
            </div>
        </div>
        </div>

    </main>
    )
}