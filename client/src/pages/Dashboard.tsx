import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../routes/lesson.ts";
import AddLessonCard from "../components/AddLessonCard.tsx";
import DeleteLessonComponent from "../components/DeleteLessonComponent.tsx";

interface Lesson {
    id: number;
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
    const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);

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
            <h1 className="font-extrabold italic mb-5 uppercase text-black text-5xl md:text-6xl block">Your Lessons</h1>
            {lessons.length === 0 ? (
                <p className="italic text-red-600 text-sm md:text-xl font-medium mt-4 whitespace-pre-wrap">(Oops, you have no lesson posted yet*)</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons.map((lesson, index) => (
                        <div key={lesson.id} className="relative  flex items bg-white p-6 min-h-[120px] rounded-lg shadow-md">
                            <div
                                className="absolute top-2 right-10 cursor-pointer group p-1 rounded hover:bg-gray-100 transition"
                                title="Edit lesson"
                                onClick={() => navigate(`/edit-lesson/${lesson.id}`)}
                            >
                                <svg
                                    className="w-5 h-5 text-gray-600 group-hover:text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z"
                                    />
                                </svg>
                            </div>

                            <div className="absolute top-2 right-2">
                                <DeleteLessonComponent lessonId={lesson.id} onDeleteSuccess={handleDeleteSuccess}/>
                            </div>

                            <h2 className="text-xl font-semibold mb-2">{lesson.subject}</h2>

                            {selectedLessonIndex === index && (
                                <p className="text-gray-800 mt-2">
                                    <strong>Description:</strong> {lesson.description || 'No description available.'}
                                </p>
                            )}

                            <div
                                className="absolute bottom-3 right-3 flex items-center justify-center w-14 h-14 rounded-full border border-black bg-transparent cursor-pointer group"
                                title="See details"
                                style={{userSelect: 'none'}}
                                onClick={() => navigate(`/lessons/${lesson.id}`)}
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
                            </div>
                        </div>

                    ))}
                </div>
            )}
            <AddLessonCard/>
        </div>
    );
};

export default Dashboard;
