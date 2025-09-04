import React, { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
    const getInitialTheme = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPrefs = window.localStorage.getItem('isDarkMode');
            return storedPrefs ? JSON.parse(storedPrefs) : true;
        }
        return true;
    };

    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        }
    }, [isDarkMode]);

    const particlesInit = async (main) => {
        await loadSlim(main);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            <div className={`loader-container ${isLoading ? '' : 'hidden'}`}>
                <div className="loader"></div>
            </div>

            {/* PERBAIKAN: Tambahkan kelas font-sans pada div terluar */}
            {/* PERBAIKAN: Tambahkan kelas Flexbox untuk tata letak yang sempurna */}
            <div className={`
                min-h-screen
                ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}
                transition-colors duration-500
                relative
                flex flex-col
                font-sans
            `}>
                
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        background: { color: { value: "transparent" } },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: { enable: true, mode: "push" },
                                onHover: { enable: true, mode: "repulse" },
                                resize: true,
                            },
                            modes: {
                                push: { quantity: 4 },
                                repulse: { distance: 200, duration: 0.4 },
                            },
                        },
                        particles: {
                            color: { value: isDarkMode ? "#4ade80" : "#0d9488" },
                            links: {
                                color: isDarkMode ? "#6b7280" : "#d1d5db",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: { enable: true },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: { default: "bounce" },
                                random: false,
                                speed: 2,
                                straight: false,
                            },
                            number: {
                                density: { enable: true, area: 800 },
                                value: 80,
                            },
                            opacity: { value: 0.5 },
                            shape: { type: "circle" },
                            size: { value: { min: 1, max: 5 } },
                        },
                        detectRetina: true,
                    }}
                />

                {/* PERBAIKAN: Gunakan Flexbox untuk mendorong footer ke bawah */}
                <div className="relative z-10 flex flex-col flex-grow">
                    <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                    <main className="flex-grow">
                        <Hero isDarkMode={isDarkMode} />
                        <About />
                        <Projects />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default App;