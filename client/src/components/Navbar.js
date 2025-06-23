import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { User, LogOut, Menu, X } from "lucide-react";
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    }
    catch (e) {
        return null;
    }
};
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutCard, setShowLogoutCard] = useState(false);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const logoutCardRef = useRef(null);
    // Met à jour l'état à chaque rendu et écoute les changements du token dans localStorage
    const checkToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = parseJwt(token);
            if (payload && payload.fullName) {
                setIsLoggedIn(true);
                setFullName(payload.fullName);
                return;
            }
        }
        setIsLoggedIn(false);
        setFullName("");
    };
    useEffect(() => {
        checkToken();
        // Écoute des changements de localStorage (ex : déconnexion dans un autre onglet)
        const onStorageChange = (e) => {
            if (e.key === "token") {
                checkToken();
            }
        };
        window.addEventListener("storage", onStorageChange);
        return () => {
            window.removeEventListener("storage", onStorageChange);
        };
    }, []);
    useEffect(() => {
        const tl = gsap.timeline();
        if (!navRef.current)
            return;
        tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
        if (isMobileMenuOpen && mobileMenuRef.current) {
            gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
        }
    }, [isMobileMenuOpen]);
    useEffect(() => {
        if (!logoutCardRef.current)
            return;
        if (showLogoutCard) {
            gsap.fromTo(logoutCardRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
        }
        else {
            gsap.to(logoutCardRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
            });
        }
    }, [showLogoutCard]);
    const toggleMobileMenu = () => {
        if (isMobileMenuOpen && mobileMenuRef.current) {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setIsMobileMenuOpen(false),
            });
        }
        else {
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
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { ref: navRef, className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50", children: [_jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs("ul", { className: "hidden md:flex items-center space-x-12 flex-1 justify-center", children: [_jsx("li", { children: _jsx("a", { href: "/", className: "text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200", children: "Home" }) }), _jsx("li", { children: _jsx("a", { href: "/dashboard", className: "text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200", children: "Dashboard" }) })] }), _jsxs("div", { className: "flex items-center space-x-6 relative", children: [_jsx("div", { className: "hidden md:flex items-center space-x-6 relative", onMouseEnter: () => setShowLogoutCard(true), onMouseLeave: () => setShowLogoutCard(false), children: isLoggedIn ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-3 cursor-pointer select-none", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center", children: _jsx(User, { className: "w-4 h-4 text-white" }) }), _jsxs("span", { className: "text-gray-700 font-medium", children: ["Welcome, ", fullName] })] }), showLogoutCard && (_jsx("div", { ref: logoutCardRef, className: "absolute top-full mt-2 right-0 w-32 bg-white rounded-md shadow-lg border border-gray-200 p-2 flex justify-center", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200", children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Logout" })] }) }))] })) : (_jsxs(_Fragment, { children: [_jsx("a", { href: "/login", className: "text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200", children: "Login" }), _jsx("a", { href: "/register", className: "text-gray-700 font-medium py-2 border-b-2 border-transparent hover:border-gray-900 transition-colors duration-200", children: "Sign up" })] })) }), _jsx("button", { onClick: toggleMobileMenu, className: "md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200", "aria-label": "Toggle menu", children: isMobileMenuOpen ? (_jsx(X, { className: "w-5 h-5 text-gray-700" })) : (_jsx(Menu, { className: "w-5 h-5 text-gray-700" })) })] })] }) }), isMobileMenuOpen && (_jsx("div", { ref: mobileMenuRef, className: "md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/95 border-b border-gray-200/50", children: _jsxs("div", { className: "px-6 py-4 space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("a", { href: "/", className: "block text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors duration-200", children: "Home" }), _jsx("a", { href: "/dashboard", className: "block text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors duration-200", children: "Dashboard" })] }), _jsx("div", { className: "pt-3 border-t border-gray-200/50", children: isLoggedIn ? (_jsxs("div", { className: "flex items-center justify-between py-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center", children: _jsx(User, { className: "w-4 h-4 text-white" }) }), _jsxs("span", { className: "text-gray-700 font-medium", children: ["Welcome, ", fullName] })] }), _jsxs("button", { onClick: handleLogout, className: "flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200", children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Logout" })] })] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx("a", { href: "/login", className: "block text-center text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200", children: "Login" }), _jsx("a", { href: "/register", className: "block text-center text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200", children: "Sign up" })] })) })] }) }))] }), _jsx("div", { className: "h-16" })] }));
};
export default Navbar;
