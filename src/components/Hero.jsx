import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typed } from 'react-typed';
import { FiDownload, FiArrowRight, FiGithub } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import DraggableBadge from './DraggableBadge';

/* Satu band ticker — lebih tebal dan smooth */
const Band = ({ top, rotate, dir, speed, isDark }) => {
    const txt = 'BARA KUSUMA — ';
    const rep = Array(40).fill(txt).join('');
    const anim = dir > 0 ? 'tickR' : 'tickL';
    return (
        <div className="hero-band" style={{
            position: 'absolute', left: '-100%', width: '300%',
            top, transform: `rotate(${rotate}deg)`,
            background: isDark ? '#1a1a1a' : '#e5e5e5', padding: '14px 0',
            overflow: 'hidden', whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
            willChange: 'transform',
        }}>
            <div style={{
                display: 'inline-block',
                animation: `${anim} ${speed}s linear infinite`,
                fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                fontSize: 16, color: isDark ? '#d4af37' : '#b8860b', letterSpacing: 2,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }}>{rep}</div>
        </div>
    );
};

const Hero = () => {
    const { theme, isDark, lang } = useTheme();
    const el = useRef(null);

    useEffect(() => {
        if (!el.current) return;
        const strings = lang === 'ID' 
            ? ['Web Developer', 'Laravel Developer', 'React Developer', 'Full Stack Dev']
            : ['Web Developer', 'Laravel Developer', 'React Developer', 'Full Stack Dev'];
        
        const t = new Typed(el.current, {
            strings,
            typeSpeed: 55, backSpeed: 35, backDelay: 2200, loop: true,
        });
        return () => t.destroy();
    }, [lang]);

    /* 4 bands forming an X — repositioned for mobile clarity */
    const bands = [
        { top: '18%', rotate: -40, dir: 1,  speed: 22 },
        { top: '68%', rotate: -40, dir: -1, speed: 20 },
        { top: '18%', rotate: 40,  dir: -1, speed: 21 },
        { top: '68%', rotate: 40,  dir: 1,  speed: 23 },
    ];

    return (
        <section id="home" style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', position: 'relative', overflow: 'hidden',
            paddingTop: 'clamp(72px, 10vw, 88px)',
            paddingBottom: 'clamp(40px, 6vw, 60px)',
        }}>
            {/* === ELEGANT GLOWING ORBS BACKGROUND === */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute', top: '10%', right: '10%',
                        width: '40vw', height: '40vw',
                        background: isDark ? 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)' : 'radial-gradient(circle, rgba(184,134,11,0.15) 0%, rgba(255,255,255,0) 70%)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        willChange: 'transform, opacity',
                    }}
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -40, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    style={{
                        position: 'absolute', bottom: '-10%', left: '-5%',
                        width: '50vw', height: '50vw',
                        background: isDark ? 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)' : 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(255,255,255,0) 70%)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        willChange: 'transform, opacity',
                    }}
                />
            </div>

            {/* === DIAGONAL PATTERN === */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                backgroundImage: isDark
                    ? 'repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.015) 40px,rgba(255,255,255,0.015) 41px)'
                    : 'repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(0,0,0,0.015) 40px,rgba(0,0,0,0.015) 41px)',
            }} />

            {/* === TICKER TAPES === */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
                {bands.map((b, i) => <Band key={i} {...b} isDark={isDark} />)}
            </div>

            {/* === CONTENT === */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
                <DraggableBadge photoUrl={process.env.PUBLIC_URL + '/profile.jpg'} />
            </div>

            <div style={{
                position: 'relative', zIndex: 10,
                maxWidth: 1200, width: '100%',
                margin: '0 auto',
                padding: '0 clamp(16px,4vw,40px)',
            }}>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
                >
                    <div className="hero-flex-row" style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'clamp(32px,5vw,80px)',
                        flexWrap: 'wrap',
                    }}>
                        {/* LEFT: Text Content */}
                        <div style={{ flex: '1 1 400px', minWidth: 0, zIndex: 10 }}>

                            {/* "Hi, I'm" */}
                            <motion.p
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.7 }}
                                style={{
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 500,
                                    fontSize: 'clamp(18px,2.5vw,24px)',
                                    color: theme.textSecondary, marginBottom: 8,
                                    letterSpacing: '1px', textTransform: 'uppercase',
                                }}
                            >
                                {lang === 'ID' ? 'Halo, Saya' : "Hi, I'm"}
                            </motion.p>

                            {/* BIG NAME */}
                            <motion.h1
                                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                style={{
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                                    fontSize: 'clamp(3.5rem,8vw,6.5rem)',
                                    lineHeight: 1,
                                    letterSpacing: '-2px',
                                    textTransform: 'uppercase',
                                    margin: '0 0 24px',
                                    color: theme.textPrimary,
                                }}
                            >
                                BARA<br/>
                                <span style={{
                                    color: 'transparent',
                                    WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.7)' : '2px rgba(0,0,0,0.6)',
                                }}>KUSUMA</span>
                            </motion.h1>

                            {/* Typed */}
                            <motion.div
                                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                style={{
                                    fontSize: 'clamp(15px,2vw,18px)',
                                    fontFamily: 'Inter, sans-serif', fontWeight: 400,
                                    marginBottom: 32,
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    color: theme.textSecondary,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                <span style={{ width: 40, height: 2, background: theme.accent }} />
                                <span>{lang === 'ID' ? 'Saya seorang' : 'I am a'} <span style={{ color: theme.textPrimary, fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}><span ref={el} /></span></span>
                            </motion.div>

                            {/* Description box */}
                            <motion.div
                                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
                                    backdropFilter: 'blur(24px)',
                                    borderRadius: 20, padding: '24px 32px',
                                    marginBottom: 36, maxWidth: 520,
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                }}
                            >
                                <p style={{
                                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                                    fontSize: 'clamp(14.5px,1.6vw,16.5px)',
                                    lineHeight: 1.8, color: theme.textSecondary, margin: 0,
                                }}>
                                    {lang === 'ID' 
                                        ? 'Full Stack Developer yang sangat bersemangat menciptakan pengalaman web yang elegan, responsif, dan luar biasa menggunakan teknologi modern.'
                                        : 'A passionate Full Stack Developer creating elegant, responsive, and exceptional web experiences using modern technologies.'}
                                </p>
                            </motion.div>

                            {/* Buttons */}
                            <motion.div
                                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                style={{
                                    display: 'inline-flex', flexWrap: 'wrap', gap: 16,
                                }}
                            >
                                <a href="#projects"
                                    onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="btn-p"
                                >
                                    {lang === 'ID' ? 'Lihat Proyek' : 'View Projects'} <FiArrowRight size={16} />
                                </a>
                                <a href={process.env.PUBLIC_URL + '/CV-Bara-Kusuma.pdf'} download="CV-Bara-Kusuma.pdf"
                                    className="btn-s"
                                >
                                    <FiDownload size={16} /> {lang === 'ID' ? 'Unduh CV' : 'Download CV'}
                                </a>
                            </motion.div>
                        </div>

                        {/* RIGHT: Empty space for the 3D badge to hang */}
                        <div style={{ flex: '1 1 400px', minWidth: 0, height: 'clamp(400px, 60vh, 600px)', pointerEvents: 'none' }}>
                            {/* The 3D canvas is full-screen in the background, but visually the badge will hang here */}
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @keyframes tickR { 0% {transform:translate3d(0,0,0)} 100% {transform:translate3d(-33.33%,0,0)} }
                @keyframes tickL { 0% {transform:translate3d(-33.33%,0,0)} 100% {transform:translate3d(0,0,0)} }
                
                /* Photo always visible */
                .hero-photo-wrap { display:flex !important; }

                #home .hero-band {
                    opacity: 0.95;
                }

                /* Mobile: hero layout */
                @media(max-width:900px) {
                    .hero-flex-row {
                        flex-direction: column-reverse !important;
                        text-align: left;
                        gap: 50px !important;
                    }
                    .hero-flex-row > div:first-child {
                        flex: 1 1 100% !important;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .hero-photo-wrap { margin-bottom: 0px; }
                    .hero-badge {
                        right: 50% !important;
                        bottom: -15px !important;
                        transform: translateX(50%) !important;
                    }
                }
                
                @media(max-width:767px) {
                    #home {
                        padding-top: 100px !important;
                        min-height: 100svh;
                    }
                    /* Make bands visible on mobile */
                    #home .hero-band {
                        opacity: 0.9 !important;
                    }
                    .hero-photo-wrap > div > div {
                        width: clamp(160px, 50vw, 220px) !important;
                        height: clamp(160px, 50vw, 220px) !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;