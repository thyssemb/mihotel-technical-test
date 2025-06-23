import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layouts from "./layouts/Layouts";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LessonDetails from "./pages/LessonDetails";
import CustomCursor from "./components/CustomCursor";
const App = () => {
    const [isInFooter, setIsInFooter] = useState(false);
    useEffect(() => {
        const handleMouseMove = (e) => {
            const footerHeight = 200; // tu peux l’adapter
            const isIn = window.innerHeight - e.clientY < footerHeight;
            setIsInFooter(isIn);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(CustomCursor, { isInFooter: isInFooter }), _jsx(Layouts, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/lessons/:id", element: _jsx(LessonDetails, {}) })] }) })] }));
};
export default App;
