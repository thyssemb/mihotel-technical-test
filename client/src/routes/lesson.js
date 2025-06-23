//***//
// File to handle lesson crud API calls
// Contains the function to display all lessons with their informations by sending credentials to the backend
// Uses environment variable VITE_API_BACKEND_URL for backend base URL
//***//
const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
console.log(API_BACKEND_URL);
export async function getLessons(token) {
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
export async function createLesson(token, data) {
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
export async function deleteLesson(token, data) {
    if (!data.subject) {
        throw new Error("Subject is required to delete a lesson");
    }
    const response = await fetch(`${API_BACKEND_URL}/api/lessons`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete lesson: ${errorText}`);
    }
    return await response.json();
}
export async function getLessonById(token, id) {
    const res = await fetch(`${API_BACKEND_URL}/api/lessons/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch lesson with id ${id}: ${errorText}`);
    }
    return await res.json();
}
export async function updateLesson(token, id) {
}
