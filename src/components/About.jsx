import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import {
    SiJavascript, SiReact, SiTailwindcss, SiPython,
    SiLaravel, SiNodedotjs, SiMysql, SiGit,
} from 'react-icons/si';
import { useTheme } from '../ThemeContext';

const cv = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.07}} };
const ci = { hidden:{y:28,opacity:0}, visible:{y:0,opacity:1,transition:{type:'spring',stiffness:75,damping:18}} };

/* ── Section Heading (reusable) ── */
export const SectionHeading = ({ solid, outline, theme, isDark }) => (
    <h2 style={{
        fontFamily:'Outfit, sans-serif', fontWeight:800,
        fontSize:'clamp(2.5rem,6vw,4.5rem)',
        lineHeight:1,
        letterSpacing:'-2px',
        textTransform:'uppercase', margin:0,
        display: 'flex', flexDirection: 'column'
    }}>
        <span style={{ color:theme.textPrimary }}>{solid}</span>
        <span style={{ 
            color: 'transparent', 
            WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.8)' : '2px rgba(0,0,0,0.8)',
            marginTop: '-8px'
        }}>{outline}</span>
        <div style={{ display:'flex', alignItems: 'center', gap:12, marginTop:24 }}>
            <div style={{ width:60, height:2, background:theme.accent, borderRadius:1 }} />
            <div style={{ width:12, height:2, background:theme.accent, borderRadius:1, opacity: 0.5 }} />
            <div style={{ width:4, height:2, background:theme.accent, borderRadius:1, opacity: 0.2 }} />
        </div>
    </h2>
);

