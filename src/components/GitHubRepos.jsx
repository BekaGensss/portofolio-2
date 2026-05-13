import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiExternalLink, FiCode } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { SectionHeading } from './About';

const wrap = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const card = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 85, damping: 16 } },
};

const repos = [
    { name: 'project-perpustakaan2', desc: 'Sistem manajemen perpustakaan modern berbasis web dengan peminjaman, pengembalian, dan laporan buku.', lang: 'JavaScript', stars: 0, url: 'https://github.com/BekaGensss/project-perpustakaan2', color: '#f7df1e' },
    { name: 'aplikasi-keuangan',     desc: 'Aplikasi web untuk perencanaan keuangan pribadi — catat pemasukan, pengeluaran, dan kelola anggaran.', lang: 'Blade', stars: 1, url: 'https://github.com/BekaGensss/aplikasi-keuangan', color: '#4ade80' },
    { name: 'web-app-ibadahI',       desc: 'Aplikasi Islam modern (IbadahKu) untuk menemani ibadah harian. Dibangun dengan Next.js dan Capacitor JS.', lang: 'TypeScript', stars: 0, url: 'https://github.com/BekaGensss/web-app-ibadahI', color: '#22d3ee' },
    { name: 'project-hijab-store',   desc: 'Platform e-commerce responsif dengan Laravel 11 — katalog produk, keranjang belanja, dan dashboard admin.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/project-hijab-store', color: '#f472b6' },
    { name: 'absensi-barcode',       desc: 'Sistem absensi sekolah berbasis web menggunakan pemindaian barcode, dibangun dengan Laravel dan PHP.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/absensi-barcode', color: '#a5b4fc' },
    { name: 'canvasell',             desc: 'Portal manajemen inventaris dan pemesanan untuk produk digital (Redeem Codes) berbasis Laravel.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/canvasell', color: '#fb923c' },
    { name: 'antrian-online',        desc: 'Sistem antrian modern dengan real-time monitoring menggunakan Laravel dan Pusher.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/antrian-online', color: '#34d399' },
    { name: 'crime-prediction-app',  desc: 'Aplikasi prediksi tingkat kejahatan di Indonesia menggunakan Machine Learning dan Laravel.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/crime-prediction-app', color: '#f87171' },
    { name: 'health-info-website',   desc: 'Sumber informasi kesehatan komprehensif dengan artikel dan infografis. Dibangun dengan React dan Vite.', lang: 'JavaScript', stars: 1, url: 'https://github.com/BekaGensss/health-info-website', color: '#4ade80' },
];

const langDot = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Blade: '#f05340',
    PHP: '#777bb4',
    Python: '#3572a5',
    CSS: '#563d7c',
};

