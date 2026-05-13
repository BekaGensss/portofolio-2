import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiHome, FiUser, FiBriefcase, FiGithub, FiAward, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';

const getLinks = (lang) => [
    { href: '#home',         icon: FiHome,      label: lang === 'ID' ? 'Beranda' : 'Home'         },
    { href: '#about',        icon: FiUser,      label: lang === 'ID' ? 'Tentang' : 'About'        },
    { href: '#projects',     icon: FiBriefcase, label: lang === 'ID' ? 'Proyek' : 'Projects'     },
    { href: '#github',       icon: FiGithub,    label: 'GitHub'       },
    { href: '#certificates', icon: FiAward,     label: lang === 'ID' ? 'Sertifikasi' : 'Certificates' },
    { href: '#contact',      icon: FiMail,      label: lang === 'ID' ? 'Kontak' : 'Contact'      },
];

const scrollTo = (id, cb) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    if (cb) cb();
};

const Navbar = () => {
    const { isDark, theme, toggleTheme, lang, toggleLang } = useTheme();
    const [active, setActive]   = useState('home');
    const [open, setOpen]       = useState(false);

    useEffect(() => {
        const ids = ['home', 'about', 'projects', 'github', 'certificates', 'contact'];
        const onScroll = () => {
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 150) setActive(id);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* ─────────────── DESKTOP: Centered icon-only pill ─────────────── */}
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="nav-desk-pill"
                style={{
                    position: 'fixed',
                    top: 14,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1000,
                    pointerEvents: 'none',   /* let clicks pass through wrapper */
                }}
            >
                {/* Inner pill — pointer events restored */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    background: isDark ? 'rgba(14,14,14,0.92)' : 'rgba(240,240,235,0.92)',
                    backdropFilter: 'blur(32px)',
                    border: `1px solid ${theme.border}`,
                    borderRadius: 100,
                    padding: '5px 8px',
                    boxShadow: isDark
                        ? '0 8px 40px rgba(0,0,0,0.7)'
                        : '0 8px 40px rgba(0,0,0,0.12)',
                    pointerEvents: 'all',
                }}>
                    {getLinks(lang).map(l => {
                        const isAct = active === l.href.replace('#', '');
                        const Icon  = l.icon;
                        return (
                            <motion.a layout key={l.href} href={l.href}
                                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                                title={l.label}
                                style={{
                                    height: 38, borderRadius: 100,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    padding: isAct ? '0 16px' : '0 11.5px',
                                    background: isAct
                                        ? (isDark ? 'rgba(212, 175, 55,0.15)' : 'rgba(184, 134, 11,0.12)')
                                        : 'transparent',
                                    border: `1px solid ${isAct ? 'rgba(212, 175, 55,0.4)' : 'transparent'}`,
                                    color: isAct ? '#d4af37' : theme.textMuted,
                                    textDecoration: 'none', cursor: 'pointer',
                                    transition: 'background 0.2s, color 0.2s',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={e => {
                                    if (!isAct) {
                                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                                        e.currentTarget.style.color = theme.textPrimary;
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isAct) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = theme.textMuted;
                                    }
                                }}
                            >
                                <Icon size={15} style={{ flexShrink: 0 }} />
                                <AnimatePresence>
                                    {isAct && (
                                        <motion.span
                                            initial={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
                                            animate={{ maxWidth: 100, opacity: 1, marginLeft: 8 }}
                                            exit={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                fontSize: 13, fontWeight: 700, fontFamily: 'Outfit, sans-serif',
                                                whiteSpace: 'nowrap', overflow: 'hidden'
                                            }}
                                        >
                                            {l.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.a>
                        );
                    })}
                </div>
            </motion.div>

            {/* ─────────────── DESKTOP: Lang & Theme toggle fixed right ─────────────── */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="nav-desk-pill"
                style={{
                    position: 'fixed', top: 14, right: 16, zIndex: 1000,
                    display: 'flex', gap: 8,
                }}
            >
                <button
                    onClick={toggleLang}
                    aria-label="Toggle language"
                    style={{
                        width: 40, height: 40, borderRadius: 100,
                        background: isDark ? 'rgba(14,14,14,0.92)' : 'rgba(240,240,235,0.92)',
                        backdropFilter: 'blur(32px)',
                        border: `1px solid ${theme.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: theme.textPrimary, cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 13,
                        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = theme.textPrimary; e.currentTarget.style.borderColor = theme.border; }}
                >
                    {lang}
                </button>
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    style={{
                        width: 40, height: 40, borderRadius: 100,
                        background: isDark ? 'rgba(14,14,14,0.92)' : 'rgba(240,240,235,0.92)',
                        backdropFilter: 'blur(32px)',
                        border: `1px solid ${theme.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: theme.textMuted, cursor: 'pointer',
                        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = theme.textMuted; e.currentTarget.style.borderColor = theme.border; }}
                >
                    {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
                </button>
            </motion.div>

            {/* ─────────────── MOBILE: Top bar ─────────────── */}
            <div className="nav-mob-bar" style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: 54, zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 16px',
                background: isDark ? 'rgba(10,10,10,0.96)' : 'rgba(245,245,240,0.96)',
                backdropFilter: 'blur(24px)',
                borderBottom: `1px solid ${theme.border}`,
            }}>
                {/* Yellow dot brand */}
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: '50%', background: '#d4af37',
                        boxShadow: '0 0 10px rgba(212, 175, 55,0.6)',
                    }} />
                    <span style={{
                        fontFamily:'Outfit, sans-serif', fontWeight:800,
                        fontSize:14, color:theme.textPrimary, letterSpacing:'-0.5px',
                    }}>BARA</span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={toggleLang} aria-label="Toggle language" style={{
                        width: 34, height: 34, borderRadius: 9,
                        background: 'transparent', border: `1px solid ${theme.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: theme.textPrimary, cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 12,
                    }}>
                        {lang}
                    </button>
                    <button onClick={toggleTheme} aria-label="Toggle theme" style={{
                        width: 34, height: 34, borderRadius: 9,
                        background: 'transparent', border: `1px solid ${theme.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: theme.textMuted, cursor: 'pointer',
                    }}>
                        {isDark ? <FiSun size={13} /> : <FiMoon size={13} />}
                    </button>
                    <button onClick={() => setOpen(o => !o)} aria-label="Menu" style={{
                        width: 34, height: 34, borderRadius: 9,
                        background: open ? '#d4af37' : 'transparent',
                        border: `1px solid ${open ? '#d4af37' : theme.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: open ? '#000' : theme.textPrimary, cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}>
                        {open ? <FiX size={15} /> : <FiMenu size={15} />}
                    </button>
                </div>
            </div>

            {/* ─────────────── MOBILE: Drawer ─────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
                        style={{
                            position: 'fixed', top: 54, left: 0, right: 0, zIndex: 999,
                            background: isDark ? 'rgba(10,10,10,0.98)' : 'rgba(245,245,240,0.98)',
                            backdropFilter: 'blur(24px)',
                            borderBottom: `1px solid ${theme.border}`,
                            padding: '8px 12px 12px',
                        }}
                    >
                        {getLinks(lang).map(l => {
                            const isAct = active === l.href.replace('#', '');
                            const Icon  = l.icon;
                            return (
                                <a key={l.href} href={l.href}
                                    onClick={e => { e.preventDefault(); scrollTo(l.href, () => setOpen(false)); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '11px 14px', borderRadius: 12, marginBottom: 4,
                                        fontSize: 14, fontWeight: isAct ? 700 : 500,
                                        fontFamily: 'Inter,sans-serif',
                                        color: isAct ? '#000' : theme.textSecondary,
                                        background: isAct ? '#d4af37' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <Icon size={15} /> {l.label}
                                </a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─────────────── RESPONSIVE CSS ─────────────── */}
            <style>{`
                .nav-desk-pill { display: flex !important; }
                .nav-mob-bar   { display: none !important; }

                @media (max-width: 767px) {
                    .nav-desk-pill { display: none !important; }
                    .nav-mob-bar   { display: flex !important; }
                }
            `}</style>
        </>
    );
};

export default Navbar;