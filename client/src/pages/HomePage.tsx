import React, { useEffect, useRef } from "react";

const HomePage: React.FC = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const titleText = "Private Lesson,";
    const descriptionText =
        "Technical test for MiHotel, where I created a mini " +
        "web application to manage professor authentification and lessons listing. " +
        "The application runs on a modern frontend (React.js & Tailwind CSS) and communicates with a SpringBoot API for all data creation, reading, modification, and deletion operations.";

    const typeText = (
        el: HTMLDivElement,
        text: string,
        speed: number = 30
    ): Promise<void> => {
        return new Promise((resolve) => {
            let i = 0;
            const tick = () => {
                if (i <= text.length) {
                    el.innerHTML = text.slice(0, i) + '<span class="cursor">|</span>';
                    i++;
                    setTimeout(tick, speed);
                } else {
                    el.innerHTML = text;
                    resolve();
                }
            };
            tick();
        });
    };

    useEffect(() => {
        const animate = async () => {
            if (titleRef.current && textRef.current) {
                await typeText(titleRef.current, titleText, 70);
                await typeText(textRef.current, descriptionText, 20);
            }
        };
        animate();
    }, []);

    return (
        <div
            className="p-6 min-h-screen"
            style={{
                backgroundImage: `
                    linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
                    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M16 0H0V16' fill='none' stroke='%23ccc' stroke-width='0.5'/></svg>")
                `,
                backgroundRepeat: "repeat",
            }}
        >
            <h1 className="main-title mt-20 text-left">
                <div
                    ref={titleRef}
                    className="font-extrabold italic uppercase text-black text-5xl md:text-6xl block"
                ></div>
                <span className="italic uppercase text-black text-xl md:text-3xl font-bold block mt-1">
                    (Leçon privée*)
                </span>
                <div
                    ref={textRef}
                    className="italic text-black text-sm md:text-xl font-medium mt-4 whitespace-pre-wrap"
                ></div>
            </h1>

            <style>{`
                .cursor {
                    display: inline-block;
                    width: 1px;
                    background-color: black;
                    animation: blink 1s step-start infinite;
                    margin-left: 2px;
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default HomePage;
