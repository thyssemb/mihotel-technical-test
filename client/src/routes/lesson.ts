//***//
// File to handle lesson crud API calls
// Contains the function to display all lessons with their informations by sending credentials to the backend
// Uses environment variable VITE_API_BACKEND_URL for backend base URL
//***//

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL as string;

export interface LessonFormData {
    subject?: string;
    level?: string;
    price?: number;
    location?: string;
    description?: string;
}

export async function getLessons(token: string): Promise<any> {
    const res = await fetch(`${API_BACKEND_URL}/api/lessons`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch lessons: ${errorText}`);
    }

    return await res.json();
}
