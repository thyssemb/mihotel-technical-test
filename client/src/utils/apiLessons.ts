import { getLessons } from '../routes/lesson.ts';

export async function fetchLessonsAndLog(token: string) {
    try {
        const lessons = await getLessons(token);
        console.log('Lessons received:', lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
    }
}
