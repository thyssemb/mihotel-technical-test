import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../routes/lesson.ts";
import AddLessonCard from "../components/AddLessonCard.tsx";
import UpdateLessonComponent from "../components/UpdateLessonComponent.tsx";
import DeleteLessonComponent from "../components/DeleteLessonComponent.tsx";

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

    const fetchLessons = async () => {
        const token = localStorage.getItem('token');
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

    useEffect(() => {
        fetchLessons();
    }, [navigate]);

    const handleDeleteSuccess = () => {
        fetchLessons();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center p-4 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div
            className="container mx-auto p-4 min-h-screen flex flex-col"
            style={{
                backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
                backgroundRepeat: "repeat",
            }}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-extrabold italic uppercase text-black text-5xl md:text-6xl">
                    Your Lessons
                </h1>
            </div>

            {lessons.length === 0 ? (
                <div className="flex justify-center items-center">
                    <p className="italic text-red-600 text-sm md:text-xl font-medium mt-4 whitespace-pre-wrap">
                        (Oops, you have no lesson posted yet*)
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
                    {lessons.map((lesson, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md relative h-64 overflow-hidden">
                            <div className="flex justify-end">
                                <DeleteLessonComponent
                                    lessonSubject={lesson.subject || ''}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                            </div>
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
                            <p className="text-gray-700 truncate">
                                <strong>Description:</strong> {lesson.description}
                            </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                                    className="flex items-center justify-center w-14 h-14 rounded-full border border-black bg-transparent cursor-pointer group"
                                    title="See details"
                                    style={{userSelect: 'none'}}
                                >
                                    <svg
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l7-7m0 0H7m7 0v7"/>
                                    </svg>
                                    <span
                                        className="absolute bottom-full mb-1 right-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none"
                                        style={{whiteSpace: 'nowrap'}}
                                    >
                                        See details
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                    <AddLessonCard />
                </div>
                <div className="flex-1">
                    <UpdateLessonComponent />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
