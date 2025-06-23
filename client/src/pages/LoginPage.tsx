import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginProfessor from '../routes/loginProfessor.ts';

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await loginProfessor(form);
            console.log('Login successful:', response);

            if (response.token) {
                localStorage.setItem('token', response.token);
            }

            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex justify-center px-4"
            style={{
                backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
                backgroundRepeat: "repeat",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white rounded shadow mt-10 max-w-md w-full"
            >
                <h1 className="font-extrabold italic mb-4 uppercase text-black text-5xl md:text-6xl block">LOGIN</h1>
                <p className="mb-4 text-gray-700">Please login to activate your account.</p>

                <input
                    name="email"
                    type="email"
                    placeholder="Example@hotmail.com"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="***********"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                    required
                />

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="text-black px-4 py-2 rounded w-full"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
