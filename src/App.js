import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GitHubRepos from './components/GitHubRepos';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';


const AppContent = () => {
    const { isDark, theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const constraintsRef = React.useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 2500); // Increased loading time so animation is visible
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <CustomCursor theme={isDark ? 'dark' : 'light'} />
            <div ref={constraintsRef} style={{ position: 'fixed', top: 10, left: 10, right: 10, bottom: 10, pointerEvents: 'none', zIndex: 9998 }} />
            
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
                overflowX: 'hidden'
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
                
                {/* Floating Mascot */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.1}
                    dragMomentum={true}
                    onPointerDown={() => {
                        const audio = new Audio(process.env.PUBLIC_URL + '/u_xg7ssi08yr-boing-379665.mp3');
                        audio.volume = 0.5;
                        audio.play().catch(e => console.log('Audio blocked', e));
                    }}
                    onAnimationComplete={(definition) => {
                        // Play sound when it finishes dropping (y becomes 0)
                        if (definition.y === 0) {
                            const audio = new Audio(process.env.PUBLIC_URL + '/u_xg7ssi08yr-boing-379665.mp3');
                            audio.volume = 0.4;
                            audio.play().catch(e => console.log('Audio blocked', e));
                        }
                    }}
                    initial={{ y: -800, opacity: 0 }}
                    animate={loading ? { y: -800, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 12,
                        delay: 0.5 // small delay after loader fades
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileDrag={{ scale: 1.25, rotate: 10, cursor: 'grabbing' }}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        right: '40px',
                        zIndex: 9999,
                        cursor: 'grab',
                        width: 'clamp(60px, 10vw, 90px)',
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + '/Tumblr_ Image.gif'}
                        alt="Mascot"
                        style={{ width: '100%', height: 'auto', pointerEvents: 'none', filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.3))' }}
                    />
                </motion.div>
            </div>
        </>
    );
};

const App = () => (
    <ThemeProvider><AppContent /></ThemeProvider>
);

export default App;