import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const CustomCursor = ({ isInFooter }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const move = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);
    return (_jsx("div", { className: "fixed z-[9999] pointer-events-none", style: {
            top: position.y - 32,
            left: position.x - 32,
            width: 80,
            height: 80,
            borderRadius: "9999px",
            border: `2px solid ${isInFooter ? "#ffffff" : "#000000"}`,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.3s ease",
        }, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: isInFooter ? "#ffffff" : "#000000", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: {
                transition: "stroke 0.3s ease",
                transform: "rotate(-45deg)",
            }, children: _jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) }) }));
};
export default CustomCursor;
