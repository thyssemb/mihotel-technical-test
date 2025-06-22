import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerProfessor from '../routes/registerProfessor.ts';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const savedConfig = await registerProfessor(form);
            console.log('Professor registered:', savedConfig);
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Error during registration');
        }
    };

    return (
        <div
            className="flex justify-center px-4"
            style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")`,
                backgroundRepeat: 'repeat',
                backgroundColor: '#fff',
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white mt-10 rounded shadow max-w-md w-full"
            >
                <h1 className="font-extrabold italic mb-4 uppercase text-black text-5xl md:text-6xl block">
                    REGISTER
                </h1>
                <p className="mb-6 text-gray-700">Signup and become a Professor</p>

                <input
                    name="name"
                    placeholder="Type your name"
                    value={form.name}
                    onChange={handleChange}
                    className="block w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Example@hotmail.com"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="***********"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                />

                <button
                    type="submit"
                    className="text-black px-4 py-2 rounded w-full"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
