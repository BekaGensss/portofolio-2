import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiX } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { SectionHeading } from './About';

import project1Image1 from '../assets/project1-gambar1.png';
import project1Image2 from '../assets/project1-gambar2.png';
import project2Image1 from '../assets/project2-gambar1.png';
import project2Image2 from '../assets/project2-gambar2.png';
import project3Image1 from '../assets/project3-gambar1.png';
import project3Image2 from '../assets/project3-gambar2.png';

const tagColorsDark = {
    PHP:        { bg:'rgba(119,123,180,0.12)', t:'#a5b4fc', b:'rgba(119,123,180,0.2)' },
    CSS:        { bg:'rgba(34,211,238,0.1)',   t:'#67e8f9', b:'rgba(34,211,238,0.2)'  },
    Laravel:    { bg:'rgba(255,45,32,0.1)',    t:'#fca5a5', b:'rgba(255,45,32,0.18)'  },
    Python:     { bg:'rgba(52,175,215,0.1)',   t:'#93c5fd', b:'rgba(52,175,215,0.2)'  },
    HTML:       { bg:'rgba(227,79,38,0.1)',    t:'#fdba74', b:'rgba(227,79,38,0.2)'   },
    JavaScript: { bg:'rgba(247,223,30,0.1)',   t:'#fde68a', b:'rgba(247,223,30,0.18)' },
    React:      { bg:'rgba(34,211,238,0.1)',   t:'#a5f3fc', b:'rgba(34,211,238,0.2)'  },
};

const projects = [
    {
        num: '01', title: 'Sistem Absensi Sekolah', subtitle: 'Aplikasi Web',
        description: 'Sistem absensi modern dengan barcode scanning, laporan real-time, manajemen siswa & guru, dan dashboard analitik berbasis Laravel.',
        longDescription: 'Sistem absensi sekolah komprehensif dibangun dengan Laravel dan Tailwind CSS. Fitur barcode scanning, laporan kehadiran real-time, manajemen data siswa dan guru, serta dashboard analitik.',
        githubLink: 'https://github.com/BekaGensss/absensi-barcode',
        tags: ['PHP','CSS','Laravel'],
        images: [project1Image1, project1Image2],
        accent: '#d4af37',
    },
    {
        num: '02', title: 'Game Catur Python', subtitle: 'Aplikasi Desktop',
        description: 'Permainan catur lengkap dengan Python — implementasi semua aturan bidak, sistem giliran, dan deteksi skak-mat via OOP.',
        longDescription: 'Permainan catur yang dikembangkan sepenuhnya dengan Python menggunakan OOP. Implementasi semua aturan bidak, sistem giliran, dan deteksi skak-mat.',
        githubLink: 'https://github.com/BekaGensss/game_catur',
        tags: ['Python'],
        images: [project2Image1, project2Image2],
        accent: '#22d3ee',
    },
    {
        num: '03', title: 'Portfolio Website', subtitle: 'Proyek Frontend',
        description: 'Website portfolio interaktif dengan HTML, CSS, dan JavaScript — animasi halus dan layout responsif untuk semua perangkat.',
        longDescription: 'Website portfolio pribadi dibangun dengan HTML, CSS, dan JavaScript. Desain berfokus pada UX intuitif, animasi halus, layout responsif untuk semua perangkat.',
        githubLink: 'https://github.com/BekaGensss/my-portfolio',
        tags: ['HTML','CSS','JavaScript'],
        images: [project3Image1, project3Image2],
        accent: '#f43f5e',
    },
];

