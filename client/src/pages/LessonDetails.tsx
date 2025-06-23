import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../routes/lesson.ts";

const LessonDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const data = await getLessonById(token, id as string);
                setLesson(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id, navigate]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Désolé, cette partie du site est temporairement indisponible !</div>;

    return (
        <div
            className="min-h-screen p-6"
            style={{
                backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
                backgroundRepeat: "repeat",
            }}
        >
            <div className="max-w-2xl bg-white p-6 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-4">{lesson.subject}</h1>
                <p><strong>Level:</strong> {lesson.level}</p>
                <p><strong>Price:</strong> ${lesson.price}</p>
                <p><strong>Location:</strong> {lesson.location}</p>
                <p><strong>Description:</strong> {lesson.description}</p>
                <button onClick={() => navigate(-1)} className="mt-4 italic text-black">
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default LessonDetails;