/* ── Tech card with real icon ── */
const TechCard = ({ name, bg, textColor, Icon, iconSize = 40 }) => (
    <div style={{
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        background: bg, borderRadius:16, padding:'18px 12px 14px',
        cursor:'default', transition:'all 0.25s ease',
        aspectRatio:'1/1.05', position:'relative', overflow:'hidden',
    }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(0,0,0,0.35)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
    >
        <Icon size={iconSize} color={textColor} style={{ flexShrink:0 }} />
        <div>
            <div style={{
                fontFamily:"'Plus Jakarta Sans','Inter',sans-serif", fontWeight:700,
                fontSize:'clamp(10px,1.2vw,13px)', color:textColor,
                letterSpacing:'-0.1px', marginBottom:2, lineHeight:1.2,
            }}>{name}</div>
        </div>
        <FiArrowUpRight size={13} style={{
            position:'absolute', bottom:10, right:10,
            color:textColor, opacity:0.6,
        }} />
    </div>
);

const techGrid = [
    { name:'JavaScript', bg:'#EFD81D', textColor:'#1a1400', Icon:SiJavascript  },
    { name:'React',      bg:'#20232a', textColor:'#61DBFB', Icon:SiReact,       iconSize:38 },
    { name:'Tailwind',   bg:'#0EA5E9', textColor:'#fff',    Icon:SiTailwindcss  },
    { name:'Python',     bg:'#3B82F6', textColor:'#fff',    Icon:SiPython       },
    { name:'Laravel',    bg:'#F05340', textColor:'#fff',    Icon:SiLaravel      },
    { name:'Node.js',    bg:'#3C873A', textColor:'#fff',    Icon:SiNodedotjs    },
    { name:'MySQL',      bg:'#4479A1', textColor:'#fff',    Icon:SiMysql        },
    { name:'Git',        bg:'#F05032', textColor:'#fff',    Icon:SiGit          },
];

const About = () => {
    const { theme, isDark, lang } = useTheme();

    return (
        <section id="about" style={{ padding:'clamp(60px,9vh,96px) 0', position:'relative' }}>
            <div className="hdiv" />
            <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(40px,5vh,64px) clamp(20px,4vw,40px) 0' }}>
                <motion.div initial="hidden" whileInView="visible" variants={cv} viewport={{ once:true, amount:0.06 }}>

                    {/* Label */}
                    <motion.div variants={ci} style={{ marginBottom:20 }}>
                        <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:11, color:theme.textMuted, letterSpacing:3, textTransform:'uppercase' }}>// {lang === 'ID' ? 'TENTANG SAYA' : 'ABOUT ME'}</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={ci} style={{ marginBottom:'clamp(36px,5vh,56px)' }}>
                        <SectionHeading solid={lang === 'ID' ? 'TENTANG' : 'ABOUT'} outline={lang === 'ID' ? 'SAYA.' : 'ME.'} theme={theme} isDark={isDark} />
                    </motion.div>

                    {/* Grid: teks kiri, stack kanan */}
                    <div style={{
                        display:'grid',
                        gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))',
                        gap:'clamp(32px,4vw,60px)',
                        alignItems:'start',
                    }}>
                        {/* KIRI */}
                        <motion.div variants={ci}>
                            <p style={{
                                fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",
                                fontSize:'clamp(15px,1.6vw,17px)',
                                lineHeight:1.85, color:theme.textSecondary, marginBottom:16,
                            }}>
                                {lang === 'ID' 
                                    ? 'Saya sudah membangun aplikasi web lebih dari 2 tahun. Diawali rasa penasaran, bertahan karena cinta pada prosesnya. Setiap baris kode yang saya tulis dibuat untuk memberikan dampak nyata.'
                                    : 'I have been building web applications for over 2 years. Started from curiosity, stayed for the love of the process. Every line of code I write is made to deliver real impact.'}
                            </p>
                            <p style={{
                                fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",
                                fontSize:'clamp(14px,1.5vw,16px)',
                                lineHeight:1.85, color:theme.textMuted, marginBottom:32,
                            }}>
                                {lang === 'ID'
                                    ? 'Saya menjaga kode tetap bersih, skalabel, dan efisien — baik itu MVP startup maupun sistem skala enterprise. Ketika tidak sedang mengerjakan proyek, saya terus belajar. Tanpa henti.'
                                    : 'I keep code clean, scalable, and efficient — whether it\'s a startup MVP or an enterprise-scale system. When not working on projects, I keep learning. Relentlessly.'}
                            </p>

                            {/* Statistik */}
                            <div style={{ display:'flex', flexWrap:'wrap', gap:20 }}>
                                {[
                                    { num:'2+',  label: lang === 'ID' ? 'Tahun Pengalaman' : 'Years Experience'  },
                                    { num:'10+', label: lang === 'ID' ? 'Proyek Diselesaikan' : 'Projects Completed' },
                                ].map(s => (
                                    <div key={s.label} style={{
                                        padding:'24px 32px',
                                        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                                        border:`1px solid ${theme.border}`,
                                        borderRadius:20,
                                        flex: '1 1 180px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=theme.borderAccent; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor=theme.border; }}
                                    >
                                        <div style={{ fontFamily:'Outfit, sans-serif', fontWeight:800, fontSize:'clamp(36px,4vw,46px)', color:theme.textPrimary, letterSpacing:'-2px', lineHeight:1, marginBottom:8 }}>{s.num}</div>
                                        <div style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif", fontSize:'clamp(12px,1.2vw,14px)', fontWeight:600, color:theme.textSecondary, letterSpacing:'0.05em', textTransform:'uppercase', lineHeight:1.4 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* KANAN: Icon grid */}
                        <motion.div variants={ci}>
                            <div style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif", fontWeight:700, fontSize:'clamp(10px,1.1vw,12px)', color:theme.textMuted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:16 }}>
                                // TEKNOLOGI &amp; TOOLS
                            </div>
                            <div style={{
                                display:'grid',
                                gridTemplateColumns:'repeat(4, 1fr)',
                                gap:'clamp(7px,1vw,10px)',
                            }}>
                                {techGrid.map(t => <TechCard key={t.name} {...t} />)}
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            {/* Responsive */}
            <style>{`
                @media (max-width: 640px) {
                    #about .tech-grid-wrap {
                        margin-top: 8px;
                    }
                }
            `}</style>
        </section>
    );
};

export default About;