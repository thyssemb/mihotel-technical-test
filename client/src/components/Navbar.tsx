import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Private Lessons</div>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="" className="hover:underline">Lessons</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