const GitHubRepos = () => {
    const { theme, isDark, lang } = useTheme();

    return (
        <section id="github" style={{ padding: 'clamp(72px, 12vh, 120px) 0', position: 'relative' }}>
            <div className="hdiv" />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vh,80px) clamp(20px,4vw,48px) 0' }}>

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
                        <span className="stag"><FiGithub size={10} /> Open Source</span>
                        <SectionHeading solid={lang === 'ID' ? 'REPOSITORI' : 'GITHUB'} outline={lang === 'ID' ? 'GITHUB.' : 'REPOS.'} theme={theme} isDark={isDark} />
                    </div>
                    <div className="header-desc-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                        <p className="header-desc-text" style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'clamp(13.5px, 1.5vw, 15px)',
                            color: theme.textSecondary, maxWidth: 300, lineHeight: 1.7,
                            textAlign: 'right',
                        }}>
                            {lang === 'ID' ? 'Koleksi proyek yang saya bangun dan kembangkan secara terbuka di GitHub.' : 'A collection of projects I built and develop openly on GitHub.'}
                        </p>
                        <a
                            href="https://github.com/BekaGensss?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-s"
                            style={{ fontSize: 12 }}
                        >
                            <FiGithub size={13} /> {lang === 'ID' ? 'Lihat Semua' : 'View All'} <FiExternalLink size={11} />
                        </a>
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={wrap}
                    viewport={{ once: true, amount: 0.06 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: 12,
                    }}
                >
                    {repos.map(r => (
                        <motion.div
                            key={r.name}
                            variants={card}
                            style={{
                                display: 'flex', flexDirection: 'column',
                                padding: '16px 18px',
                                borderRadius: 16,
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.border}`,
                                transition: 'all 0.28s ease',
                                position: 'relative', overflow: 'hidden',
                            }}
                            whileHover={{
                                y: -4,
                                borderColor: isDark ? 'rgba(212, 175, 55,0.2)' : 'rgba(184, 134, 11,0.2)',
                                boxShadow: isDark ? '0 16px 48px rgba(0,0,0,0.6)' : '0 16px 48px rgba(0,0,0,0.08)',
                            }}
                        >
                            {/* Colored top line */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                background: `linear-gradient(90deg, ${r.color}, transparent)`,
                            }} />

                            {/* Header row: name + lang badge */}
                            <div style={{
                                display: 'flex', alignItems: 'flex-start',
                                justifyContent: 'space-between', marginBottom: 8, paddingTop: 4,
                            }}>
                                <div style={{ display:'flex', alignItems:'center', gap:7, flex:1, minWidth:0 }}>
                                    <div style={{ width:8, height:8, borderRadius:'50%', background: langDot[r.lang]||'#a5b4fc', flexShrink:0 }} />
                                    <span style={{
                                        fontFamily: 'Outfit, sans-serif', fontSize: 13.5, fontWeight: 700,
                                        color: theme.textPrimary,
                                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                                    }}>
                                        {r.name}
                                    </span>
                                </div>
                                {r.lang && (
                                    <span style={{
                                        fontFamily:'Inter,sans-serif', fontSize:9.5, fontWeight:700,
                                        color: langDot[r.lang]||'#a5b4fc',
                                        background: (langDot[r.lang]||'#a5b4fc')+'18',
                                        border:`1px solid ${(langDot[r.lang]||'#a5b4fc')}30`,
                                        borderRadius:100, padding:'2px 8px', whiteSpace:'nowrap',
                                        letterSpacing:0.5, flexShrink:0, marginLeft:6,
                                    }}>{r.lang}</span>
                                )}
                            </div>

                            <p style={{
                                fontFamily:'Inter,sans-serif', fontSize:12.5, lineHeight:1.62,
                                color:theme.textSecondary, flex:1, marginBottom:10,
                            }}>
                                {r.desc}
                            </p>

                            {/* Stars + date */}
                            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                                {r.stars > 0 && (
                                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                                        <FiStar size={10} style={{ color:'#fbbf24' }} />
                                        <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#fbbf24', fontWeight:700 }}>{r.stars}</span>
                                    </div>
                                )}
                                <span style={{ fontFamily:'Inter,sans-serif', fontSize:10.5, color:theme.textMuted, marginLeft:'auto' }}>Apr 2026</span>
                            </div>

                            {/* CODE + DEMO buttons */}
                            <div style={{ display:'flex', gap:8 }}>
                                <a href={r.url} target="_blank" rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    style={{
                                        flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5,
                                        padding:'8px 0', borderRadius:100,
                                        fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:11,
                                        color:theme.textSecondary, textDecoration:'none',
                                        background:'transparent',
                                        border:`1px solid ${theme.border}`,
                                        letterSpacing:0.5, transition:'all 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor=theme.borderAccent; e.currentTarget.style.color=theme.textPrimary; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor=theme.border; e.currentTarget.style.color=theme.textSecondary; }}
                                >
                                    <FiCode size={12}/> KODE
                                </a>
                                {r.demo ? (
                                    <a href={r.demo} target="_blank" rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        style={{
                                            flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5,
                                            padding:'8px 0', borderRadius:100,
                                            fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:11,
                                            color:'#000', textDecoration:'none',
                                            background:'#d4af37', border:'1px solid #d4af37',
                                            letterSpacing:0.5, transition:'all 0.2s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background='#fde68a'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background='#d4af37'; }}
                                    >
                                        ↗ DEMO
                                    </a>
                                ) : (
                                    <div style={{
                                        flex:1, display:'flex', alignItems:'center', justifyContent:'center',
                                        padding:'8px 0', borderRadius:100,
                                        fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:11,
                                        color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                                        border:`1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                        letterSpacing:0.5, cursor:'default',
                                    }}>TIDAK ADA DEMO</div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubRepos;
