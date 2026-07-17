'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/appointments', label: 'Appointments' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/blockouts', label: 'Blockouts' },
    { href: '/admin/settings', label: 'Settings' },
];

export default function AdminSidebar() {
    const [providerName, setProviderName] = useState('');
    const [providerEmail, setProviderEmail] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
    setProviderName(localStorage.getItem('providerName') || '');
    setProviderEmail(localStorage.getItem('providerEmail') || '');
    }, []);

    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('providerName');
    localStorage.removeItem('providerEmail');
    localStorage.removeItem('providerSlug');
    router.push('/login');
    };

    return (
    <aside className="w-52 bg-white flex flex-col py-6 px-4 shrink-0" style={{ border: '0.5px solid #f5d5e8' }}>
        <div className="mb-8">
        <p className="text-sm font-medium text-gray-900">Bookly</p>
        <p className="text-xs text-gray-400 mt-0.5">{providerName}</p>
        </div>

        <nav className="flex flex-col gap-1">
        {links.map((link) => (
            <a
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-xl text-sm transition-colors"
            style={
                pathname === link.href
                ? { background: '#fdf2f7', color: '#d4688a', fontWeight: 500 }
                : { color: '#6b7280' }
            }
            >
            {link.label}
            </a>
        ))}
        </nav>

        <button
        onClick={handleLogout}
        className="mt-auto text-left px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-50"
        >
        Sign out
        </button>
    </aside>
    )
}