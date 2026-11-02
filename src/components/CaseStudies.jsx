import React from 'react';
import { motion } from 'framer-motion';
import { useTheme, fonts } from '../ThemeContext';
import { Section, SectionHeader, Chip, panelStyle, panelHover, stagger, rise } from './ui';

const getCases = (lang) => {
    const ID = lang === 'ID';
    return [
        {
            index: '01',
            tag: ID ? 'Infrastruktur Enterprise · BUMN' : 'Enterprise Infrastructure · State-owned',
            year: '2022',
            title: 'Real-Time Network Monitoring & Endpoint Hardening',
            org: 'PT Pos Indonesia (Persero) — Jakarta Pusat',
            summary: ID
                ? 'Operasional pemantauan jaringan WAN/LAN secara real-time, pemeliharaan perangkat keras/lunak, serta konfigurasi firewall dan antivirus di lingkungan kerja PT Pos Indonesia.'
                : 'Real-time WAN/LAN network monitoring operations, hardware/software maintenance, and firewall and antivirus configuration in the PT Pos Indonesia work environment.',
            problem: ID
                ? 'Gangguan latensi jaringan dan potensi ancaman malware pada endpoint karyawan dapat menghambat layanan operasional logistik dan administrasi harian.'
                : 'Network latency issues and potential malware threats on employee endpoints can hinder daily logistics and administrative operations.',
            solution: ID
                ? 'Menerapkan pemantauan kinerja trafik jaringan secara berkala, mengeksekusi troubleshooting hardware/software secara responsif, serta memperketat aturan firewall & antivirus.'
                : 'Applied regular network traffic performance monitoring, executed responsive hardware/software troubleshooting, and tightened firewall and antivirus rules.',
            stack: ['Cisco Packet Tracer', 'Firewall Configuration', 'Endpoint Antivirus', 'LAN/WAN Diagnostics', 'Hardware Troubleshooting'],
        },
        {
            index: '02',
            tag: ID ? 'Publikasi Ilmiah · Data Science' : 'Scientific Publication · Data Science',
            year: '2025',
            title: 'Optimasi Klasifikasi Kualitas Udara (Jurnal Khatulistiwa Informatika)',
            org: ID ? 'Universitas Nusa Mandiri — Publikasi Ilmiah' : 'Universitas Nusa Mandiri — Scientific Publication',
            summary: ID
                ? 'Riset komputasi dan publikasi jurnal ilmiah mengenai optimasi algoritma klasifikasi data kualitas udara menggunakan pendekatan Machine Learning.'
                : 'Computational research and a scientific journal publication on optimizing air quality data classification algorithms using a Machine Learning approach.',
            problem: ID
                ? 'Dataset kualitas udara multivariat sering kali memiliki noise dan ketidakseimbangan kelas yang menurunkan akurasi prediksi model standar.'
                : 'Multivariate air quality datasets often contain noise and class imbalance that reduce the prediction accuracy of standard models.',
            solution: ID
                ? 'Merancang pipeline pra-pemrosesan data, seleksi fitur, dan tuning hiperparameter untuk meningkatkan presisi klasifikasi secara terukur.'
                : 'Designed a data preprocessing pipeline, feature selection, and hyperparameter tuning to measurably improve classification precision.',
            stack: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation', 'Academic Publishing'],
        },
        {
            index: '03',
            tag: ID ? 'Full-Stack · Integrasi AI' : 'Full-Stack · AI Integration',
            year: '2025',
            title: 'AI Customer Service Chatbot & Nutritional Tracker Web App',
            org: ID ? 'Proyek Mandiri' : 'Independent Project',
            summary: ID
                ? 'Pengembangan aplikasi web modern terintegrasi AI berupa asisten layanan pelanggan otomatis (Chatbot) serta aplikasi kalkulasi nutrisi harian interaktif.'
                : 'Development of modern AI-integrated web applications: an automated customer service assistant (chatbot) and an interactive daily nutrition calculator.',
            problem: ID
                ? 'Kebutuhan akan antarmuka web responsif yang mampu memproses kueri pengguna secara cerdas dan menyajikan visualisasi metrik secara instan.'
                : 'The need for a responsive web interface that can process user queries intelligently and present metric visualizations instantly.',
            solution: ID
                ? 'Membangun arsitektur front-end modular dengan integrasi API bahasa alami, manajemen state reaktif, dan pengujian perangkat lunak (Software Testing).'
                : 'Built a modular front-end architecture with natural language API integration, reactive state management, and software testing.',
            stack: ['JavaScript ES6+', 'RESTful API', 'Tailwind CSS', 'UI/UX Architecture', 'Software Testing'],
        },
    ];
};

