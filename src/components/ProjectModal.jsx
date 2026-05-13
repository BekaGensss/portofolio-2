import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';

const modal = { hidden:{opacity:0,scale:0.94,y:20}, visible:{opacity:1,scale:1,y:0,transition:{type:'spring',stiffness:110,damping:20}}, exit:{opacity:0,scale:0.94,y:20,transition:{duration:0.18}} };
const back  = { hidden:{opacity:0}, visible:{opacity:1}, exit:{opacity:0} };

const tagC = {
    PHP:        {bg:'rgba(119,123,180,0.12)',t:'#a5b4fc',b:'rgba(119,123,180,0.22)'},
    CSS:        {bg:'rgba(34,211,238,0.1)',  t:'#67e8f9', b:'rgba(34,211,238,0.22)'},
    Laravel:    {bg:'rgba(255,45,32,0.1)',   t:'#fca5a5', b:'rgba(255,45,32,0.18)'},
    Python:     {bg:'rgba(52,175,215,0.1)',  t:'#93c5fd', b:'rgba(52,175,215,0.22)'},
    HTML:       {bg:'rgba(227,79,38,0.1)',   t:'#fdba74', b:'rgba(227,79,38,0.22)'},
    JavaScript: {bg:'rgba(247,223,30,0.1)', t:'#fde68a', b:'rgba(247,223,30,0.18)'},
    React:      {bg:'rgba(34,211,238,0.1)', t:'#a5f3fc', b:'rgba(34,211,238,0.22)'},
};

const ProjectModal = ({ project, onClose }) => {
    const { theme } = useTheme();
    const [idx, setIdx] = useState(0);
    if (!project) return null;
    const imgs = project.images || [];
    const prev = () => setIdx(i=>(i-1+imgs.length)%imgs.length);
    const next = () => setIdx(i=>(i+1)%imgs.length);

    return (
        <motion.div key="bd" variants={back} initial="hidden" animate="visible" exit="exit"
            style={{
                position:'fixed',inset:0,zIndex:200,
                display:'flex',alignItems:'center',justifyContent:'center',padding:16,
                background:'rgba(0,0,0,0.75)',backdropFilter:'blur(12px)',
            }}
            onClick={onClose}>
            <motion.div key="m" variants={modal} initial="hidden" animate="visible" exit="exit"
                onClick={e=>e.stopPropagation()}
                style={{
                    background:theme.bg||'#050508',
                    border:`1px solid ${theme.borderAccent}`,
                    borderRadius:22,width:'100%',maxWidth:660,
                    maxHeight:'90vh',overflowY:'auto',position:'relative',
                    boxShadow:'0 32px 80px rgba(0,0,0,0.7)',
                }}>
                {/* Accent line */}
                <div style={{ height:2, background:'linear-gradient(90deg,#6366f1,#22d3ee,transparent)', borderRadius:'22px 22px 0 0' }}/>

                {/* Close */}
                <button onClick={onClose} aria-label="Tutup" style={{
                    position:'sticky',top:14,float:'right',marginRight:14,marginTop:14,zIndex:10,
                    width:34,height:34,borderRadius:9,background:theme.bgCard,border:`1px solid ${theme.border}`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:theme.textSecondary,cursor:'pointer',transition:'all 0.2s',
                }}
                    onMouseEnter={e=>{ e.currentTarget.style.background='rgba(244,63,94,0.12)'; e.currentTarget.style.color='#f87171'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=theme.bgCard; e.currentTarget.style.color=theme.textSecondary; }}
                ><FiX size={15}/></button>

                <div style={{ padding:'22px 24px 26px', clear:'both' }}>
                    {/* Title */}
                    <div style={{ marginBottom:14 }}>
                        {project.subtitle && (
                            <span style={{ fontSize:10.5,color:theme.textMuted,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase' }}>
                                {project.subtitle}
                            </span>
                        )}
                        <h2 style={{
                            fontFamily:'Outfit,sans-serif',
                            fontSize:'clamp(1.3rem,3vw,1.7rem)',fontWeight:900,
                            color:theme.textPrimary,margin:'4px 0 0',lineHeight:1.15,letterSpacing:'-0.5px',
                        }}>{project.title}</h2>
                    </div>

                    <p style={{ fontSize:13.5,lineHeight:1.75,color:theme.textSecondary,marginBottom:22 }}>
                        {project.longDescription||project.description}
                    </p>

                    {/* Slider */}
                    {imgs.length>0 && (
                        <div style={{ marginBottom:22 }}>
                            <div style={{ position:'relative',borderRadius:14,overflow:'hidden',background:'#0a0a14' }}>
                                <img key={idx} src={imgs[idx]} alt={`${project.title} ${idx+1}`}
                                    style={{ width:'100%',height:'auto',maxHeight:300,objectFit:'cover',display:'block' }}/>
                                {imgs.length>1 && (
                                    <>
                                        <button onClick={prev} style={{ position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',width:30,height:30,borderRadius:8,background:'rgba(5,5,8,0.85)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',cursor:'pointer',zIndex:5 }}><FiChevronLeft size={15}/></button>
                                        <button onClick={next} style={{ position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',width:30,height:30,borderRadius:8,background:'rgba(5,5,8,0.85)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',cursor:'pointer',zIndex:5 }}><FiChevronRight size={15}/></button>
                                        <div style={{ position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',display:'flex',gap:5,zIndex:5 }}>
                                            {imgs.map((_,i)=>(
                                                <button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?18:7,height:7,borderRadius:4,background:i===idx?'#6366f1':'rgba(255,255,255,0.3)',border:'none',cursor:'pointer',transition:'all 0.3s',padding:0 }}/>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:20 }}>
                        {project.tags.map(t=>{
                            const c=tagC[t]||{bg:'rgba(99,102,241,0.1)',t:'#a5b4fc',b:'rgba(99,102,241,0.22)'};
                            return <span key={t} style={{ padding:'4px 12px',borderRadius:100,fontSize:11.5,fontWeight:700,background:c.bg,color:c.t,border:`1px solid ${c.b}` }}>{t}</span>;
                        })}
                    </div>

                    {/* Actions */}
                    <div style={{ display:'flex',flexWrap:'wrap',gap:10 }}>
                        {project.githubLink&&project.githubLink!=='#'&&(
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-p" style={{fontSize:13.5,padding:'10px 20px'}}>
                                <FiGithub size={15}/><span>Lihat GitHub</span>
                            </a>
                        )}
                        {project.liveDemoLink&&project.liveDemoLink!=='#'&&(
                            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="btn-s" style={{fontSize:13.5,padding:'10px 20px'}}>
                                <FiExternalLink size={14}/> Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;