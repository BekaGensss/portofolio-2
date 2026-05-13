import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { SectionHeading } from './About';

const Contact = () => {
    const { theme, isDark, lang } = useTheme();

    return (
        <section id="contact" style={{ padding:'clamp(64px,10vh,100px) 0', position:'relative' }}>
            <div className="hdiv" />
            <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(40px,6vh,72px) clamp(16px,4vw,40px) 0' }}>

                {/* Label */}
                <motion.div
                    initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }}
                    transition={{ duration:0.55 }} viewport={{ once:true }}
                    style={{ marginBottom:24 }}
                >
                    <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:12, color:theme.textMuted, letterSpacing:3, textTransform:'uppercase' }}>
                        // HUBUNGI SAYA
                    </span>
                </motion.div>

                <motion.div
                    initial={{ y:24, opacity:0 }} whileInView={{ y:0, opacity:1 }}
                    transition={{ duration:0.55, delay:0.05 }} viewport={{ once:true }}
                    style={{ marginBottom:'clamp(40px,6vh,64px)' }}
                >
                    <SectionHeading solid="KONTAK" outline="SAYA." theme={theme} isDark={isDark} />
                </motion.div>

                {/* Profile card — like reference */}
                <motion.div
                    initial={{ y:30, opacity:0, scale:0.97 }}
                    whileInView={{ y:0, opacity:1, scale:1 }}
                    transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
                    viewport={{ once:true }}
                    style={{
                        maxWidth:500, margin:'0 auto',
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border:`1px solid ${theme.border}`,
                        borderRadius:24, padding:32,
                        display:'flex', flexDirection:'column', alignItems:'center',
                        gap:16,
                    }}
                >
                    {/* Profile photo */}
                    <div style={{
                        width:90, height:90, borderRadius:'50%', overflow:'hidden',
                        border:'3px solid #d4af37',
                        boxShadow:'0 0 30px rgba(212, 175, 55,0.2)',
                    }}>
                        <img src={process.env.PUBLIC_URL + '/profile.jpg'} alt="Bara Kusuma"
                            style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>

                    {/* Name + desc */}
                    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={{ textAlign:'center' }}>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 11, color: theme.textMuted, letterSpacing: 3, textTransform: 'uppercase' }}>// {lang === 'ID' ? 'MARI TERHUBUNG' : "LET'S CONNECT"}</span>
                        <SectionHeading solid={lang === 'ID' ? 'KONTAK' : 'CONTACT'} outline={lang === 'ID' ? 'SAYA.' : 'ME.'} theme={theme} isDark={isDark} />
                        <p style={{
                            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                            fontSize: 'clamp(14px,1.5vw,16px)',
                            lineHeight: 1.7, color: theme.textSecondary,
                            maxWidth: 360, marginTop: 12, margin: '12px auto 0 auto',
                        }}>
                            {lang === 'ID' ? 'Punya ide proyek, peluang kolaborasi, atau sekadar ingin menyapa? Saya selalu terbuka untuk diskusi baru.' : 'Have a project idea, collaboration opportunity, or just want to say hi? I am always open to new discussions.'}
                        </p>
                    </motion.div>

                    {/* Social links */}
                    <div style={{ display:'flex', gap:12 }}>
                        {[
                            { href:'mailto:barakusuma911@gmail.com', icon:<FiMail size={15}/>,     label:'Email'    },
                            { href:'https://github.com/BekaGensss',  icon:<FiGithub size={15}/>,   label:'GitHub'   },
                            { href:'https://id.linkedin.com/in/bara-kusuma-707067294', icon:<FiLinkedin size={15}/>, label:'LinkedIn' },
                        ].map(s => (
                            <a key={s.label} href={s.href}
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer" aria-label={s.label}
                                style={{
                                    width:38, height:38, borderRadius:10,
                                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                    border:`1px solid ${theme.border}`,
                                    display:'flex', alignItems:'center', justifyContent:'center',
                                    color:theme.textMuted, textDecoration:'none', transition:'all 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(212, 175, 55,0.4)'; e.currentTarget.style.color='#d4af37'; e.currentTarget.style.transform='translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor=theme.border; e.currentTarget.style.color=theme.textMuted; e.currentTarget.style.transform='translateY(0)'; }}
                            >{s.icon}</a>
                        ))}
                    </div>

                    {/* CONTACT ME button */}
                    <a href="mailto:barakusuma911@gmail.com"
                        className="btn-p"
                        style={{
                            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                            width:'100%', padding:'14px 32px',
                            background:'#d4af37', borderRadius:100,
                            fontFamily:'Outfit, sans-serif', fontWeight:800,
                            fontSize:14, color:'#000',
                            textDecoration:'none', letterSpacing:1,
                            transition:'all 0.25s ease',
                            marginTop:4,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background='#fde68a'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(212, 175, 55,0.35)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='#d4af37'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                    >
                        <FiMail size={15} /> HUBUNGI SAYA
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;