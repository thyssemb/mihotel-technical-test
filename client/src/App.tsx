import { Routes, Route } from "react-router-dom";
import React from "react";
import Layouts from "./layouts/Layouts.tsx";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const App: React.FC = () => {
    return (
        <Layouts>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Layouts>
    );
};

export default App;
