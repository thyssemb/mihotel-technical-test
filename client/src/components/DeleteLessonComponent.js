import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { deleteLesson } from "../routes/lesson";
const DeleteLessonComponent = ({ lessonSubject, onDeleteSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Token missing");
            await deleteLesson(token, { subject: lessonSubject });
            alert("Lesson deleted successfully");
            setIsModalOpen(false);
            onDeleteSuccess();
        }
        catch (err) {
            alert("Error deleting lesson: " + err);
        }
        finally {
            setIsDeleting(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsModalOpen(true), "aria-label": `Delete lesson ${lessonSubject}`, className: "absolute top-2 right-2 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer select-none", children: "\u00D7" }), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-xl w-full max-w-sm relative", children: [_jsx("h2", { className: "mb-4 text-xl font-bold text-center", children: "Confirm Delete" }), _jsxs("p", { className: "mb-6 text-center", children: ["Are you sure you want to delete the lesson ", _jsx("strong", { children: lessonSubject }), "?"] }), _jsxs("div", { className: "flex justify-around", children: [_jsx("button", { onClick: () => setIsModalOpen(false), className: "px-4 py-2 border rounded hover:bg-gray-100", disabled: isDeleting, children: "Cancel" }), _jsx("button", { onClick: handleDelete, className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50", disabled: isDeleting, children: isDeleting ? 'Deleting...' : 'Delete' })] })] }) }))] }));
};
export default DeleteLessonComponent;
