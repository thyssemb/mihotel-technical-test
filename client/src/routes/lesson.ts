const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL as string;

export interface LessonFormData {
    id?: number; // ajouté pour suppression
    subject?: string;
    level?: string;
    price?: number;
    location?: string;
    description?: string;
}

export async function getLessons(token: string): Promise<LessonFormData[]> {
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
    const response = await fetch(`${API_BACKEND_URL}/api/lessons`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create lesson: ${errorText}`);
    }

    return await response.json();
}

export async function deleteLesson(token: string, lessonId: number): Promise<any> {
    const response = await fetch(`${API_BACKEND_URL}/api/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete lesson: ${errorText}`);
    }

    return await response.json();
}

export async function getLessonById(token: string, id: string): Promise<any> {
    const response = await fetch(`${API_BACKEND_URL}/api/lessons/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch lesson details: ${errorText}`);
    }

    return await response.json();
}
