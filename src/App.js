import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FiGlobe,
  FiChevronDown,
  FiCode,
  FiCpu,
  FiSmartphone,
  FiDatabase,
  FiShield,
  FiArrowRight,
  FiArrowUpRight,
  FiArrowUp,
  FiMail,
  FiCopy,
  FiCheck,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiAward,
  FiFileText,
  FiExternalLink,
  FiX,
  FiDownload,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiHome,
} from 'react-icons/fi';
import { LANGUAGES, getTranslation } from './data/i18n';
import CutoutAnimeImage from './components/CutoutAnimeImage';

const EMAIL = 'stenkrama@gmail.com';
const LINKEDIN_URL = 'https://id.linkedin.com/in/bara-kusuma-707067294';
const GITHUB_URL = 'https://github.com/BekaGensss';
const GITHUB_REPOS_URL = 'https://github.com/BekaGensss?tab=repositories';
const assetUrl = (path) => `${process.env.PUBLIC_URL || ''}/${path}`;

export default function App() {
  // 1. Language state (8 Languages: ID, EN, JA, KO, ZH, AR, ES, DE)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('bk-lang') || 'ID';
    } catch (e) {
      return 'ID';
    }
  });
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // 2. Active Section for Navigation + Top Scroll Progress Bar
  const [activeNav, setActiveNav] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smart Navigation Auto-Hide on Scroll Down & Reveal on Scroll Up
  const [navVisible, setNavVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lastScrollYRef = useRef(0);

  // 3. Hero Scrollytelling state (4 smooth scroll scenes) & Cycling Role
  const heroContainerRef = useRef(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  // 4. Interactive Real Profile Photo (Grayscale by default, turns original color on hover or click)
  const [profileColorActive, setProfileColorActive] = useState(false);

  // 5. Certificates filter & detail modal
  const [certFilter, setCertFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedSerial, setCopiedSerial] = useState(false);

  // 6. Copy email feedback
  const [copiedEmail, setCopiedEmail] = useState(false);

  // 7. Glowing Cursor Trail Canvas Ref
  const canvasRef = useRef(null);
  const langDropdownRef = useRef(null);

  const t = getTranslation(lang);
  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Persist language & RTL direction for Arabic
  useEffect(() => {
    try {
      localStorage.setItem('bk-lang', lang);
    } catch (e) {
      // ignore storage errors
    }
    document.documentElement.dir = currentLangObj.dir || 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }, [lang, currentLangObj.dir]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Unified, Synchronous-on-Mount Scroll Controller (Prevents any refresh layout jump!)
  useLayoutEffect(() => {
    const sectionIds = ['about', 'experience', 'projects', 'certificates', 'contact'];

    const syncScrollState = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;

      // 1. Top reading progress bar (0% .. 100%)
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      // 2. Hero scrollytelling stage progress
      if (heroContainerRef.current) {
        const rect = heroContainerRef.current.getBoundingClientRect();
        const scrollableHeight = heroContainerRef.current.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollableHeight);
        const progress = scrollableHeight > 0 ? scrolled / scrollableHeight : 0;
        setHeroProgress(progress);
      }

      // 3. Back to top button visibility
      setShowBackToTop(currentScrollY > 320);

      // 4. Smart auto-hide navigation on scroll down, reveal on scroll up
      if (currentScrollY < 120) {
        setNavVisible(true);
      } else {
        const delta = currentScrollY - lastScrollYRef.current;
        if (delta > 8) {
          setNavVisible(false);
          setLangMenuOpen(false);
        } else if (delta < -8) {
          setNavVisible(true);
        }
      }
      lastScrollYRef.current = currentScrollY;

      // 5. Section scroll-spy
      if (currentScrollY < window.innerHeight * 0.4) {
        setActiveNav('home');
      } else {
        const scrollPos = currentScrollY + window.innerHeight * 0.35;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.offsetTop <= scrollPos) {
            setActiveNav(sectionIds[i]);
            break;
          }
        }
      }
    };

    // Run immediately before first browser paint so refreshing mid-page never glitches!
    syncScrollState();

    window.addEventListener('scroll', syncScrollState, { passive: true });
    window.addEventListener('resize', syncScrollState, { passive: true });
    return () => {
      window.removeEventListener('scroll', syncScrollState);
      window.removeEventListener('resize', syncScrollState);
    };
  }, []);

  // Dynamic Animated Favicon ("BK" logo color cycles gently in the browser tab)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = assetUrl('favicon.png');

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    let hueAngle = 0;
    let intervalId;

    let faviconLink = document.querySelector("link[rel*='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'shortcut icon';
      faviconLink.type = 'image/png';
      document.head.appendChild(faviconLink);
    }

    img.onload = () => {
      const updateFavicon = () => {
        if (!ctx || document.hidden) return;
        ctx.clearRect(0, 0, 64, 64);
        ctx.filter = `hue-rotate(${hueAngle}deg) saturate(1.2)`;
        ctx.drawImage(img, 0, 0, 64, 64);
        faviconLink.href = canvas.toDataURL('image/png');
        hueAngle = (hueAngle + 25) % 360;
      };

      updateFavicon();
      intervalId = setInterval(updateFavicon, 2500);
    };

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Glowing Cursor Ribbon Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const trailPoints = [];
    const maxTrailLength = 24;
    const mouse = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trailPoints.push({ x: mouse.x, y: mouse.y, age: 0 });
      if (trailPoints.length > maxTrailLength) {
        trailPoints.shift();
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trailPoints.length; i++) {
        trailPoints[i].age += 1;
      }
      while (trailPoints.length > 0 && trailPoints[0].age > 26) {
        trailPoints.shift();
      }

      if (trailPoints.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
        for (let i = 1; i < trailPoints.length - 1; i++) {
          const xc = (trailPoints[i].x + trailPoints[i + 1].x) / 2;
          const yc = (trailPoints[i].y + trailPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(trailPoints[i].x, trailPoints[i].y, xc, yc);
        }
        const grad = ctx.createLinearGradient(
          trailPoints[0].x,
          trailPoints[0].y,
          mouse.x,
          mouse.y
        );
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.35)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0.78)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(99, 102, 241, 0.8)';
        ctx.shadowBlur = 12;
        ctx.stroke();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Cycling Role Text ("Full-Stack" -> "Network & AI" -> "Mobile & Web")
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % t.hero.roles.length);
        setRoleVisible(true);
      }, 260);
    }, 2600);
    return () => clearInterval(interval);
  }, [t.hero.roles.length]);

  // Determine current scroll phase (1, 2, 3, 4) from scroll progress (0..1)
  const stage =
    heroProgress < 0.25
      ? 1
      : heroProgress < 0.52
        ? 2
        : heroProgress < 0.78
          ? 3
          : 4;

  const isStage1Active = stage === 1;
  const isStage3Or4Active = stage === 3 || stage === 4;

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL);
    } else {
      const temp = document.createElement('textarea');
      temp.value = EMAIL;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopySerial = (serial) => {
    if (!serial) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(serial);
    }
    setCopiedSerial(true);
    setTimeout(() => setCopiedSerial(false), 2000);
  };

  const filteredCerts =
    certFilter === 'all'
      ? t.certificates.items
      : t.certificates.items.filter((c) => c.category === certFilter);

  const navItems = [
    { id: 'home', href: '#top', label: t.nav.home || 'Home', Icon: FiHome },
    { id: 'about', href: '#about', label: t.nav.about, Icon: FiUser },
    { id: 'experience', href: '#experience', label: t.nav.experience, Icon: FiBriefcase },
    { id: 'projects', href: '#projects', label: t.nav.projects, Icon: FiFolder },
    { id: 'certificates', href: '#certificates', label: t.nav.certificates, Icon: FiAward },
    { id: 'contact', href: '#contact', label: t.nav.contact, Icon: FiMail },
  ];

  return (
    <div className="min-h-screen bg-[#040406] text-[#f4f4f6] pb-20 md:pb-0 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 0. TOP SCROLL PROGRESS BAR (Recommendation #1: Thin 2px Gradient Line at Very Top) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.85)] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 1. GLOWING CURSOR TRAIL CANVAS OVERLAY */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        aria-hidden="true"
      />

      {/* 2A. MODERN FLOATING PILL TOP NAVBAR (Auto-Hides on Scroll Down, Reveals on Scroll Up!) */}
      <header
        className={`fixed top-2.5 sm:top-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none transition-all duration-300 ease-out ${
          navVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-16 opacity-0 invisible'
        }`}
      >
        <div
          className={`max-w-5xl mx-auto h-11 sm:h-13 px-3 sm:px-4 rounded-2xl bg-[#090910]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.75)] flex items-center justify-between gap-2 ${
            navVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Brand Name */}
          <a
            href="#top"
            className="text-xs sm:text-sm font-bold tracking-tight text-white hover:text-indigo-400 transition-all flex items-center px-2 py-1 rounded-xl hover:bg-white/[0.04] active:scale-95 shrink-0"
          >
            <span>Bara Kusuma</span>
          </a>

          {/* Desktop Interactive Pill Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {navItems.map(({ id, href, label, Icon }) => {
              const isActive = activeNav === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={() => setActiveNav(id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/90 to-indigo-500/90 text-white shadow-[0_2px_14px_rgba(99,102,241,0.45)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-400/80'}`} />
                  <span>{label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Control: GitHub + Multi-Language Translator Dropdown */}
          <div className="flex items-center gap-1.5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub @BekaGensss"
              title="GitHub @BekaGensss"
              className="w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-indigo-500/20 text-zinc-300 hover:text-white border border-white/[0.08] hover:border-indigo-500/30 flex items-center justify-center transition-all active:scale-95"
            >
              <FiGithub className="w-3.5 h-3.5" />
            </a>

            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((v) => !v)}
                className="h-8 text-[11px] px-2.5 sm:px-3 rounded-xl bg-indigo-500/12 hover:bg-indigo-500/25 text-indigo-200 border border-indigo-500/30 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Translate / Pilih Bahasa"
              >
                <FiGlobe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentLangObj.flag}</span>
                <span className="font-mono font-semibold text-[10px]">
                  {currentLangObj.code}
                </span>
                <FiChevronDown
                  className={`w-3 h-3 opacity-70 transition-transform ${
                    langMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl matte-card p-1.5 shadow-2xl border border-white/15 z-50">
                  <div className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                    Pilih Bahasa
                  </div>
                  {LANGUAGES.map((item) => {
                    const active = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLang(item.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] transition-all cursor-pointer ${
                          active
                            ? 'bg-indigo-500/25 text-indigo-200 font-semibold'
                            : 'text-zinc-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{item.flag}</span>
                          <span>{item.label}</span>
                        </span>
                        <span className="font-mono text-[10px] opacity-60">{item.code}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2B. FLOATING GLASS DOCK FOR MOBILE (Auto-Hides on Scroll Down to Free Up Screen Space!) */}
      <nav
        aria-label="Mobile Navigation"
        className={`md:hidden fixed bottom-2.5 inset-x-3 z-40 bg-[#090910]/90 backdrop-blur-2xl border border-white/12 rounded-2xl p-1 shadow-[0_14px_38px_rgba(0,0,0,0.9)] flex items-center justify-between gap-1 transition-all duration-300 ease-out ${
          navVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto visible'
            : 'translate-y-16 opacity-0 pointer-events-none invisible'
        }`}
      >
        {navItems.map(({ id, href, label, Icon }) => {
          const isActive = activeNav === id;
          return (
            <a
              key={id}
              href={href}
              onClick={() => setActiveNav(id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-500/30 to-indigo-600/15 text-white border border-indigo-400/30 shadow-[0_0_16px_rgba(99,102,241,0.3)] font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 mb-0.5 transition-transform ${
                  isActive ? 'text-indigo-300 scale-110' : ''
                }`}
              />
              <span className="text-[9px] tracking-tight leading-none truncate max-w-[58px]">
                {label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* =========================================================================
          3. SCROLL-TRIGGERED HERO SECTION
             - Clean, fast, and responsive scroll height
             - Inactive stage layers are strictly `invisible pointer-events-none` so they NEVER block clicks!
         ========================================================================= */}
      <section
        id="top"
        ref={heroContainerRef}
        className="relative h-[160vh] sm:h-[220vh] md:h-[280vh] w-full select-none"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#040406]">
          <div className="relative w-full max-w-6xl h-full mx-auto px-4 sm:px-6 flex items-center justify-center">
            {/* ================= VISUAL 1 & 2: BARA'S ANIME FRONT PORTRAIT ================= */}
            <div
              className="stage-layer absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: stage === 1 || stage === 2 ? 1 : 0,
                visibility: stage === 1 || stage === 2 ? 'visible' : 'hidden',
                transform:
                  stage === 1
                    ? 'scale(1)'
                    : stage === 2
                      ? 'scale(1.05)'
                      : 'scale(1.1)',
              }}
            >
              <div className="relative w-[340px] sm:w-[400px] md:w-[450px] h-[360px] sm:h-[440px] md:h-[510px] flex items-center justify-center -translate-y-8 sm:-translate-y-6 md:translate-y-0">
                <CutoutAnimeImage
                  src={assetUrl('anime-stage1.jpg')}
                  alt="Bara Kusuma — Portrait"
                  className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>

            {/* ================= VISUAL 3: BARA'S ANIME FACING FRONT TYPING AT LAPTOP ================= */}
            <div
              className="stage-layer absolute inset-0 flex items-center justify-center md:justify-end translate-y-16 sm:translate-y-20 md:translate-y-0 md:pr-2 lg:pr-6 pointer-events-none"
              style={{
                opacity: stage === 3 ? 1 : 0,
                visibility: stage === 3 ? 'visible' : 'hidden',
                transform:
                  stage === 3
                    ? 'scale(1)'
                    : stage < 3
                      ? 'translateY(24px) scale(0.95)'
                      : 'translateY(-16px) scale(0.95)',
              }}
            >
              <div className="relative w-[340px] sm:w-[420px] md:w-[490px] lg:w-[530px] h-[330px] sm:h-[400px] md:h-[470px] flex items-center justify-center">
                <CutoutAnimeImage
                  src={assetUrl('anime-stage2.jpg')}
                  alt="Bara Kusuma — Workspace"
                  className="w-full h-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>

            {/* ================= VISUAL 4: BARA'S ANIME CODING AT LAPTOP ================= */}
            <div
              className="stage-layer absolute inset-0 flex items-center justify-center md:justify-end translate-y-16 sm:translate-y-20 md:translate-y-0 md:pr-0 lg:pr-4 pointer-events-none"
              style={{
                opacity: stage === 4 ? 1 : 0,
                visibility: stage === 4 ? 'visible' : 'hidden',
                transform:
                  stage === 4
                    ? 'scale(1)'
                    : 'translateY(24px) scale(0.95)',
              }}
            >
              <div className="relative w-[350px] sm:w-[430px] md:w-[510px] lg:w-[560px] h-[340px] sm:h-[410px] md:h-[490px] flex items-center justify-center">
                <CutoutAnimeImage
                  src={assetUrl('anime-stage3.jpg')}
                  alt="Bara Kusuma — Coding"
                  className="w-full h-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>

            {/* ================= OVERLAY TEXT LAYER A: STAGE 1 ================= */}
            <div
              className={`stage-layer relative z-20 w-full h-full flex flex-col justify-between pt-16 pb-20 sm:pt-20 sm:pb-24 pointer-events-none ${
                isStage1Active ? 'visible' : 'invisible'
              }`}
              style={{
                opacity: isStage1Active ? 1 : 0,
                transform: isStage1Active ? 'translateY(0px)' : 'translateY(-20px)',
              }}
            >
              {/* Top Row: Role Title */}
              <div className="text-center md:text-left md:grid md:grid-cols-12 md:gap-6 items-start">
                <div className="md:col-span-4 z-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
                    <span
                      className="text-gradient-blue block transition-all duration-500"
                      style={{
                        opacity: roleVisible ? 1 : 0,
                        transform: roleVisible ? 'translateY(0)' : 'translateY(8px)',
                      }}
                    >
                      {t.hero.roles[roleIndex % t.hero.roles.length]}
                    </span>
                    <span className="text-white block">{t.hero.developer}</span>
                  </h1>
                </div>
              </div>

              {/* Bottom Row: Introduction */}
              <div
                className={`md:grid md:grid-cols-12 md:gap-6 items-end pb-3 sm:pb-0 ${
                  isStage1Active ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <div className="hidden md:block md:col-span-8" />
                <div className="md:col-span-4 md:pl-4 text-center md:text-left max-w-[325px] sm:max-w-md mx-auto md:mx-0 p-2.5 sm:p-0 rounded-2xl bg-[#040406]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-white/[0.08] md:border-0 shadow-xl md:shadow-none">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[9.5px] sm:text-xs font-mono uppercase tracking-widest text-indigo-400 md:text-zinc-500 mb-1 sm:mb-1.5">
                    <span>{t.hero.introLabel}</span>
                  </div>
                  <h2 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug mb-1 sm:mb-2">
                    {t.hero.introTitle}
                  </h2>
                  <p className="text-[10px] sm:text-xs md:text-sm text-zinc-300 md:text-zinc-400 leading-relaxed">
                    {t.hero.introDesc}
                  </p>
                </div>
              </div>

              {/* Bottom Center Scroll Indicator */}
              <div className="hidden sm:flex flex-col items-center justify-center gap-2 pb-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                  {t.hero.scroll}
                </span>
                <div className="w-[1px] h-9 bg-zinc-800 overflow-hidden relative">
                  <div className="w-full h-full bg-indigo-400 scroll-line" />
                </div>
              </div>
            </div>

            {/* ================= OVERLAY TEXT LAYER B: STAGE 3 & 4 ("HALO SAYA BARA KUSUMA") ================= */}
            <div
              className={`stage-layer absolute inset-x-4 sm:inset-x-6 top-16 sm:top-20 md:top-auto md:bottom-16 z-20 max-w-6xl mx-auto pointer-events-none ${
                isStage3Or4Active ? 'visible' : 'invisible'
              }`}
              style={{
                opacity: isStage3Or4Active ? 1 : 0,
                transform: isStage3Or4Active ? 'translateY(0px)' : 'translateY(24px)',
              }}
            >
              <div
                className={`max-w-[325px] sm:max-w-md lg:max-w-lg mx-auto md:mx-0 text-center md:text-left p-3 sm:p-0 rounded-2xl bg-[#040406]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-white/[0.08] md:border-0 shadow-xl md:shadow-none ${
                  isStage3Or4Active ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <p className="text-xs sm:text-2xl font-light tracking-[0.35em] text-white uppercase mb-0.5 sm:mb-1">
                  {t.hero.hello}
                </p>
                <h2 className="text-xl sm:text-4xl font-extrabold tracking-wide text-gradient-blue uppercase mb-1.5 sm:mb-2.5">
                  {t.hero.imName}
                </h2>
                <p className="text-[11px] sm:text-sm text-zinc-300 leading-relaxed mb-3 sm:mb-5">
                  {t.hero.stage4Bio}
                </p>
                <a
                  href="#experience"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-[11px] sm:text-xs font-medium text-white transition-all group active:scale-95"
                >
                  <span>{t.hero.viewExp}</span>
                  <FiArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. ABOUT & SKILLS SECTION
         ========================================================================= */}
      <section id="about" className="relative pt-0 pb-12 sm:pt-4 sm:pb-24 px-3.5 sm:px-6 max-w-6xl mx-auto -mt-10 sm:-mt-6 md:mt-0">
        <div className="mb-5 sm:mb-10">
          <span className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-400 block mb-1">
            {t.about.tag}
          </span>
          <h2 className="text-xl sm:text-4xl font-bold text-white tracking-tight">
            {t.about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          {/* Left Column: Real Photo Profile Card */}
          <div className="lg:col-span-4 matte-card rounded-2xl p-4 sm:p-5 max-w-[355px] sm:max-w-sm mx-auto lg:max-w-none w-full">
            <div
              onClick={() => setProfileColorActive((v) => !v)}
              className="relative w-full aspect-[4/4.1] rounded-xl overflow-hidden mb-3 sm:mb-4 bg-gradient-to-b from-indigo-950/50 to-zinc-950 border border-white/10 group cursor-pointer"
              title="Sentuh atau arahkan kursor untuk melihat warna asli"
            >
              <img
                src={assetUrl('profile.jpg')}
                alt="Bara Kusuma"
                className={`w-full h-full object-cover object-top transition-all duration-500 ${
                  profileColorActive
                    ? 'grayscale-0 contrast-100 scale-[1.02]'
                    : 'grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.02]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div>
                  <h3 className="text-sm sm:text-lg font-bold text-white leading-tight">
                    Bara Kusuma
                  </h3>
                  <p className="text-[10px] sm:text-xs text-indigo-400 font-medium">
                    {t.about.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Metadata Rows */}
            <div className="space-y-2 sm:space-y-3 text-[10.5px] sm:text-xs border-t border-white/[0.07] pt-3">
              <div className="grid grid-cols-3 gap-1.5">
                <span className="text-zinc-500">{t.about.basedInLabel}</span>
                <span className="col-span-2 text-zinc-200 font-medium">
                  {t.about.basedInValue}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <span className="text-zinc-500">{t.about.studiedLabel}</span>
                <span className="col-span-2 text-zinc-200 font-medium">
                  {t.about.studiedValue}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <span className="text-zinc-500">{t.about.langLabel}</span>
                <span className="col-span-2 text-zinc-200 font-medium">
                  {t.about.langValue}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Paragraphs + Clean "Unduh CV" Button + Compact 2-Col Skills Grid */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-7">
            <div className="space-y-2.5 sm:space-y-3.5 leading-relaxed">
              <p className="text-white font-medium text-xs sm:text-lg leading-relaxed">
                {t.about.bio1}
              </p>
              <p className="text-zinc-400 text-[11px] sm:text-sm leading-relaxed">
                {t.about.bio2}
              </p>
              <p className="text-zinc-400 text-[11px] sm:text-sm leading-relaxed">
                {t.about.bio3}
              </p>

              {/* Simple, clean Unduh CV button */}
              <div className="pt-1">
                <a
                  href={assetUrl('CV-Bara-Kusuma.pdf')}
                  download="CV-Bara-Kusuma.pdf"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10.5px] sm:text-xs transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                >
                  <FiDownload className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{t.nav.cv}</span>
                </a>
              </div>
            </div>

            {/* SKILLS & TOOLS */}
            <div>
              <div className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2.5 sm:mb-3.5">
                {t.about.skillsHeader}
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {/* Front-end (Full width across 2 cols) */}
                <div className="col-span-2 matte-card rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white mb-2">
                    <FiCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{t.about.catFrontend}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {[
                      'React',
                      'Next.js',
                      'Vue.js',
                      'JavaScript',
                      'TypeScript',
                      'HTML5 & CSS3',
                      'Tailwind CSS',
                      'Bootstrap',
                    ].map((s) => (
                      <span
                        key={s}
                        className="skill-pill text-[9.5px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Back-end & AI */}
                <div className="matte-card rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white mb-2">
                    <FiCpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{t.about.catBackend}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['Node.js', 'PHP', 'Laravel', 'REST API', 'Gemini AI'].map((s) => (
                      <span
                        key={s}
                        className="skill-pill text-[9.5px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile */}
                <div className="matte-card rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white mb-2">
                    <FiSmartphone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{t.about.catMobile}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['React Native', 'Expo', 'Android APK', 'Responsive Web'].map((s) => (
                      <span
                        key={s}
                        className="skill-pill text-[9.5px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="matte-card rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white mb-2">
                    <FiDatabase className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{t.about.catDatabase}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['MySQL', 'PostgreSQL', 'Firebase'].map((s) => (
                      <span
                        key={s}
                        className="skill-pill text-[9.5px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Security */}
                <div className="matte-card rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white mb-2">
                    <FiShield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{t.about.catNetSec}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {['Git & GitHub', 'Cisco CCNA', 'Network Security', 'Linux'].map((s) => (
                      <span
                        key={s}
                        className="skill-pill text-[9.5px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. EXPERIENCE SECTION
         ========================================================================= */}
      <section
        id="experience"
        className="relative py-12 sm:py-24 px-3.5 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.05]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-10 items-start">
          {/* Sticky Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-2.5 sm:space-y-4">
            <span className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-400 block">
              {t.experience.tag}
            </span>
            <h2 className="text-xl sm:text-4xl font-bold text-white tracking-tight">
              {t.experience.title}
            </h2>
            <p className="text-[11px] sm:text-sm text-zinc-400 leading-relaxed">
              {t.experience.desc}
            </p>

            {/* Status Pill Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[10.5px] sm:text-xs text-zinc-300">
              <span>
                {t.experience.statusPrefix}{' '}
                <strong className="text-white">{t.experience.statusRole}</strong>
                {t.experience.statusSuffix ? ` ${t.experience.statusSuffix}` : ''}
              </span>
            </div>
          </div>

          {/* Right Column: Experience Cards */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            {t.experience.items.map((exp, idx) => (
              <div key={idx} className="matte-card rounded-2xl p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                  <span className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                    {exp.org}
                  </span>
                  <span className="text-[9.5px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-400">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-white mb-1.5 sm:mb-2.5 leading-snug">
                  {exp.title}
                </h3>
                {exp.sub && (
                  <p className="text-[10.5px] sm:text-xs text-zinc-400 mb-2">{exp.sub}</p>
                )}
                {exp.bullets ? (
                  <ul className="space-y-1.5 text-[11px] sm:text-sm text-zinc-400 list-disc list-inside mb-3.5 sm:mb-4 leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] sm:text-sm text-zinc-400 leading-relaxed mb-3.5">
                    {exp.desc}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="skill-pill text-[9.5px] sm:text-[11px] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Direct 3 Certificate PDF Download/View Buttons inside the Education & Credentials Card */}
                {exp.certLinks && exp.certLinks.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-white/[0.07] flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {exp.certLinks.map((certItem) => (
                      <a
                        key={certItem.file}
                        href={assetUrl(certItem.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/12 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/25 font-mono text-[9.5px] sm:text-[11px] font-semibold transition-all active:scale-95"
                      >
                        <FiFileText className="w-3 h-3 shrink-0" />
                        <span>{certItem.label}</span>
                        <FiExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PROJECTS SECTION (Recommendation #3: 6 Real Projects + View All on GitHub CTA)
         ========================================================================= */}
      <section
        id="projects"
        className="relative py-12 sm:py-24 px-3.5 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.05]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-5 sm:mb-10">
          <div>
            <span className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-400 block mb-1">
              {t.projects.tag}
            </span>
            <h2 className="text-xl sm:text-4xl font-bold text-white tracking-tight">
              {t.projects.title}
            </h2>
          </div>
          <p className="text-[11px] sm:text-sm text-zinc-400 max-w-sm sm:text-right">
            {t.projects.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {t.projects.items.map((proj, idx) => (
            <div
              key={idx}
              className="matte-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${proj.gradient} flex items-center justify-center text-white font-bold text-[11px] sm:text-xs shadow-lg`}
                  >
                    {proj.badge}
                  </div>
                  <span className="text-[9.5px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                    {proj.type}
                  </span>
                </div>
                <div className="text-[9.5px] sm:text-[10.5px] font-mono text-zinc-500 mb-1">
                  {proj.meta}
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1.5 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed mb-3.5 sm:mb-4">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="skill-pill text-[9px] sm:text-[10.5px] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-medium text-indigo-400 hover:text-indigo-300 hover:underline shrink-0"
                  >
                    <span>{t.projects.viewCode}</span>
                    <FiArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Clean "View All Projects on GitHub" CTA Button */}
        <div className="mt-6 sm:mt-9 flex justify-center">
          <a
            href={GITHUB_REPOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.04] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-all shadow-lg active:scale-95 group"
          >
            <FiGithub className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
            <span>{t.projects.viewAllGithub || 'Lihat Semua Proyek di GitHub'}</span>
            <FiArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          7. CERTIFICATES SECTION (Removed "PDF ASLI TERSEDIA" badge for a cleaner look)
         ========================================================================= */}
      <section
        id="certificates"
        className="relative py-12 sm:py-24 px-3.5 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.05]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-5 sm:mb-9">
          <div>
            <span className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-400 block mb-1">
              {t.certificates.tag}
            </span>
            <h2 className="text-xl sm:text-4xl font-bold text-white tracking-tight">
              {t.certificates.title}
            </h2>
            <p className="text-[11px] sm:text-sm text-zinc-400 max-w-xl mt-1 leading-relaxed">
              {t.certificates.desc}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: 'all', label: t.certificates.filterAll },
              { key: 'cisco', label: t.certificates.filterCisco },
              { key: 'safety', label: t.certificates.filterSafety },
            ].map((f) => {
              const active = certFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setCertFilter(f.key)}
                  className={`text-[10.5px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-medium transition-all active:scale-95 cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'skill-pill'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="matte-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Top Meta Row (Clean human label without "PDF ASLI TERSEDIA" badge) */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/[0.07]">
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium text-indigo-400">
                    {cert.code}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500">
                    {cert.date}
                  </span>
                </div>

                {/* Issuer & Title */}
                <div className="text-[10px] sm:text-[11px] text-zinc-400 mb-0.5">
                  {cert.issuer}
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1 leading-snug">
                  {cert.title}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-zinc-500 mb-2">
                  {cert.subIssuer}
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed mb-3">
                  {cert.desc}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1 mb-3.5">
                  {cert.skills.map((sc) => (
                    <span
                      key={sc}
                      className="skill-pill text-[9.5px] sm:text-[11px] px-2 py-0.5 rounded-md"
                    >
                      {sc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-2.5 border-t border-white/[0.07] space-y-2">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400">
                  <span>{t.certificates.instructorLabel}:</span>
                  <span className="text-zinc-200 font-medium">{cert.signatory}</span>
                </div>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-xl bg-white/[0.05] hover:bg-indigo-500/20 text-zinc-200 text-[10.5px] sm:text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <FiAward className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t.certificates.inspectBtn}</span>
                  </button>
                  {cert.file && (
                    <a
                      href={assetUrl(cert.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10.5px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-md shadow-indigo-500/20 active:scale-95"
                      title={t.certificates.openPdf}
                    >
                      <FiFileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                      <FiExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. CONTACT SECTION
         ========================================================================= */}
      <section id="contact" className="relative py-12 sm:py-20 px-3.5 sm:px-6 max-w-6xl mx-auto">
        <div className="matte-card rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left CTA Column */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              <span className="text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-400 block">
                {t.contact.tag}
              </span>
              <h2 className="text-xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12]">
                {t.contact.title}
              </h2>
              <p className="text-[11px] sm:text-sm text-zinc-400 leading-relaxed max-w-md">
                {t.contact.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-semibold text-[11px] sm:text-xs hover:bg-zinc-200 transition-all active:scale-95"
                >
                  <FiMail className="w-3.5 h-3.5" />
                  <span>{t.contact.emailBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 font-medium text-[11px] sm:text-xs transition-all active:scale-95 cursor-pointer"
                >
                  {copiedEmail ? (
                    <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <FiCopy className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                  <span>{copiedEmail ? t.contact.copiedBtn : t.contact.copyBtn}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10.5px] sm:text-xs text-zinc-500 pt-1">
                <FiMapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>{t.contact.location}</span>
              </div>
            </div>

            {/* Right Social Stack Column */}
            <div className="lg:col-span-6 space-y-2 sm:space-y-2.5">
              {/* Email Row */}
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] flex items-center justify-center text-zinc-400 group-hover:text-white shrink-0">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9.5px] sm:text-[10px] text-zinc-500">
                      {t.contact.emailLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      {EMAIL}
                    </div>
                  </div>
                </div>
                <FiArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* LinkedIn Row */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] flex items-center justify-center text-zinc-400 group-hover:text-white shrink-0">
                    <FiLinkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9.5px] sm:text-[10px] text-zinc-500">
                      {t.contact.linkedinLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      Bara Kusuma
                    </div>
                  </div>
                </div>
                <FiArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* GitHub Row */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] flex items-center justify-center text-zinc-400 group-hover:text-white shrink-0">
                    <FiGithub className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9.5px] sm:text-[10px] text-zinc-500">
                      {t.contact.githubLabel || 'GitHub'}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      @BekaGensss
                    </div>
                  </div>
                </div>
                <FiArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER
         ========================================================================= */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] sm:text-xs text-zinc-500">
        <div>
          © {new Date().getFullYear()} <span>Bara Kusuma</span>. {t.footer.rights}
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email Bara Kusuma"
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          >
            <FiMail className="w-3.5 h-3.5" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Bara Kusuma"
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          >
            <FiLinkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Bara Kusuma"
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          >
            <FiGithub className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>

      {/* =========================================================================
          10. CERTIFICATE INSPECTOR MODAL
         ========================================================================= */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="matte-card w-full max-w-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/15 shadow-2xl max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 sm:mb-5">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-indigo-400 font-medium block">
                  {selectedCert.code}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white mt-0.5">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Penerbit:</span>
                  <span className="font-semibold text-zinc-200 text-right">
                    {selectedCert.issuer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Institusi:</span>
                  <span className="text-zinc-300 text-right">{selectedCert.subIssuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tanggal:</span>
                  <span className="font-mono text-indigo-400">{selectedCert.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">{t.certificates.instructorLabel}:</span>
                  <span className="font-medium text-zinc-200">{selectedCert.signatory}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-white/[0.06]">
                  <span className="text-zinc-500">{t.certificates.serialLabel}:</span>
                  <span className="font-mono text-[11px] text-emerald-400 break-all">
                    {selectedCert.serial}
                  </span>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed">{selectedCert.desc}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedCert.skills.map((s) => (
                  <span key={s} className="skill-pill text-[11px] px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleCopySerial(selectedCert.serial)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                >
                  {copiedSerial ? (
                    <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <FiCopy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedSerial ? t.certificates.copied : t.certificates.copySerial}
                  </span>
                </button>

                {selectedCert.file && (
                  <a
                    href={assetUrl(selectedCert.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 sm:px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/25"
                  >
                    <FiFileText className="w-3.5 h-3.5" />
                    <span>{t.certificates.openPdf}</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. MINIMALIST FLOATING BACK TO TOP BUTTON */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
        title="Kembali ke atas"
        className={`fixed z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0c0c16]/90 backdrop-blur-xl border border-white/15 text-zinc-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-600/25 shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center justify-center transition-all duration-300 active:scale-90 group cursor-pointer ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 translate-y-6 pointer-events-none invisible'
        } ${
          navVisible
            ? 'bottom-16 sm:bottom-6 right-3.5 sm:right-6'
            : 'bottom-3.5 sm:bottom-6 right-3.5 sm:right-6'
        }`}
      >
        <FiArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
      </button>
    </div>
  );
}
