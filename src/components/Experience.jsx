import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { useTheme, fonts } from '../ThemeContext';
import { Section, SectionHeader, stagger, rise } from './ui';

const getItems = (lang) => {
    const ID = lang === 'ID';
    const cert = process.env.PUBLIC_URL + '/certificates/';
    return [
        {
            period: ID ? 'Maret 2025 — Februari 2026' : 'March 2025 — February 2026',
            kind: ID ? 'Pendidikan · KKNI Level 6' : 'Education · KKNI Level 6',
            title: ID ? 'Sarjana Informatika' : "Bachelor's Degree in Informatics",
            org: 'Universitas Nusa Mandiri',
            place: 'Jakarta',
            desc: ID
                ? 'Lulus dengan IPK 3.81 / 4.00 pada Program Studi Terakreditasi Unggul (LAM INFOKOM). Fokus riset pada Keamanan Jaringan (Cisco), Machine Learning, IT Auditing, serta publikasi ilmiah di Jurnal Khatulistiwa Informatika.'
                : 'Graduated with a GPA of 3.81 / 4.00 from a study program with Excellent accreditation (LAM INFOKOM). Research focus on Network Security (Cisco), Machine Learning, IT Auditing, and scientific publication in Jurnal Khatulistiwa Informatika.',
            badge: { value: '3.81', suffix: '/ 4.00', label: ID ? 'IPK' : 'GPA' },
        },
        {
            period: 'September 2022 — November 2022',
            kind: ID ? 'Magang · BUMN' : 'Internship · State-owned enterprise',
            title: ID ? 'IT Support — Praktik Kerja Lapangan' : 'IT Support — Field Internship',
            org: 'PT Pos Indonesia (Persero)',
            place: 'Jakarta Pusat',
            points: ID
                ? [
                    'Memeriksa dan memperbaiki masalah perangkat keras (hardware) dan perangkat lunak (software) guna mendukung operasional yang optimal.',
                    'Memonitor kinerja jaringan secara real-time, menangani gangguan jaringan secepat mungkin, serta melakukan pemeliharaan rutin untuk mencegah masalah potensial.',
                    'Memantau aktivitas antivirus dan firewall secara real-time serta mengkonfigurasi pengaturannya untuk perlindungan yang optimal.',
                    'Berkomunikasi secara efektif dengan tim internal untuk memberikan pembaruan berkala mengenai kinerja sistem dan jaringan.',
                ]
                : [
                    'Inspected and fixed hardware and software issues to support optimal operations.',
                    'Monitored network performance in real time, handled network disruptions as quickly as possible, and performed routine maintenance to prevent potential problems.',
                    'Monitored antivirus and firewall activity in real time and configured both for optimal protection.',
                    'Communicated effectively with internal teams to provide regular updates on system and network performance.',
                ],
        },
        {
            period: '2020 — 2023',
            kind: ID ? 'Pendidikan · Diploma' : 'Education · Associate degree',
            title: ID ? 'Diploma Tiga (D3) Teknologi Informasi' : 'Associate Degree (D3) in Information Technology',
            org: 'Universitas Bina Sarana Informatika (UBSI)',
            place: '',
            desc: ID
                ? 'Membangun fondasi rekayasa jaringan komputer, administrasi server, pemrograman berorientasi objek, serta berhasil meraih sertifikasi global Cisco CCNAv7: Introduction to Networks.'
                : 'Built a foundation in computer network engineering, server administration, and object-oriented programming, and earned the global Cisco CCNAv7: Introduction to Networks certification.',
            link: { label: ID ? 'Sertifikat CCNAv7' : 'CCNAv7 certificate', href: cert + 'cisco-ccna-introduction-to-networks.pdf' },
        },
        {
            period: ID ? 'Pelatihan Kejuruan' : 'Vocational Training',
            kind: ID ? 'Pelatihan · Berbasis Kompetensi' : 'Training · Competency-based',
            title: 'Programming & Software Engineering Training',
            org: 'PPKPI Pasar Rebo',
            place: 'Jakarta Timur',
            desc: ID
                ? 'Pelatihan intensif berbasis kompetensi industri dalam pengembangan aplikasi perangkat lunak, logika algoritma, dan pengujian basis data.'
                : 'Intensive industry-competency-based training in software application development, algorithmic logic, and database testing.',
        },
        {
            period: ID ? 'Maret 2019 — April 2019' : 'March 2019 — April 2019',
            kind: ID ? 'Magang · Industri' : 'Internship · Industry',
            title: ID ? 'Dokumentasi & Administrasi Produksi' : 'Production Documentation & Administration',
            org: 'PT Surya Label Jayamanufacturer',
            place: 'Jakarta Utara',
            points: ID
                ? [
                    'Menyusun dan mengelola dokumen produksi secara sistematis untuk memastikan aksesibilitas dan keberlanjutan.',
                    'Memeriksa dan memverifikasi keakuratan data yang tercatat dalam dokumen.',
                    'Berkomunikasi dengan tim lain untuk mendapatkan atau memberikan informasi yang diperlukan.',
                    'Mendukung tim administrasi dalam pengarsipan fisik dan digital berbagai dokumen.',
                ]
                : [
                    'Prepared and managed production documents systematically to ensure accessibility and continuity.',
                    'Checked and verified the accuracy of data recorded in documents.',
                    'Communicated with other teams to obtain or provide necessary information.',
                    'Supported the administration team in physical and digital document archiving.',
                ],
        },
    ];
};

