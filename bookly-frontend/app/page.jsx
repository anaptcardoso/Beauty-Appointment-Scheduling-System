import Link from 'next/link'

export default function LandingPage() {
    return (
    <main className="min-h-screen" style={{ background: '#fdf2f7' }}>
        <nav className="bg-white px-8 py-4" style={{ border: '0.5px solid #f5d5e8' }}>
        <p className="text-sm font-medium text-gray-900">Bookly</p>
        </nav>

        <div className="max-w-3xl mx-auto px-8 pt-24 pb-12 text-center">
        <h1 className="text-4xl font-medium text-gray-900 mb-4 leading-tight">
            The booking platform for beauty professionals
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Create your profile, set your services and share your link with clients. Bookings managed automatically.
        </p>
        </div>

        <div className="max-w-3xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl p-8 flex flex-col" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl" style={{ background: '#fdf2f7', color: '#d4688a' }}>
                📅
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">I&apos;m a client</h2>
            <p className="text-sm text-gray-400 mb-6 flex-1">
                Book appointments with your favorite professionals and manage your bookings in one place.
            </p>
            <Link href="/client/register" className="rounded-xl px-6 py-3 text-sm font-medium text-white text-center transition-opacity hover:opacity-90" style={{ background: '#d4688a' }}>
                Book an appointment
            </Link>
            <Link href="/client/login" className="text-center text-sm text-gray-400 hover:text-gray-600 mt-3">
                Already have an account? Sign in
            </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 flex flex-col" style={{ border: '0.5px solid #f5d5e8' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl" style={{ background: '#fdf2f7', color: '#d4688a' }}>
                💼
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">I&apos;m a professional</h2>
            <p className="text-sm text-gray-400 mb-6 flex-1">
                Create your profile, list your services, and share your personal booking link with clients.
            </p>
            <Link href="/register" className="rounded-xl px-6 py-3 text-sm font-medium text-center transition-opacity hover:opacity-90" style={{ background: 'white', color: '#d4688a', border: '1.5px solid #d4688a' }}>
                Advertise your services
            </Link>
            <Link href="/login" className="text-center text-sm text-gray-400 hover:text-gray-600 mt-3">
                Already have an account? Sign in
            </Link>
            </div>

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