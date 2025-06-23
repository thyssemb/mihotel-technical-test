import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layouts from "./layouts/Layouts.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard.tsx";
import LessonDetails from "./pages/LessonDetails";
import CustomCursor from "./components/CustomCursor";

const App: React.FC = () => {
    const [isInFooter, setIsInFooter] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const footerHeight = 200; // tu peux l’adapter
            const isIn = window.innerHeight - e.clientY < footerHeight;
            setIsInFooter(isIn);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <CustomCursor isInFooter={isInFooter} />
            <Layouts>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/lessons/:id" element={<LessonDetails />} />
                </Routes>
            </Layouts>
        </>
    );
};

export default App;
