const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

async function apiFetch(path, options = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
    }

    const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    })

    if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message || `Error ${res.status}`)
    }

    if (res.status === 204) return null

    return res.json()
}

export const auth = {
    register: (data) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
}

export const providers = {
    getMe: () => apiFetch('/api/providers/me'),
    getBySlug: (slug) => apiFetch(`/api/providers/${slug}/profile`),
    getServices: (slug) => apiFetch(`/api/providers/${slug}/services`),
    updateMe: (data) => apiFetch('/api/providers/me', { method: 'PUT', body: JSON.stringify(data) }),
}

export const services = {
    getAll: () => apiFetch('/api/services'),
    create: (data) => apiFetch('/api/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/api/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/api/services/${id}`, { method: 'DELETE' }),
}

export const appointments = {
    getAll: () => apiFetch('/api/appointments'),
    create: (data) => apiFetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id, status) => apiFetch(`/api/appointments/${id}/status?status=${status}`, { method: 'PUT' }),
    delete: (id) => apiFetch(`/api/appointments/${id}`, { method: 'DELETE' }),
}

export const blockouts = {
    getAll: () => apiFetch('/api/blockouts'),
    create: (data) => apiFetch('/api/blockouts', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/api/blockouts/${id}`, { method: 'DELETE' }),
}