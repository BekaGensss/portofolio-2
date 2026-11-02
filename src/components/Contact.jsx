import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { useTheme, fonts } from '../ThemeContext';
import { Section, SectionHeader, Chip, panelStyle } from './ui';

const EMAIL = 'stenkrama@gmail.com';
const PHONE_DISPLAY = '+62 878-7105-3675';
const PHONE_WA = '6287871053675';

const POSITIONS = ['IT Support Specialist', 'Network Security Engineer', 'Infrastructure Administrator', 'Web Developer'];

const Contact = () => {
    const { theme, isDark, lang } = useTheme();
    const ID = lang === 'ID';

    const channels = [
        { icon: FiMail,     label: 'Email',    value: EMAIL,         href: `mailto:${EMAIL}` },
        { icon: FiPhone,    label: 'WhatsApp', value: PHONE_DISPLAY, href: `https://wa.me/${PHONE_WA}` },
        { icon: FiLinkedin, label: 'LinkedIn', value: 'Bara Kusuma', href: 'https://id.linkedin.com/in/bara-kusuma-707067294' },
        { icon: FiGithub,   label: 'GitHub',   value: '@BekaGensss', href: 'https://github.com/BekaGensss' },
        { icon: FiMapPin,   label: ID ? 'Domisili' : 'Location', value: 'Jakarta Barat, 11730', href: null },
    ];

    return (
        <Section id="contact">
            <SectionHeader
                index="07" label={ID ? 'Kontak' : 'Contact'}
                solid={ID ? 'KONTAK' : 'CONTACT'} outline={ID ? 'SAYA.' : 'ME.'}
                desc={ID ? 'Terbuka untuk diskusi peluang kerja maupun kolaborasi.' : 'Open to discussing job opportunities and collaboration.'}
                theme={theme} isDark={isDark}
            />

            <div className="contact-grid" style={{
                display: 'grid', gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)',
                gap: 'clamp(32px,5vw,80px)', alignItems: 'start',
            }}>
                <motion.div
                    initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
                >
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22,
                        fontFamily: fonts.mono, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: theme.accentText,
                    }}>
                        <span style={{ width: 7, height: 7, background: theme.accent }} />
                        {ID ? 'Terbuka untuk full-time / kontrak' : 'Open for full-time / contract'}
                    </span>

                    <h3 style={{
                        fontFamily: fonts.display, fontWeight: 800,
                        fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.08, letterSpacing: '-1.5px',
                        textTransform: 'uppercase', color: theme.textPrimary, margin: '0 0 24px',
                    }}>
                        {ID ? 'Siap membangun' : 'Ready to build'}{' '}
                        <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${theme.accent}` }}>
                            {ID ? 'infrastruktur yang aman?' : 'secure infrastructure?'}
                        </span>
                    </h3>

                    <p style={{
                        fontFamily: fonts.body, fontSize: 'clamp(14.5px,1.5vw,16.5px)', lineHeight: 1.85,
                        color: theme.textSecondary, maxWidth: 560, margin: '0 0 22px',
                    }}>
                        {ID
                            ? <>Tersedia untuk posisi <b style={{ color: theme.textPrimary }}>IT Support Specialist</b>, <b style={{ color: theme.textPrimary }}>Network Security Engineer</b>, <b style={{ color: theme.textPrimary }}>Infrastructure Administrator</b>, maupun <b style={{ color: theme.textPrimary }}>Web Developer</b> di area Jakarta dan sekitarnya.</>
                            : <>Available for <b style={{ color: theme.textPrimary }}>IT Support Specialist</b>, <b style={{ color: theme.textPrimary }}>Network Security Engineer</b>, <b style={{ color: theme.textPrimary }}>Infrastructure Administrator</b>, and <b style={{ color: theme.textPrimary }}>Web Developer</b> roles in Jakarta and the surrounding area.</>}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
                        {POSITIONS.map(p => <Chip key={p} theme={theme} accent>{p}</Chip>)}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Hiring Inquiry - Bara Kusuma')}`} className="btn-p">
                            <FiMail size={15} /> {ID ? 'Kirim Email' : 'Send Email'}
                        </a>
                        <a href={`https://wa.me/${PHONE_WA}`} target="_blank" rel="noopener noreferrer" className="btn-s"
                            style={{
                                color: isDark ? 'rgba(255,255,255,0.85)' : '#000000',
                                borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#000000',
                            }}>
                            <FiPhone size={15} /> WhatsApp
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
                    style={panelStyle(theme, { borderRadius: 22, overflow: 'hidden' })}
                >
                    {channels.map((c, i) => {
                        const Icon = c.icon;
                        const Tag = c.href ? 'a' : 'div';
                        const linkProps = c.href ? {
                            href: c.href,
                            target: c.href.startsWith('http') ? '_blank' : undefined,
                            rel: 'noopener noreferrer',
                        } : {};
                        return (
                            <Tag key={c.label} {...linkProps}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 16,
                                    padding: 'clamp(16px,2.4vw,22px) clamp(18px,2.6vw,26px)',
                                    borderTop: i === 0 ? 'none' : `1px solid ${theme.divider}`,
                                    textDecoration: 'none', color: theme.textPrimary,
                                    transition: 'background 0.2s ease',
                                }}
                                onMouseEnter={e => { if (c.href) e.currentTarget.style.background = theme.bgCardHover; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                <div style={{
                                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                    background: theme.accentBg, border: `1px solid ${theme.accentBorder}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accentText,
                                }}><Icon size={17} /></div>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <div style={{ fontFamily: fonts.mono, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.textMuted }}>{c.label}</div>
                                    <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(14.5px,1.6vw,16.5px)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.value}</div>
                                </div>
                                {c.href && <FiArrowUpRight size={16} style={{ color: theme.textMuted, flexShrink: 0 }} />}
                            </Tag>
                        );
                    })}
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    #contact .contact-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </Section>
    );
};

export default Contact;
