import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { User, Menu, X } from "lucide-react";

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

    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

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

    const MobileMenu = () => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setIsMobileMenuOpen(false)
            });
        } else {
            setIsMobileMenuOpen(true);
        }
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Center Navigation */}
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

                        {/* Right Side - Auth */}
                        <div className="flex items-center space-x-6">
                            {/* Desktop Auth Buttons */}
                            <div className="hidden md:flex items-center space-x-6">
                                {isLoggedIn ? (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 font-medium">Welcome, {fullName}</span>
                                    </div>
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

                            <button
                                onClick={MobileMenu}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
                                    <div className="flex items-center space-x-3 py-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 font-medium">Welcome, {fullName}</span>
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
