import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiExternalLink, FiCode } from 'react-icons/fi';
import { useTheme, fonts } from '../ThemeContext';
import { Section, SectionHeader } from './ui';

const wrap = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const card = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 85, damping: 16 } },
};

const repos = [
    { name: 'project-perpustakaan2', desc: 'Sistem manajemen perpustakaan modern berbasis web dengan peminjaman, pengembalian, dan laporan buku.', lang: 'JavaScript', stars: 0, url: 'https://github.com/BekaGensss/project-perpustakaan2' },
    { name: 'aplikasi-keuangan',     desc: 'Aplikasi web untuk perencanaan keuangan pribadi — catat pemasukan, pengeluaran, dan kelola anggaran.', lang: 'Blade', stars: 1, url: 'https://github.com/BekaGensss/aplikasi-keuangan' },
    { name: 'web-app-ibadahI',       desc: 'Aplikasi Islam modern (IbadahKu) untuk menemani ibadah harian. Dibangun dengan Next.js dan Capacitor JS.', lang: 'TypeScript', stars: 0, url: 'https://github.com/BekaGensss/web-app-ibadahI' },
    { name: 'project-hijab-store',   desc: 'Platform e-commerce responsif dengan Laravel 11 — katalog produk, keranjang belanja, dan dashboard admin.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/project-hijab-store' },
    { name: 'absensi-barcode',       desc: 'Sistem absensi sekolah berbasis web menggunakan pemindaian barcode, dibangun dengan Laravel dan PHP.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/absensi-barcode' },
    { name: 'canvasell',             desc: 'Portal manajemen inventaris dan pemesanan untuk produk digital (Redeem Codes) berbasis Laravel.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/canvasell' },
    { name: 'antrian-online',        desc: 'Sistem antrian modern dengan real-time monitoring menggunakan Laravel dan Pusher.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/antrian-online' },
    { name: 'crime-prediction-app',  desc: 'Aplikasi prediksi tingkat kejahatan di Indonesia menggunakan Machine Learning dan Laravel.', lang: 'Blade', stars: 0, url: 'https://github.com/BekaGensss/crime-prediction-app' },
    { name: 'health-info-website',   desc: 'Sumber informasi kesehatan komprehensif dengan artikel dan infografis. Dibangun dengan React dan Vite.', lang: 'JavaScript', stars: 1, url: 'https://github.com/BekaGensss/health-info-website' },
];

const GitHubRepos = () => {
    const { theme, isDark, lang } = useTheme();
    const ID = lang === 'ID';

    return (
        <Section id="github">
            <SectionHeader
                index="05" label="GitHub"
                solid={ID ? 'REPOSITORI' : 'GITHUB'} outline={ID ? 'GITHUB.' : 'REPOS.'}
                desc={ID ? 'Koleksi proyek yang saya bangun dan kembangkan secara terbuka di GitHub.' : 'A collection of projects I built and develop openly on GitHub.'}
                theme={theme} isDark={isDark}
            >
                <a
                    href="https://github.com/BekaGensss?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-s"
                    style={{ fontSize: 12 }}
                >
                    <FiGithub size={13} /> {ID ? 'Lihat Semua' : 'View All'} <FiExternalLink size={11} />
                </a>
            </SectionHeader>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={wrap}
                viewport={{ once: true, amount: 0.06 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 14,
                }}
            >
                {repos.map(r => (
                    <motion.div
                        key={r.name}
                        variants={card}
                        style={{
                            display: 'flex', flexDirection: 'column',
                            padding: '18px 20px', borderRadius: 16,
                            background: theme.panel, border: `1px solid ${theme.border}`,
                            position: 'relative', overflow: 'hidden',
                        }}
                        whileHover={{
                            y: -4,
                            borderColor: theme.borderAccent,
                            boxShadow: isDark ? '0 16px 48px rgba(0,0,0,0.6)' : '0 16px 48px rgba(0,0,0,0.08)',
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                            background: `linear-gradient(90deg, ${theme.accent}, transparent)`, opacity: 0.7,
                        }} />

                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10, paddingTop: 4 }}>
                            <span style={{
                                fontFamily: fonts.display, fontSize: 14.5, fontWeight: 700, color: theme.textPrimary,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0,
                            }}>{r.name}</span>
                            <span style={{
                                fontFamily: fonts.mono, fontSize: 10.5, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0,
                                color: theme.badgeText, background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`,
                                borderRadius: 6, padding: '2px 8px',
                            }}>{r.lang}</span>
                        </div>

                        <p style={{
                            fontFamily: fonts.body, fontSize: 13, lineHeight: 1.7,
                            color: theme.textSecondary, flex: 1, margin: '0 0 12px',
                        }}>{r.desc}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, minHeight: 16 }}>
                            {r.stars > 0 && (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: theme.accentText }}>
                                    <FiStar size={11} /> {r.stars}
                                </span>
                            )}
                            <span style={{ fontFamily: fonts.mono, fontSize: 10.5, color: theme.textMuted, marginLeft: 'auto' }}>Apr 2026</span>
                        </div>

                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                padding: '9px 0', borderRadius: 100,
                                fontFamily: fonts.display, fontWeight: 700, fontSize: 11.5,
                                color: theme.textSecondary, textDecoration: 'none',
                                border: `1px solid ${theme.border}`, letterSpacing: 0.5, transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.borderAccent; e.currentTarget.style.color = theme.accentText; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textSecondary; }}
                        >
                            <FiCode size={12} /> {ID ? 'LIHAT KODE' : 'VIEW CODE'}
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

export default GitHubRepos;
