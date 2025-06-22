import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { User, LogOut, Menu, X } from "lucide-react";

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const Navbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutCard, setShowLogoutCard] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const logoutCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = parseJwt(token);
            if (payload && payload.fullName) {
                setIsLoggedIn(true);
                setFullName(payload.fullName);
            } else {
                setIsLoggedIn(false);
                setFullName("");
            }
        } else {
            setIsLoggedIn(false);
            setFullName("");
        }
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        if (isMobileMenuOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (showLogoutCard) {
            gsap.fromTo(
                logoutCardRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
            );
        } else if (logoutCardRef.current) {
            gsap.to(logoutCardRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
            });
        }
    }, [showLogoutCard]);

    const MobileMenu = () => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setIsMobileMenuOpen(false),
            });
        } else {
            setIsMobileMenuOpen(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setFullName("");
        setIsMobileMenuOpen(false);
        setShowLogoutCard(false);
    };

    const onMouseEnterLogoutArea = () => setShowLogoutCard(true);
    const onMouseLeaveLogoutArea = () => setShowLogoutCard(false);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <ul className="hidden md:flex items-center space-x-12 flex-1 justify-center">
                            <li>
                                <a
                                    href="/"
                                    className="text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard"
                                    className="text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200"
                                >
                                    Dashboard
                                </a>
                            </li>
                        </ul>

                        <div className="flex items-center space-x-6 relative">
                            <div
                                className="hidden md:flex items-center space-x-6 relative"
                                onMouseEnter={onMouseEnterLogoutArea}
                                onMouseLeave={onMouseLeaveLogoutArea}
                            >
                                {isLoggedIn ? (
                                    <>
                                        <div className="flex items-center space-x-3 cursor-pointer select-none">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-700 font-medium">Welcome, {fullName}</span>
                                        </div>

                                        {showLogoutCard && (
                                            <div
                                                ref={logoutCardRef}
                                                className="absolute top-full mt-2 right-0 w-32 bg-white rounded-md shadow-lg border border-gray-200 p-2 flex justify-center"
                                            >
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <a
                                            href="/login"
                                            className="text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href="/register"
                                            className="text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200"
                                        >
                                            Sign up
                                        </a>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={MobileMenu}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 text-gray-700" />
                                ) : (
                                    <Menu className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/95 border-b border-gray-200/50"
                    >
                        <div className="px-6 py-4 space-y-4">
                            <div className="space-y-3">
                                <a
                                    href="/"
                                    className="block text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
                                >
                                    Home
                                </a>
                                <a
                                    href="/dashboard"
                                    className="block text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
                                >
                                    Dashboard
                                </a>
                            </div>

                            <div className="pt-3 border-t border-gray-200/50">
                                {isLoggedIn ? (
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-700 font-medium">Welcome, {fullName}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <a
                                            href="/login"
                                            className="block text-center text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href="/register"
                                            className="block text-center text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                                        >
                                            Sign up
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <div className="h-16"></div>
        </>
    );
};

export default Navbar;
