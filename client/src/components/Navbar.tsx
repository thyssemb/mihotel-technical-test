import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Private Lessons</div>

                <ul className="flex items-center space-x-4">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/lessons" className="hover:underline">Lessons</Link></li>
                </ul>

                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
