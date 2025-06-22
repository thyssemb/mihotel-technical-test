//***//
// File to handle professor registration API calls
// Contains the function to register a professor by sending form data to the backend
// Uses environment variable VITE_API_BACKEND_URL for backend base URL
//***//

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL as string;

export interface FormData {
    name: string;
    email: string;
    password: string;
}

export default async function registerProfessor(formData: FormData): Promise<any> {
    const res = await fetch(`${API_BACKEND_URL}/api/professors/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Registration failed: ${errorText}`);
    }
    return res.json();
}
