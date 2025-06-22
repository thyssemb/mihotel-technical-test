import { useState } from 'react';
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
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-md mx-auto mt-10">
            <p>Please login to activate your account.</p>
            <h2 className="text-xl font-semibold mb-4">Login</h2>

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border rounded"
                required
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                required
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}
