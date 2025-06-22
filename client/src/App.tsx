import { Routes, Route } from "react-router-dom";
import React from "react";
import './index.css';
import Layouts from "./layouts/Layouts.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage";

import Dashboard from "./pages/Dashboard.tsx";

const App: React.FC = () => {
    return (
        <Layouts>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Layouts>
    );
};

export default App;
