import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerProfessor from '../routes/registerProfessor';
export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedConfig = await registerProfessor(form);
            console.log("Professor registered:", savedConfig);
            navigate('/login');
        }
        catch (err) {
            console.error(err);
            alert("Error during registration");
        }
    };
    return (_jsx("div", { className: "flex justify-center px-4", style: {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")`,
            backgroundRepeat: 'repeat',
            backgroundColor: '#fff',
        }, children: _jsxs("form", { onSubmit: handleSubmit, className: "p-6 bg-white mt-10 rounded shadow max-w-md w-full", children: [_jsx("h1", { className: "font-extrabold italic mb-4 uppercase text-black text-5xl md:text-6xl block", children: "REGISTER" }), _jsx("p", { className: "mb-6 text-gray-700", children: "Signup and become a Professor" }), _jsx("input", { name: "name", placeholder: "Type your name", value: form.name, onChange: handleChange, className: "block w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2", required: true }), _jsx("input", { name: "email", type: "email", placeholder: "Example@hotmail.com", value: form.email, onChange: handleChange, className: "block w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2", required: true }), _jsx("input", { name: "password", type: "password", placeholder: "***********", value: form.password, onChange: handleChange, className: "block w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2", required: true }), _jsx("button", { type: "submit", className: "text-black px-4 py-2 rounded w-full", children: "Register" })] }) }));
}