const Block = ({ label, text, theme }) => (
    <div style={{
        padding: '18px 20px', borderRadius: 14,
        background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`,
    }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: theme.accentText, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
        <p style={{ fontFamily: fonts.body, fontSize: 'clamp(13px,1.3vw,14.5px)', lineHeight: 1.75, color: theme.textSecondary, margin: 0 }}>{text}</p>
    </div>
);

const CaseStudies = () => {
    const { theme, isDark, lang } = useTheme();
    const ID = lang === 'ID';
    const cases = getCases(lang);

    return (
        <Section id="cases">
            <SectionHeader
                index="03" label={ID ? 'Studi kasus' : 'Case studies'}
                solid={ID ? 'STUDI' : 'CASE'} outline={ID ? 'KASUS.' : 'STUDIES.'}
                desc={ID ? 'Masalah yang dihadapi, solusi yang dirancang, serta teknologi di baliknya.' : 'The problems faced, the solutions designed, and the technology behind them.'}
                theme={theme} isDark={isDark}
            />

            <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once: true, amount: 0.05 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {cases.map(c => (
                    <motion.article key={c.index} variants={rise} className="case-card" {...panelHover(theme)}
                        style={panelStyle(theme, {
                            display: 'grid', gridTemplateColumns: 'minmax(0,3fr) minmax(0,9fr)',
                            gap: 'clamp(20px,4vw,56px)', padding: 'clamp(22px,3.4vw,40px)',
                        })}
                    >
                        <div>
                            <div style={{
                                fontFamily: fonts.display, fontWeight: 800, lineHeight: 1,
                                fontSize: 'clamp(44px,6vw,76px)', letterSpacing: '-3px',
                                color: 'transparent',
                                WebkitTextStroke: `1.5px ${theme.accent}`,
                                marginBottom: 20,
                            }}>{c.index}</div>
                            <div style={{ fontFamily: fonts.mono, fontSize: 11, color: theme.textMuted, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.7 }}>
                                {c.tag}
                            </div>
                            <div style={{ fontFamily: fonts.mono, fontSize: 12.5, fontWeight: 600, color: theme.accentText, marginTop: 10 }}>{c.year}</div>
                        </div>

                        <div>
                            <h3 style={{
                                fontFamily: fonts.display, fontWeight: 800,
                                fontSize: 'clamp(21px,2.6vw,32px)', letterSpacing: '-0.8px', lineHeight: 1.2,
                                color: theme.textPrimary, margin: '0 0 8px',
                            }}>{c.title}</h3>
                            <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 600, color: theme.textMuted, marginBottom: 16 }}>{c.org}</div>
                            <p style={{ fontFamily: fonts.body, fontSize: 'clamp(14px,1.45vw,16px)', lineHeight: 1.85, color: theme.textSecondary, margin: '0 0 24px', maxWidth: 720 }}>{c.summary}</p>

                            <div className="case-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
                                <Block label={ID ? 'Masalah & tantangan' : 'Problem & challenge'} text={c.problem} theme={theme} />
                                <Block label={ID ? 'Solusi' : 'Solution'} text={c.solution} theme={theme} />
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {c.stack.map(s => <Chip key={s} theme={theme}>{s}</Chip>)}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            <style>{`
                @media (max-width: 900px) {
                    #cases .case-card { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 640px) {
                    #cases .case-pair { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </Section>
    );
};

export default CaseStudies;
