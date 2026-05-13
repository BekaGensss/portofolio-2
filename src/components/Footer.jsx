import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiGithub, FiLinkedin, FiMail, FiArrowRight, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';

const getNavLinks = (lang) => [
    { href:'#home',         label: lang === 'ID' ? 'Beranda' : 'Home'      },
    { href:'#about',        label: lang === 'ID' ? 'Tentang' : 'About'      },
    { href:'#projects',     label: lang === 'ID' ? 'Proyek' : 'Projects'       },
    { href:'#certificates', label: lang === 'ID' ? 'Sertifikasi' : 'Certificates'  },
    { href:'#contact',      label: lang === 'ID' ? 'Kontak' : 'Contact'       },
];

const Footer = () => {
    const { theme, isDark, lang } = useTheme();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fn = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', fn, { passive:true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const scrollTo = id => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior:'smooth' });
    };

    const infoItems = [
        { icon: FiMapPin,      label: lang === 'ID' ? 'Lokasi' : 'Location',     val:'Indonesia'       },
        { icon: FiBriefcase,   label: lang === 'ID' ? 'Pengalaman' : 'Experience', val: lang === 'ID' ? '2+ Tahun' : '2+ Years'        },
    ];

    return (
        <>
            {/* ── CTA CARD ── */}
            <div style={{ padding:'0 clamp(16px,4vw,40px)', marginBottom:48 }}>
                <motion.div
                    initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ duration:0.6, ease:[0.16,1,0.3,1] }} viewport={{ once:true }}
                    style={{
                        maxWidth:520, margin:'0 auto',
                        background:'linear-gradient(135deg, #d4af37 0%, #f59e0b 100%)',
                        borderRadius:24, padding:'clamp(28px,5vw,44px) clamp(20px,4vw,40px)',
                        textAlign:'center',
                        boxShadow:'0 20px 60px rgba(212, 175, 55,0.3)',
                    }}
                >
                    <h3 style={{
                        fontFamily:'Outfit, sans-serif', fontWeight:800,
                        fontSize:'clamp(22px,4vw,32px)',
                        color:'#000', letterSpacing:'-0.5px', marginBottom:4,
                    }}>{lang === 'ID' ? 'Gulir Sekarang' : 'Scroll Now'}</h3>
                    <p style={{
                        fontFamily:'Inter,sans-serif', fontWeight:600,
                        fontSize:'clamp(13px,2vw,17px)',
                        color:'rgba(0,0,0,0.6)', marginBottom:24,
                    }}>{lang === 'ID' ? 'Temukan Hal Menarik' : 'Discover Interesting Things'}</p>
                    <button
                        onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
                        style={{
                            display:'inline-flex', alignItems:'center', gap:8,
                            padding:'11px 32px', borderRadius:100,
                            background:'rgba(0,0,0,0.12)', border:'2px solid rgba(0,0,0,0.18)',
                            fontFamily:'Outfit, sans-serif', fontWeight:800,
                            fontSize:12, color:'#000', cursor:'pointer',
                            letterSpacing:2, textTransform:'uppercase',
                            transition:'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background='rgba(0,0,0,0.22)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='rgba(0,0,0,0.12)'; }}
                    >
                        ↑ {lang === 'ID' ? 'Kembali ke Atas' : 'Back to Top'}
                    </button>
                </motion.div>
            </div>

            {/* ── FOOTER ── */}
            <footer style={{
                borderTop:`1px solid ${theme.border}`,
                background: isDark
                    ? 'linear-gradient(180deg, rgba(8,8,8,0.95) 0%, rgba(3,3,3,1) 100%)'
                    : 'linear-gradient(180deg, rgba(242,242,237,0.95) 0%, rgba(235,235,230,1) 100%)',
                padding:'clamp(44px,7vw,72px) clamp(16px,4vw,40px) 0',
            }}>
                <div style={{ maxWidth:1200, margin:'0 auto' }}>

                    {/* ── TOP: Brand full-width ── */}
                    <motion.div
                        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                        transition={{ duration:0.5 }} viewport={{ once:true }}
                        style={{ marginBottom:40 }}
                    >
                        {/* Brand name + tagline */}
                        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:24 }}>
                            <div>
                                <a href="#home" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); }}
                                    style={{ textDecoration:'none', display:'inline-block' }}>
                                    <span style={{
                                        fontFamily:'Outfit, sans-serif', fontWeight:800,
                                        fontSize:'clamp(28px,4vw,40px)', color:'#d4af37',
                                        letterSpacing:'-1px', lineHeight:1,
                                        display:'block',
                                    }}>BARA</span>
                                    <span style={{
                                        fontFamily:'Outfit, sans-serif', fontWeight:800,
                                        fontSize:'clamp(28px,4vw,40px)',
                                        color:'transparent',
                                        WebkitTextStroke: isDark ? '1.5px rgba(255,255,255,0.5)' : '1.5px rgba(0,0,0,0.45)',
                                        letterSpacing:'-1px', lineHeight:1,
                                        display:'block',
                                    }}>KUSUMA</span>
                                </a>
                                <p style={{
                                    fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14.5,
                                    color:theme.textSecondary, marginTop:10, maxWidth:300,
                                    lineHeight:1.75,
                                }}>
                                    {lang === 'ID' ? 'Mengubah ide menjadi pengalaman digital yang berkesan melalui kode yang bersih dan desain elegan.' : 'Turning ideas into memorable digital experiences through clean code and elegant design.'}
                                </p>
                            </div>

                            {/* Social icons cluster */}
                            <div style={{ display:'flex', gap:10, alignSelf:'flex-start', marginTop:4 }}>
                                {[
                                    { href:'https://github.com/BekaGensss',  icon:<FiGithub size={16}/>,   label:'GitHub'   },
                                    { href:'https://id.linkedin.com/in/bara-kusuma-707067294', icon:<FiLinkedin size={16}/>, label:'LinkedIn' },
                                    { href:'mailto:barakusuma911@gmail.com', icon:<FiMail size={16}/>,     label:'Email'    },
                                ].map(s => (
                                    <a key={s.label} href={s.href}
                                        target={s.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer" aria-label={s.label}
                                        style={{
                                            width:42, height:42, borderRadius:12,
                                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                                            border:`1px solid ${theme.border}`,
                                            display:'flex', alignItems:'center', justifyContent:'center',
                                            color:theme.textMuted, textDecoration:'none', transition:'all 0.22s',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor='#d4af37';
                                            e.currentTarget.style.color='#d4af37';
                                            e.currentTarget.style.background=isDark?'rgba(212, 175, 55,0.1)':'rgba(212, 175, 55,0.12)';
                                            e.currentTarget.style.transform='translateY(-3px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor=theme.border;
                                            e.currentTarget.style.color=theme.textMuted;
                                            e.currentTarget.style.background=isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.05)';
                                            e.currentTarget.style.transform='translateY(0)';
                                        }}
                                    >{s.icon}</a>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height:1, background:`linear-gradient(90deg, #d4af37, ${theme.border}, transparent)`, borderRadius:1 }} />
                    </motion.div>

                    {/* ── GRID: Navigate + Info ── */}
                    <motion.div
                        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                        transition={{ duration:0.5, delay:0.1 }} viewport={{ once:true }}
                        className="footer-grid"
                        style={{
                            display:'grid',
                            gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))',
                            gap:'clamp(28px,4vw,56px)',
                            marginBottom:40,
                        }}
                    >
                        {/* NAVIGATE */}
                        <div>
                            <div style={{
                                fontFamily:'Outfit, sans-serif', fontWeight:800,
                                fontSize:10, color:'#d4af37',
                                letterSpacing:3, textTransform:'uppercase',
                                marginBottom:18,
                                display:'flex', alignItems:'center', gap:6,
                            }}>
                                <span style={{ opacity:0.5 }}>//</span> {lang === 'ID' ? 'NAVIGASI' : 'NAVIGATION'}
                            </div>
                            <nav style={{ display:'flex', flexDirection:'column', gap:4 }}>
                                {getNavLinks(lang).map(l => (
                                    <a key={l.href} href={l.href}
                                        onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                                        style={{
                                            display:'inline-flex', alignItems:'center', gap:8,
                                            padding:'7px 0',
                                            fontFamily:'Inter,sans-serif', fontSize:14, fontWeight:500,
                                            color:theme.textSecondary, textDecoration:'none',
                                            transition:'all 0.2s',
                                            borderBottom:`1px solid transparent`,
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color='#d4af37';
                                            e.currentTarget.style.paddingLeft='6px';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color=theme.textSecondary;
                                            e.currentTarget.style.paddingLeft='0';
                                        }}
                                    >
                                        <FiArrowRight size={11} style={{ flexShrink:0 }} /> {l.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* INFO */}
                        <div>
                            <div style={{
                                fontFamily:'Outfit, sans-serif', fontWeight:800,
                                fontSize:10, color:'#d4af37',
                                letterSpacing:3, textTransform:'uppercase',
                                marginBottom:18,
                                display:'flex', alignItems:'center', gap:6,
                            }}>
                                <span style={{ opacity:0.5 }}>//</span> INFO
                            </div>
                            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                                {infoItems.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} style={{
                                            display:'flex', alignItems:'center', gap:10,
                                            padding:'10px 14px',
                                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                                            border:`1px solid ${theme.border}`,
                                            borderRadius:10,
                                        }}>
                                            <Icon size={13} style={{ color:'#d4af37', flexShrink:0 }} />
                                            <div>
                                                <div style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:700, color:theme.textMuted, textTransform:'uppercase', letterSpacing:1, marginBottom:1 }}>{item.label}</div>
                                                <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:500, color:theme.textSecondary }}>{item.val}</div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Code badge */}
                                <div style={{
                                    display:'inline-flex', alignItems:'center', gap:8,
                                    padding:'9px 14px',
                                    background:'rgba(212, 175, 55,0.08)',
                                    border:'1px solid rgba(212, 175, 55,0.2)',
                                    borderRadius:10,
                                    fontFamily:'monospace', fontSize:13,
                                    color:'#d4af37', fontWeight:700,
                                }}>
                                    {'</>'} Full Stack Developer
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── BOTTOM BAR ── */}
                    <div style={{
                        borderTop:`1px solid ${theme.border}`,
                        padding:'18px 0 20px',
                        display:'flex', flexWrap:'wrap',
                        justifyContent:'space-between', alignItems:'center', gap:10,
                    }}>
                        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'clamp(10px,2vw,20px)' }}>
                            <span style={{ fontFamily:'Inter,sans-serif', fontSize:11.5, color:theme.textMuted }}>
                                © {new Date().getFullYear()} Hak Cipta Dilindungi
                            </span>
                            <span style={{ fontFamily:'Inter,sans-serif', fontSize:11.5, color:theme.textMuted, opacity:0.4 }}>·</span>
                            <span style={{ fontFamily:'Inter,sans-serif', fontSize:11.5, color:theme.textMuted }}>
                                Didesain dengan konsep minimalis
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── SCROLL TO TOP BUTTON ── */}
            <AnimatePresence>
                {show && (
                    <motion.button
                        key="stb"
                        initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0, opacity:0 }}
                        onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
                        aria-label="Ke atas"
                        style={{
                            position:'fixed', bottom:20, right:18,
                            width:42, height:42, borderRadius:12, border:'none',
                            background: isDark ? '#d4af37' : '#0a0a0a',
                            color: isDark ? '#000' : '#fff',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            cursor:'pointer', zIndex:50,
                            boxShadow: isDark ? '0 6px 20px rgba(212, 175, 55,0.4)' : '0 6px 20px rgba(0,0,0,0.3)',
                        }}
                        whileHover={{ y:-3, scale:1.05 }}
                        whileTap={{ scale:0.9 }}
                    >
                        <FiChevronUp size={18} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── RESPONSIVE STYLES ── */}
            <style>{`
                @media (max-width: 600px) {
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                }
                @media (max-width: 480px) {
                    .footer-grid {
                        gap: 24px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Footer;