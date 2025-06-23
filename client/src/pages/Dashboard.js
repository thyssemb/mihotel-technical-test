import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../routes/lesson";
import AddLessonCard from "../components/AddLessonCard";
import DeleteLessonComponent from "../components/DeleteLessonComponent";
const Dashboard = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);
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
        }
        catch (err) {
            console.error(err);
            setError(err.message || 'Failed to fetch lessons');
        }
        finally {
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
        return (_jsx("div", { className: "flex justify-center items-center p-4", children: "Loading..." }));
    }
    if (error) {
        return (_jsx("div", { className: "flex justify-center items-center p-4 text-red-500", children: error }));
    }
    return (_jsxs("div", { className: "container mx-auto p-4 min-h-screen flex flex-col", style: {
            backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
            backgroundRepeat: "repeat",
        }, children: [_jsx("div", { className: "flex justify-between items-center mb-6", children: _jsx("h1", { className: "font-extrabold italic uppercase text-black text-5xl md:text-6xl", children: "Your Lessons" }) }), lessons.length === 0 ? (_jsx("div", { className: "flex justify-center items-center", children: _jsx("p", { className: "italic text-red-600 text-sm md:text-xl font-medium mt-4 whitespace-pre-wrap", children: "(Oops, you have no lesson posted yet*)" }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow", children: lessons.map((lesson, index) => (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md relative h-64 overflow-hidden", children: [_jsx("div", { className: "flex justify-end", children: _jsx(DeleteLessonComponent, { lessonSubject: lesson.subject || '', onDeleteSuccess: handleDeleteSuccess }) }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: lesson.subject }), _jsxs("p", { className: "text-gray-700 mb-1", children: [_jsx("strong", { children: "Level:" }), " ", lesson.level] }), _jsxs("p", { className: "text-gray-700 mb-1", children: [_jsx("strong", { children: "Price:" }), " $", lesson.price] }), _jsxs("p", { className: "text-gray-700 mb-1", children: [_jsx("strong", { children: "Location:" }), " ", lesson.location] }), _jsxs("p", { className: "text-gray-700 truncate", children: [_jsx("strong", { children: "Description:" }), " ", lesson.description] }), _jsx("div", { className: "flex justify-end mt-4", children: _jsxs("button", { onClick: () => navigate(`/lessons/${lesson.id}`), className: "flex items-center justify-center w-14 h-14 rounded-full border border-black bg-transparent cursor-pointer group", title: "See details", style: { userSelect: 'none' }, children: [_jsx("svg", { className: "w-6 h-6 text-black", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 17l7-7m0 0H7m7 0v7" }) }), _jsx("span", { className: "absolute bottom-full mb-1 right-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none", style: { whiteSpace: 'nowrap' }, children: "See details" })] }) })] }, index))) })), _jsx("div", { className: "mt-6 flex flex-col md:flex-row justify-between gap-4", children: _jsx("div", { className: "flex-1", children: _jsx(AddLessonCard, {}) }) })] }));
};
export default Dashboard;
