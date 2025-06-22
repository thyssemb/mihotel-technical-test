import React, {type ReactNode } from "react";
import Navbar from "../components/Navbar.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="container mx-auto p-4">
                {children}
            </main>
        </>
    );
};

export default Layout;
