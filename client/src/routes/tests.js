//***//
// File for testing the connection between front and back-end
// Provides a function to ping the backend API and check if it is responding
// Uses environment variable VITE_API_BACKEND_URL for the backend base URL
//***//

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

export async function pingBackend() {
    const res = await fetch(`${API_BACKEND_URL}/api/tests/ping`);
    if (!res.ok) {
        throw new Error('API not responding');
    }
    return res.text();
}
