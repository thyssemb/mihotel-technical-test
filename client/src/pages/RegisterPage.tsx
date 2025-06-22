import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerProfessor from '../routes/registerProfessor.ts';

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
            console.log('Professor registered:', savedConfig);
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Error during registration');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-md mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Professor Registration</h2>
            <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border rounded"
                required
            />
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
            <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
                Register
            </button>
        </form>
    );
}
