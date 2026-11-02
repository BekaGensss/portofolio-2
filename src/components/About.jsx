import React from 'react';
import { motion } from 'framer-motion';
import { FiServer, FiCode, FiTool } from 'react-icons/fi';
import {
    SiJavascript, SiReact, SiTailwindcss, SiPython,
    SiLaravel, SiNodedotjs, SiMysql, SiGit,
} from 'react-icons/si';
import { useTheme, fonts } from '../ThemeContext';
import { Section, SectionHeader, panelStyle, panelHover, stagger, rise } from './ui';

export { SectionHeading } from './ui';

const techStack = [
    { name: 'JavaScript', Icon: SiJavascript },
    { name: 'React',      Icon: SiReact },
    { name: 'Tailwind',   Icon: SiTailwindcss },
    { name: 'Python',     Icon: SiPython },
    { name: 'Laravel',    Icon: SiLaravel },
    { name: 'Node.js',    Icon: SiNodedotjs },
    { name: 'MySQL',      Icon: SiMysql },
    { name: 'Git',        Icon: SiGit },
];

const MiniLabel = ({ children, theme }) => (
    <div style={{
        fontFamily: fonts.mono, fontSize: 11.5, fontWeight: 600, color: theme.textMuted,
        letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16,
    }}>{children}</div>
);

