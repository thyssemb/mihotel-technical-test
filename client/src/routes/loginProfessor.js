//***//
// File to handle professor login API calls
// Contains the function to login a professor by sending credentials to the backend
// Uses environment variable VITE_API_BACKEND_URL for backend base URL
//***//
const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
export default async function loginProfessor(formData) {
    const res = await fetch(`${API_BACKEND_URL}/api/professors/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Login failed: ${errorText}`);
    }
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('AuthToken', data.token);
    }
    return data;
}
