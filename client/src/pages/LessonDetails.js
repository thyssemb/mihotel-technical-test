import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonById } from "../routes/lesson";
const LessonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchLesson = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const data = await getLessonById(token, id);
                setLesson(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id, navigate]);
    if (loading)
        return _jsx("div", { className: "p-4", children: "Loading..." });
    if (error)
        return _jsx("div", { className: "text-red-500 p-4", children: "D\u00E9sol\u00E9, cette partie du site est temporairement indisponible !" });
    return (_jsx("div", { className: "min-h-screen p-6", style: {
            backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
            backgroundRepeat: "repeat",
        }, children: _jsxs("div", { className: "max-w-2xl bg-white p-6 rounded shadow-md", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: lesson.subject }), _jsxs("p", { children: [_jsx("strong", { children: "Level:" }), " ", lesson.level] }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " $", lesson.price] }), _jsxs("p", { children: [_jsx("strong", { children: "Location:" }), " ", lesson.location] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", lesson.description] }), _jsx("button", { onClick: () => navigate(-1), className: "mt-4 italic text-black", children: "\u2190 Back to Dashboard" })] }) }));
};
export default LessonDetails;