const About = () => {
    const { theme, isDark, lang } = useTheme();
    const ID = lang === 'ID';
    const em = { color: theme.textPrimary, fontWeight: 600 };

    const skillGroups = [
        {
            icon: FiServer,
            title: ID ? 'Jaringan & Infrastruktur' : 'Networking & Infrastructure',
            items: ID
                ? ['Jaringan Komputer', 'Cisco Packet Tracer', 'Troubleshooting Hardware & Software', 'Monitoring Kinerja Jaringan', 'Konfigurasi Firewall & Antivirus']
                : ['Computer Networking', 'Cisco Packet Tracer', 'Hardware & Software Troubleshooting', 'Network Performance Monitoring', 'Firewall & Antivirus Configuration'],
        },
        {
            icon: FiCode,
            title: ID ? 'Pengembangan & Pengujian' : 'Development & Testing',
            items: ID
                ? ['Web Development', 'Pengujian Perangkat Lunak', 'Dokumentasi Teknis']
                : ['Web Development', 'Software Testing', 'Technical Documentation'],
        },
        {
            icon: FiTool,
            title: 'Tools',
            items: ['Cisco Packet Tracer', 'Microsoft Office', 'Visual Studio Code'],
        },
    ];

    const softSkills = ID
        ? ['Berorientasi Detail', 'Berpikir Kritis & Analitis', 'Pemecahan Masalah', 'Komunikasi', 'Negosiasi', 'Pekerja Keras', 'Bekerja di Bawah Tekanan', 'Kerja Tim']
        : ['Detail-Oriented', 'Critical & Analytical Thinking', 'Problem Solving', 'Communication', 'Negotiation', 'Hard Working', 'Works Under Pressure', 'Teamwork'];

    return (
        <Section id="about">
            <SectionHeader
                index="01" label={ID ? 'Tentang' : 'About'}
                solid={ID ? 'TENTANG' : 'ABOUT'} outline={ID ? 'SAYA.' : 'ME.'}
                theme={theme} isDark={isDark}
            />

            <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true, amount: 0.08 }}>
                <div className="about-grid" style={{
                    display: 'grid', gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)',
                    gap: 'clamp(32px,5vw,80px)', alignItems: 'start',
                }}>
                    <motion.div variants={rise}>
                        <p style={{
                            fontFamily: fonts.display, fontWeight: 500,
                            fontSize: 'clamp(21px,2.5vw,31px)', lineHeight: 1.45, letterSpacing: '-0.4px',
                            color: theme.textSecondary, margin: '0 0 28px',
                        }}>
                            {ID ? (
                                <>
                                    <span style={em}>Bara Kusuma, S.Kom.</span> adalah insinyur keamanan jaringan, spesialis infrastruktur IT, dan pengembang web lulusan{' '}
                                    <span style={{ color: theme.accentText }}>Universitas Nusa Mandiri (IPK 3.81 — Akreditasi Unggul)</span> serta alumni D3{' '}
                                    <span style={{ color: theme.accentText }}>UBSI</span>. Berpengalaman menangani operasional jaringan di{' '}
                                    <span style={em}>PT Pos Indonesia (Persero)</span>.
                                </>
                            ) : (
                                <>
                                    <span style={em}>Bara Kusuma, S.Kom.</span> is a network security engineer, IT infrastructure specialist, and web developer, a graduate of{' '}
                                    <span style={{ color: theme.accentText }}>Universitas Nusa Mandiri (GPA 3.81 — Excellent accreditation)</span> and a D3 alumnus of{' '}
                                    <span style={{ color: theme.accentText }}>UBSI</span>. Experienced in handling network operations at{' '}
                                    <span style={em}>PT Pos Indonesia (Persero)</span>.
                                </>
                            )}
                        </p>

                        <p style={{
                            fontFamily: fonts.body, fontSize: 'clamp(14.5px,1.5vw,16.5px)', lineHeight: 1.9,
                            color: theme.textMuted, margin: '0 0 40px', maxWidth: 620,
                        }}>
                            {ID
                                ? 'Saya berorientasi detail, komunikatif, adaptif, bertanggung jawab, dan mampu bekerja di bawah tekanan, baik secara tim maupun individu. Saya termotivasi untuk terus berkembang dan siap berkontribusi pada industri teknologi informasi.'
                                : 'I am detail-oriented, communicative, adaptable, and responsible, and I can work under pressure both in a team and individually. I am motivated to keep growing and ready to contribute to the information technology industry.'}
                        </p>

                        <MiniLabel theme={theme}>{ID ? 'Minat karir' : 'Career interest'}</MiniLabel>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
                            {['Network Administrator', 'Computer Technician'].map(r => (
                                <span key={r} style={{
                                    padding: '10px 18px', borderRadius: 100,
                                    background: theme.accentBg, border: `1px solid ${theme.accentBorder}`,
                                    color: theme.accentText, fontFamily: fonts.display, fontWeight: 700, fontSize: 13.5,
                                }}>{r}</span>
                            ))}
                        </div>

                        <MiniLabel theme={theme}>Soft skill</MiniLabel>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {softSkills.map(s => (
                                <span key={s} className="chip" style={{ fontSize: 12.5, padding: '7px 14px' }}>{s}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={rise}>
                        <MiniLabel theme={theme}>{ID ? 'Kompetensi teknis' : 'Technical competencies'}</MiniLabel>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {skillGroups.map(g => {
                                const Icon = g.icon;
                                return (
                                    <div key={g.title} {...panelHover(theme)} style={panelStyle(theme, { padding: '20px 22px' })}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                                background: theme.accentBg, border: `1px solid ${theme.accentBorder}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accentText,
                                            }}><Icon size={16} /></div>
                                            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 16, color: theme.textPrimary }}>{g.title}</div>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {g.items.map(it => (
                                                <span key={it} style={{
                                                    padding: '6px 12px', borderRadius: 8,
                                                    background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`,
                                                    color: theme.badgeText, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 500,
                                                }}>{it}</span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={rise} style={{ marginTop: 'clamp(44px,7vh,72px)' }}>
                    <MiniLabel theme={theme}>{ID ? 'Teknologi yang saya gunakan' : 'Technologies I use'}</MiniLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                        {techStack.map(({ name, Icon }) => (
                            <div
                                key={name}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 14,
                                    background: theme.panel, border: `1px solid ${theme.border}`,
                                    color: theme.textSecondary, cursor: 'default',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = theme.borderAccent; e.currentTarget.style.color = theme.accentText; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textSecondary; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <Icon size={22} style={{ flexShrink: 0 }} />
                                <span style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: 13.5 }}>{name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <style>{`
                @media (max-width: 900px) {
                    #about .about-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </Section>
    );
};

export default About;
