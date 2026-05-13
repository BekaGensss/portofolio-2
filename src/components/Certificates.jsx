import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { SectionHeading } from './About';

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const ci = { hidden: { y: 28, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } } };

const certs = [
    {
        title:    'Meta Frontend Developer',
        issuer:   'Meta (Coursera)',
        date:     '2023',
        desc:     'Sertifikasi profesional dalam pengembangan frontend modern dengan React, JavaScript, dan UI/UX best practices.',
        href:     'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        color:    '#d4af37',
        icon:     '🎓',
    },
    {
        title:    'Laravel Fundamentals',
        issuer:   'Udemy',
        date:     '2023',
        desc:     'Penguasaan framework Laravel dari routing, Eloquent ORM, hingga deployment aplikasi web production-ready.',
        href:     '#',
        color:    '#f87171',
        icon:     '🔥',
    },
    {
        title:    'JavaScript Algorithms & Data Structures',
        issuer:   'freeCodeCamp',
        date:     '2022',
        desc:     'Sertifikasi algoritma dan struktur data menggunakan JavaScript — dari dasar hingga advanced problem solving.',
        href:     'https://www.freecodecamp.org/certification/',
        color:    '#34d399',
        icon:     '⚡',
    },
];

const Certificates = () => {
    const { theme, isDark, lang } = useTheme();

    return (
        <section id="certificates" style={{ padding: 'clamp(72px, 12vh, 120px) 0', position: 'relative' }}>
            <div className="hdiv" />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vh,80px) clamp(16px,4vw,40px) 0' }}>

                {/* Header */}
                <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="section-header-flex"
                    style={{
                        display: 'flex', flexWrap: 'wrap',
                        justifyContent: 'space-between', alignItems: 'flex-end',
                        gap: 20, marginBottom: 'clamp(36px, 6vh, 56px)',
                    }}
                >
                    <div>
                        <span className="stag"><FiAward size={10} /> {lang === 'ID' ? 'Sertifikasi' : 'Certification'}</span>
                        <SectionHeading solid={lang === 'ID' ? 'SERTIFIKAT' : 'MY'} outline={lang === 'ID' ? 'SAYA.' : 'CERTIFICATES.'} theme={theme} isDark={isDark} />
                    </div>
                    <p className="header-desc-text" style={{
                        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                        fontSize: 'clamp(14px,1.5vw,15.5px)',
                        color: theme.textSecondary, maxWidth: 320, lineHeight: 1.75,
                        textAlign: 'right',
                    }}>
                        {lang === 'ID' ? 'Sertifikasi yang memperkuat kompetensi teknis dan validasi keahlian profesional saya.' : 'Certifications that strengthen my technical competence and validate my professional expertise.'}
                    </p>
                </motion.div>

                {/* Certificate grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={cv}
                    viewport={{ once: true, amount: 0.1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 16,
                    }}
                >
                    {certs.map((cert, idx) => (
                        <motion.div key={idx} variants={ci}>
                            <div className="cert-card" style={{ height: '100%' }}>
                                {/* Top colored bar */}
                                <div style={{
                                    height: 3,
                                    background: `linear-gradient(90deg, ${cert.color}, transparent)`,
                                }} />

                                <div style={{ padding: 'clamp(20px,3vw,28px)' }}>
                                    {/* Icon + issuer */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between', marginBottom: 16,
                                    }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                        }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 12,
                                                background: `${cert.color}15`,
                                                border: `1px solid ${cert.color}25`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 20, flexShrink: 0,
                                            }}>
                                                {cert.icon}
                                            </div>
                                            <div>
                                                <div style={{
                                                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                                                    fontSize: 11, fontWeight: 600,
                                                    letterSpacing: '0.08em', textTransform: 'uppercase',
                                                    color: theme.textMuted, marginBottom: 1,
                                                }}>
                                                    {cert.issuer}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Outfit, sans-serif',
                                                    fontSize: 11.5, fontWeight: 700,
                                                    color: cert.color,
                                                }}>
                                                    {cert.date}
                                                </div>
                                            </div>
                                        </div>
                                        {cert.href && cert.href !== '#' && (
                                            <a
                                                href={cert.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="View Certificate"
                                                onClick={e => e.stopPropagation()}
                                                style={{
                                                    width: 32, height: 32, borderRadius: 8,
                                                    border: `1px solid ${theme.border}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: theme.textMuted, textDecoration: 'none',
                                                    transition: 'all 0.22s ease', flexShrink: 0,
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.borderColor = cert.color + '50';
                                                    e.currentTarget.style.color = cert.color;
                                                    e.currentTarget.style.background = cert.color + '12';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.borderColor = theme.border;
                                                    e.currentTarget.style.color = theme.textMuted;
                                                    e.currentTarget.style.background = 'transparent';
                                                }}
                                            >
                                                <FiExternalLink size={13} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 style={{
                                        fontFamily: 'Outfit, sans-serif',
                                        fontSize: 'clamp(15px,2vw,17.5px)',
                                        fontWeight: 800, color: theme.textPrimary,
                                        marginBottom: 10, letterSpacing: '-0.3px', lineHeight: 1.3,
                                    }}>
                                        {cert.title}
                                    </h3>

                                    {/* Desc */}
                                    <p style={{
                                        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                                        fontSize: 'clamp(13px,1.4vw,14.5px)', lineHeight: 1.75, color: theme.textSecondary,
                                        margin: 0,
                                    }}>
                                        {cert.desc}
                                    </p>

                                    {/* VIEW CERT button */}
                                    {cert.href && cert.href !== '#' && (
                                        <a
                                            href={cert.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                                marginTop: 16, fontSize: 11.5,
                                                fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                                                color: cert.color, textDecoration: 'none',
                                                letterSpacing: 0.5,
                                                transition: 'opacity 0.2s ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            {lang === 'ID' ? 'LIHAT SERTIFIKAT' : 'VIEW CERTIFICATE'} <FiExternalLink size={11} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certificates;
