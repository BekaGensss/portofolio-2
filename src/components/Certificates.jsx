import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiShield, FiServer, FiCheckCircle } from 'react-icons/fi';
import { useTheme, fonts } from '../ThemeContext';
import { Section, SectionHeader, Chip, stagger, rise } from './ui';

const getCerts = (lang) => {
    const ID = lang === 'ID';
    const base = process.env.PUBLIC_URL + '/certificates/';
    return [
        {
            title: 'Network Security',
            issuer: 'Cisco Networking Academy',
            org: ID ? 'Diselenggarakan oleh Universitas Nusa Mandiri' : 'Offered by Universitas Nusa Mandiri',
            date: ID ? '07 Juni 2025' : 'June 07, 2025',
            desc: ID
                ? 'Sertifikat penyelesaian program Network Security melalui Cisco Networking Academy.'
                : 'Certificate of completion for the Network Security program through Cisco Networking Academy.',
            meta: [{ k: ID ? 'Instruktur' : 'Instructor', v: 'Jordy Lasmana Putra' }],
            tags: ['Cisco', 'Network Security'],
            href: base + 'cisco-network-security.pdf',
            icon: FiShield,
        },
        {
            title: ID ? 'Sertifikat K3' : 'K3 Certificate',
            issuer: ID ? 'Keselamatan dan Kesehatan Kerja' : 'Occupational Health & Safety',
            org: ID ? 'Atas nama Bara Kusuma' : 'Awarded to Bara Kusuma',
            date: '2025',
            desc: ID
                ? 'Sertifikat Keselamatan dan Kesehatan Kerja (K3) yang mendukung kesiapan bekerja di lingkungan kerja profesional.'
                : 'Occupational Health and Safety (K3) certificate supporting readiness to work in a professional environment.',
            meta: [{ k: ID ? 'Nomor' : 'Number', v: '58/MIB/XI/2025/064' }],
            tags: ['K3', ID ? 'Keselamatan Kerja' : 'Workplace Safety'],
            href: base + 'sertifikat-k3.pdf',
            icon: FiCheckCircle,
        },
        {
            title: 'CCNAv7: Introduction to Networks',
            issuer: 'Cisco Networking Academy',
            org: 'Universitas Bina Sarana Informatika',
            date: ID ? '27 Juli 2022' : 'July 27, 2022',
            desc: ID
                ? 'Mampu mengonfigurasi switch, router, dan perangkat akhir, membuat skema IPv4/IPv6, memahami model OSI, serta memecahkan masalah konektivitas pada jaringan kecil.'
                : 'Able to configure switches, routers, and end devices, create IPv4/IPv6 addressing schemes, understand the OSI model, and troubleshoot connectivity in a small network.',
            meta: [{ k: ID ? 'Instruktur' : 'Instructor', v: 'Ahmad Fauzi' }],
            tags: ['CCNAv7', 'Routing & Switching', 'IPv4/IPv6'],
            href: base + 'cisco-ccna-introduction-to-networks.pdf',
            icon: FiServer,
        },
    ];
};

const Certificates = () => {
    const { theme, isDark, lang } = useTheme();
    const ID = lang === 'ID';
    const certs = getCerts(lang);

    return (
        <Section id="certificates">
            <SectionHeader
                index="06" label={ID ? 'Sertifikasi' : 'Certification'}
                solid={ID ? 'SERTIFIKAT' : 'MY'} outline={ID ? 'SAYA.' : 'CERTIFICATES.'}
                desc={ID ? 'Sertifikasi resmi yang mendukung kompetensi saya di bidang jaringan komputer dan keselamatan kerja.' : 'Official certifications supporting my competence in computer networking and workplace safety.'}
                theme={theme} isDark={isDark}
            />

            <motion.div
                initial="hidden" whileInView="visible" variants={stagger}
                viewport={{ once: true, amount: 0.1 }}
                className="cert-grid"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}
            >
                {certs.map((cert) => {
                    const Icon = cert.icon;
                    return (
                        <motion.div key={cert.title} variants={rise}>
                            <div className="cert-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.panel }}>
                                <div style={{ height: 3, background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />

                                <div style={{ padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                            background: theme.accentBg, border: `1px solid ${theme.accentBorder}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accentText,
                                        }}>
                                            <Icon size={19} />
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{ fontFamily: fonts.mono, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.textMuted }}>{cert.issuer}</div>
                                            <div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 600, color: theme.accentText, marginTop: 3 }}>{cert.date}</div>
                                        </div>
                                    </div>

                                    <h3 style={{
                                        fontFamily: fonts.display, fontSize: 'clamp(17px,2vw,20px)',
                                        fontWeight: 800, color: theme.textPrimary,
                                        marginBottom: 6, letterSpacing: '-0.3px', lineHeight: 1.3,
                                    }}>{cert.title}</h3>

                                    <div style={{ fontFamily: fonts.body, fontSize: 13, color: theme.textMuted, marginBottom: 14 }}>{cert.org}</div>

                                    <p style={{
                                        fontFamily: fonts.body, fontSize: 'clamp(13px,1.4vw,14.5px)', lineHeight: 1.75,
                                        color: theme.textSecondary, margin: '0 0 16px',
                                    }}>{cert.desc}</p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                                        {cert.tags.map(t => <Chip key={t} theme={theme}>{t}</Chip>)}
                                    </div>

                                    <div style={{
                                        marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${theme.divider}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
                                    }}>
                                        <div style={{ fontFamily: fonts.body, fontSize: 12, color: theme.textMuted, minWidth: 0 }}>
                                            {cert.meta.map(m => (
                                                <div key={m.k}>{m.k}: <span style={{ color: theme.textSecondary, fontWeight: 600 }}>{m.v}</span></div>
                                            ))}
                                        </div>
                                        <a
                                            href={cert.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                                fontSize: 12, fontFamily: fonts.display, fontWeight: 700,
                                                color: theme.accentText, textDecoration: 'none', letterSpacing: 0.5,
                                                transition: 'opacity 0.2s ease',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                                        >
                                            {ID ? 'LIHAT SERTIFIKAT' : 'VIEW CERTIFICATE'} <FiExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
};

export default Certificates;
