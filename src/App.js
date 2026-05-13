import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GitHubRepos from './components/GitHubRepos';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Loader from './components/Loader';


const AppContent = () => {
    const { isDark, theme } = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 2500); // Increased loading time so animation is visible
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <div style={{
                opacity: loading ? 1 : 0,
                pointerEvents: loading ? 'all' : 'none',
                transition: 'opacity 0.6s ease',
                position: 'fixed', inset: 0, zIndex: 9999,
                background: isDark ? '#0a0a0a' : '#f5f5f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Loader theme={isDark ? 'dark' : 'light'} />
            </div>

            <div style={{
                minHeight: '100vh',
                backgroundColor: theme.bg,
                transition: 'background-color 0.4s ease',
                display: 'flex', flexDirection: 'column',
            }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                    <Hero />
                    <About />
                    <Projects />
                    <GitHubRepos />
                    <Certificates />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    );
};

const App = () => (
    <ThemeProvider><AppContent /></ThemeProvider>
);

export default App;