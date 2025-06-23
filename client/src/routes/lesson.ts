//***//
// File to handle lesson CRUD API calls
// Contains functions to fetch and create lessons from the backend
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

export async function createLesson(token: string, data: LessonFormData): Promise<any> {
    const res = await fetch(`${API_BACKEND_URL}/api/lessons`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create lesson: ${errorText}`);
    }

    return await res.json();
}

export async function updateLesson(token: string, data: LessonFormData): Promise<any> {
    
}
