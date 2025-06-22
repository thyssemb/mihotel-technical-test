import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLessons } from '../routes/lesson';

import AddLessonCard from "../components/AddLessonCard.tsx";

interface Lesson {
    subject?: string;
    level?: string;
    price?: number;
    location?: string;
    description?: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const data = await getLessons(token);
                setLessons(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to fetch lessons');
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [navigate]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div
            className="container mx-auto p-4 min-h-screen"
            style={{
                backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
                backgroundRepeat: "repeat",
            }}
        >
            <h1 className="font-extrabold italic uppercase text-black text-5xl md:text-6xl block">Your Lessons</h1>
            {lessons.length === 0 ? (
                <p className="italic text-red-600 text-sm md:text-xl font-medium mt-4 whitespace-pre-wrap">(Oops, you have no lessons posted*)</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons.map((lesson, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{lesson.subject}</h2>
                            <p className="text-gray-700 mb-1">
                                <strong>Level:</strong> {lesson.level}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Price:</strong> ${lesson.price}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Location:</strong> {lesson.location}
                            </p>
                            <p className="text-gray-700">
                                <strong>Description:</strong> {lesson.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <AddLessonCard/>
        </div>
    );
};

export default Dashboard;
