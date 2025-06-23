import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { createLesson } from "../routes/lesson";
const AddLessonCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        subject: '',
        level: '',
        price: '',
        location: '',
        description: '',
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Token missing");
            await createLesson(token, {
                subject: form.subject,
                level: form.level,
                price: parseFloat(form.price),
                location: form.location,
                description: form.description,
            });
            alert("Lesson added with success");
            setIsModalOpen(false);
            setForm({
                subject: '',
                level: '',
                price: '',
                location: '',
                description: '',
            });
        }
        catch (err) {
            alert("Error with creating a lesson : " + err);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { onClick: () => setIsModalOpen(true), className: "cursor-pointer bg-white border mt-10 border-gray-300 rounded-lg shadow-md flex items-center justify-center text-lg md:text-xl font-semibold text-gray-700 p-6 transition transform hover:shadow-xl hover:-translate-y-1 duration-300 select-none", role: "button", tabIndex: 0, onKeyDown: (e) => {
                    if (e.key === 'Enter')
                        setIsModalOpen(true);
                }, children: "Add a Lesson" }), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative", children: [_jsx("button", { onClick: () => setIsModalOpen(false), className: "absolute top-2 right-2 text-gray-500 hover:text-black text-xl", children: "\u2715" }), _jsx("h2", { className: "mb-6 font-extrabold italic uppercase text-black text-3xl md:text-4xl text-center", children: "New Lesson" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsx("input", { name: "subject", placeholder: "Subject", value: form.subject, onChange: handleChange, className: "w-full p-2 border rounded text-base", required: true }), _jsx("input", { name: "level", placeholder: "Level", value: form.level, onChange: handleChange, className: "w-full p-2 border rounded text-base", required: true }), _jsx("input", { name: "price", type: "number", placeholder: "Price", value: form.price, onChange: handleChange, className: "w-full p-2 border rounded text-base", required: true }), _jsx("input", { name: "location", placeholder: "Location", value: form.location, onChange: handleChange, className: "w-full p-2 border rounded text-base", required: true }), _jsx("textarea", { name: "description", placeholder: "Description", value: form.description, onChange: handleChange, className: "w-full p-2 border rounded text-base", rows: 4 }), _jsx("button", { type: "submit", className: "bg-black text-white w-full py-2.5 rounded hover:bg-gray-800 transition text-base font-semibold", children: "Add" })] })] }) }))] }));
};
export default AddLessonCard;
