import { getLessons } from '../routes/lesson';
export async function fetchLessonsAndLog(token) {
    try {
        const lessons = await getLessons(token);
        console.log('Lessons received:', lessons);
    }
    catch (error) {
        console.error('Error fetching lessons:', error);
    }
}