const Row = ({ it, theme, isLast }) => (
    <motion.div
        variants={rise}
        className="exp-row"
        style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,3fr) minmax(0,4fr) minmax(0,5fr)',
            gap: 'clamp(16px,3vw,48px)',
            padding: 'clamp(26px,4vw,40px) clamp(10px,1.6vw,20px)',
            borderTop: `1px solid ${theme.hairline}`,
            borderBottom: isLast ? `1px solid ${theme.hairline}` : 'none',
            background: 'transparent', transition: 'background 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = theme.bgCardHover; e.currentTarget.querySelector('h3').style.color = theme.accentText; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelector('h3').style.color = theme.textPrimary; }}
    >
        <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 12.5, fontWeight: 600, color: theme.accentText, letterSpacing: '0.04em', lineHeight: 1.6 }}>
                {it.period}
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, color: theme.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8, lineHeight: 1.6 }}>
                {it.kind}
            </div>
        </div>

        <div>
            <h3 style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(19px,2.1vw,25px)',
                letterSpacing: '-0.5px', lineHeight: 1.25, color: theme.textPrimary,
                margin: '0 0 10px', transition: 'color 0.3s ease',
            }}>{it.title}</h3>
            <div style={{ fontFamily: fonts.body, fontSize: 14, color: theme.textSecondary, fontWeight: 600 }}>{it.org}</div>
            {it.place && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, fontFamily: fonts.body, fontSize: 13, color: theme.textMuted }}>
                    <FiMapPin size={12} /> {it.place}
                </div>
            )}
        </div>

        <div>
            {it.desc && (
                <p style={{ fontFamily: fonts.body, fontSize: 'clamp(13.5px,1.4vw,15px)', lineHeight: 1.8, color: theme.textSecondary, margin: 0 }}>{it.desc}</p>
            )}
            {it.points && (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {it.points.map((p, i) => (
                        <li key={i} style={{ display: 'flex', gap: 12, fontFamily: fonts.body, fontSize: 'clamp(13.5px,1.4vw,14.5px)', lineHeight: 1.75, color: theme.textSecondary }}>
                            <span style={{ width: 6, height: 6, background: theme.accent, flexShrink: 0, marginTop: 10 }} />
                            <span>{p}</span>
                        </li>
                    ))}
                </ul>
            )}

            {it.badge && (
                <div style={{
                    display: 'inline-flex', alignItems: 'baseline', gap: 10, marginTop: 18,
                    padding: '10px 18px', borderRadius: 12,
                    background: theme.accentBg, border: `1px solid ${theme.accentBorder}`,
                }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: theme.accentText }}>{it.badge.label}</span>
                    <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 26, color: theme.textPrimary, letterSpacing: '-1px' }}>{it.badge.value}</span>
                    <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 13, color: theme.textMuted }}>{it.badge.suffix}</span>
                </div>
            )}

            {it.link && (
                <a href={it.link.href} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16,
                    fontFamily: fonts.mono, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
                    color: theme.accentText, textDecoration: 'none',
                    borderBottom: `1px solid ${theme.accentBorder}`, paddingBottom: 2,
                }}>
                    {it.link.label} <FiArrowUpRight size={13} />
                </a>
            )}
        </div>
    </motion.div>
);

const Experience = () => {
    const { theme, isDark, lang } = useTheme();
    const ID = lang === 'ID';
    const items = getItems(lang);

    return (
        <Section id="experience">
            <SectionHeader
                index="02" label={ID ? 'Pendidikan & pengalaman' : 'Education & experience'}
                solid={ID ? 'PENDIDIKAN &' : 'EDUCATION &'} outline={ID ? 'PENGALAMAN.' : 'EXPERIENCE.'}
                desc={ID ? 'Perjalanan akademik dan pengalaman kerja yang membentuk keahlian saya di bidang jaringan dan IT.' : 'The academic and work journey that shaped my skills in networking and IT.'}
                theme={theme} isDark={isDark}
            />

            <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true, amount: 0.05 }}>
                {items.map((it, i) => (
                    <Row key={it.title + i} it={it} theme={theme} isLast={i === items.length - 1} />
                ))}
            </motion.div>

            <style>{`
                @media (max-width: 900px) {
                    #experience .exp-row { grid-template-columns: 1fr !important; gap: 14px !important; }
                }
            `}</style>
        </Section>
    );
};

export default Experience;