/* ── Inline Modal ── */
const Modal = ({ project, onClose, isDark, theme }) => {
    const [imgIdx, setImgIdx] = useState(0);
    if (!project) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, zIndex: 2000,
                background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 16 }}
                onClick={e => e.stopPropagation()}
                style={{
                    background: isDark ? '#111' : '#fff',
                    border: `1px solid ${theme.border}`,
                    borderRadius: 24, overflow: 'hidden',
                    width: '100%', maxWidth: 640,
                    maxHeight: '90vh', overflowY: 'auto',
                    boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
                }}
            >
                {/* Image */}
                <div style={{ position: 'relative', height: 240, background: theme.bgCard, overflow: 'hidden' }}>
                    <img src={project.images[imgIdx]} alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
                    }} />
                    {/* Top accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${project.accent},transparent)` }} />
                    {/* Dots */}
                    {project.images.length > 1 && (
                        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                            {project.images.map((_, i) => (
                                <button key={i} onClick={() => setImgIdx(i)}
                                    style={{
                                        width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 3,
                                        border: 'none', cursor: 'pointer', padding: 0,
                                        background: i === imgIdx ? '#d4af37' : 'rgba(255,255,255,0.35)',
                                        transition: 'all 0.2s',
                                    }} />
                            ))}
                        </div>
                    )}
                    <button onClick={onClose} style={{
                        position: 'absolute', top: 12, right: 12, width: 34, height: 34,
                        borderRadius: 9, border: 'none', cursor: 'pointer',
                        background: 'rgba(0,0,0,0.55)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(6px)',
                    }}>
                        <FiX size={15} />
                    </button>
                </div>
                {/* Content */}
                <div style={{ padding: 'clamp(18px,3vw,28px)' }}>
                    <div style={{ fontFamily: 'Inter', fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: theme.textMuted, marginBottom: 6 }}>{project.subtitle}</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800, color: theme.textPrimary, letterSpacing: '-0.5px', marginBottom: 10 }}>{project.title}</h3>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 14, lineHeight: 1.8, color: theme.textSecondary, marginBottom: 18 }}>{project.longDescription}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 22 }}>
                        {project.tags.map(t => {
                            const c = tagColorsDark[t] || { bg: 'rgba(212, 175, 55,0.1)', t: '#d4af37', b: 'rgba(212, 175, 55,0.2)' };
                            return <span key={t} style={{ padding: '3px 11px', borderRadius: 100, fontSize: 10.5, fontWeight: 700, fontFamily: 'Inter', background: c.bg, color: c.t, border: `1px solid ${c.b}` }}>{t}</span>;
                        })}
                    </div>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-p" style={{ width: '100%', justifyContent: 'center' }}>
                        <FiGithub size={14} /> Lihat di GitHub
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const { theme, isDark, lang } = useTheme();
    const [sel, setSel] = useState(null);
    const [hov, setHov] = useState(null);

    return (
        <section id="projects" style={{ padding: 'clamp(64px,10vh,100px) 0', position: 'relative' }}>
            <div className="hdiv" />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vh,72px) clamp(16px,4vw,40px) 0' }}>

                {/* Header */}
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 11, color: theme.textMuted, letterSpacing: 3, textTransform: 'uppercase' }}>// {lang === 'ID' ? 'PROYEK SAYA' : 'MY PROJECTS'}</span>
                    <SectionHeading solid={lang === 'ID' ? 'PROYEK' : 'MY'} outline={lang === 'ID' ? 'SAYA.' : 'WORK.'} theme={theme} isDark={isDark} />
                    <p style={{
                        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                        fontSize: 'clamp(14px,1.5vw,16px)',
                        color: theme.textSecondary, maxWidth: 400, marginTop: 10,
                    }}>
                        {lang === 'ID' ? 'Proyek yang mencerminkan cara saya berpikir dan bekerja.' : 'Projects that reflect how I think and work.'}
                    </p>
                </motion.div>

                {/* Numbered list */}
                <div>
                    {projects.map((p, idx) => (
                        <motion.div key={idx}
                            initial={{ y: 24, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16,1,0.3,1] }}
                            viewport={{ once: true }}
                        >
                            <div
                                onClick={() => setSel(p)}
                                onMouseEnter={() => setHov(idx)}
                                onMouseLeave={() => setHov(null)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'clamp(34px,5vw,56px) 1fr auto',
                                    alignItems: 'center',
                                    gap: 'clamp(10px,2.5vw,24px)',
                                    padding: `clamp(14px,2.5vw,22px) clamp(8px,1.5vw,16px)`,
                                    paddingLeft: hov === idx ? 'clamp(16px,3vw,28px)' : 'clamp(8px,1.5vw,16px)',
                                    borderBottom: `1px solid ${theme.divider}`,
                                    borderTop: idx === 0 ? `1px solid ${theme.divider}` : 'none',
                                    cursor: 'pointer',
                                    borderRadius: 14,
                                    background: hov === idx
                                        ? (isDark ? 'rgba(212, 175, 55,0.02)' : 'rgba(184, 134, 11,0.02)')
                                        : 'transparent',
                                    transition: 'all 0.4s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Number */}
                                <span style={{
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 300,
                                    fontSize: 'clamp(14px,1.8vw,20px)',
                                    color: hov === idx ? theme.accent : theme.textMuted,
                                    letterSpacing: 1, transition: 'color 0.4s ease',
                                    opacity: hov === idx ? 1 : 0.6
                                }}>
                                    {p.num}
                                </span>

                                {/* Content */}
                                <div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                                        <h3 style={{
                                            fontFamily: 'Outfit, sans-serif',
                                            fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 600,
                                            color: hov === idx ? theme.textPrimary : theme.textSecondary,
                                            margin: 0, letterSpacing: '-0.5px',
                                            transition: 'color 0.4s ease',
                                        }}>{p.title}</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                            {p.tags.map(t => {
                                                const c = tagColorsDark[t] || {};
                                                return <span key={t} style={{
                                                    padding: '2px 8px', borderRadius: 100,
                                                    fontSize: 10, fontWeight: 700, fontFamily: 'Inter',
                                                    background: isDark ? (c.bg || 'rgba(212, 175, 55,0.1)') : 'rgba(0,0,0,0.05)',
                                                    color: isDark ? (c.t || '#d4af37') : theme.textMuted,
                                                    border: `1px solid ${isDark ? (c.b || 'rgba(212, 175, 55,0.2)') : theme.border}`,
                                                }}>{t}</span>;
                                            })}
                                        </div>
                                    </div>
                                    <p style={{
                                        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(12px,1.3vw,14px)',
                                        color: theme.textMuted, lineHeight: 1.7, margin: 0,
                                        display: '-webkit-box', WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                    }}>{p.description}</p>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                    <a href={p.githubLink} target="_blank" rel="noopener noreferrer"
                                        aria-label="GitHub" onClick={e => e.stopPropagation()}
                                        style={{
                                            width: 34, height: 34, borderRadius: 9,
                                            border: `1px solid ${theme.border}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: theme.textMuted, textDecoration: 'none',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212, 175, 55,0.4)'; e.currentTarget.style.color = '#d4af37'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; }}
                                    >
                                        <FiGithub size={13} />
                                    </a>
                                    <div style={{
                                        width: 34, height: 34, borderRadius: 9,
                                        border: `1px solid ${hov === idx ? '#d4af37' : theme.border}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: hov === idx ? '#d4af37' : theme.textMuted,
                                        transition: 'all 0.22s',
                                    }}>
                                        <FiArrowUpRight size={13} style={{ transform: hov === idx ? 'rotate(-45deg)' : 'none', transition: 'transform 0.22s' }} />
                                    </div>
                                </div>

                                {/* Hover: floating preview image */}
                                <AnimatePresence>
                                    {hov === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.88, y: 8 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.88, y: 8 }}
                                            transition={{ duration: 0.18 }}
                                            style={{
                                                position: 'absolute', right: 90, top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: 130, height: 84, borderRadius: 10,
                                                overflow: 'hidden', border: `1px solid ${theme.border}`,
                                                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                                                pointerEvents: 'none', zIndex: 10,
                                            }}
                                        >
                                            <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {sel && <Modal project={sel} onClose={() => setSel(null)} isDark={isDark} theme={theme} />}
            </AnimatePresence>
        </section>
    );
};

export default Projects;