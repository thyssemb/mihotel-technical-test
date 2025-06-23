import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../routes/lesson.ts";

interface Lesson {
    id: number;
    subject?: string;
    level?: string;
    price?: number;
    location?: string;
    description?: string;
}

const LessonDetails = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLesson = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                if (!lessonId) throw new Error("Invalid lesson ID");
                const data = await getLessonById(token, lessonId);
                setLesson(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch lesson");
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId, navigate]);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
    if (!lesson) return <div className="text-center p-4">Lesson not found</div>;

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
            <h1 className="font-extrabold italic mb-5 uppercase text-black text-4xl md:text-5xl">Lesson details</h1>

            <div className="bg-white rounded-lg shadow-md p-6 relative max-w-xl">
                <h2 className="text-3xl font-bold mb-4">{lesson.subject}</h2>
                <p className="text-gray-700 mb-2">
                    <strong>Level:</strong> {lesson.level}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Price:</strong> ${lesson.price}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Location:</strong> {lesson.location}
                </p>
                <p className="text-gray-700">
                    <strong>Description:</strong> {lesson.description || "No description provided."}
                </p>

                {/* Flèche retour */}
                <div
                    className="absolute bottom-3 right-3 flex items-center justify-center w-14 h-14 rounded-full border border-black bg-transparent cursor-pointer group"
                    title="Go back"
                    onClick={() => navigate(-1)}
                    style={{ userSelect: 'none' }}
                >
                    <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-7 7m0 0l7 7m-7-7H3" />
                    </svg>
                    <span
                        className="absolute bottom-full mb-1 right-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        Go back
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LessonDetails;
