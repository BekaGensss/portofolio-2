import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    dark: {
        bg: '#050505',
        bgAlt: '#0d0d0d',
        bgCard: 'rgba(255,255,255,0.03)',
        bgCardHover: 'rgba(212,175,55,0.05)',
        border: 'rgba(255,255,255,0.06)',
        borderAccent: 'rgba(212,175,55,0.4)',
        textPrimary: '#ffffff',
        textSecondary: 'rgba(255,255,255,0.65)',
        textMuted: 'rgba(255,255,255,0.4)',
        accent: '#d4af37',
        accentAlt: '#e5c07b',
        accentText: '#d4af37',
        accentBg: 'rgba(212,175,55,0.1)',
        accentBorder: 'rgba(212,175,55,0.25)',
        navBg: 'rgba(5,5,5,0.85)',
        inputBg: 'rgba(255,255,255,0.03)',
        inputBorder: 'rgba(255,255,255,0.1)',
        inputText: '#ffffff',
        badgeBg: 'rgba(255,255,255,0.04)',
        badgeBorder: 'rgba(255,255,255,0.08)',
        badgeText: 'rgba(255,255,255,0.8)',
        divider: 'rgba(255,255,255,0.05)',
        shadow: 'rgba(0,0,0,0.9)',
        tagText: '#d4af37',
        subText: '#94a3b8',
        lineColor: 'rgba(255,255,255,0.05)',
        numColor: 'rgba(255,255,255,0.1)',
        headingDim: 'rgba(255,255,255,0.12)',
    },
    light: {
        bg: '#faf9f6',
        bgAlt: '#ffffff',
        bgCard: 'rgba(255,255,255,0.9)',
        bgCardHover: 'rgba(184,134,11,0.05)',
        border: 'rgba(0,0,0,0.06)',
        borderAccent: 'rgba(184,134,11,0.3)',
        textPrimary: '#0a0a0a',
        textSecondary: 'rgba(10,10,10,0.65)',
        textMuted: 'rgba(10,10,10,0.45)',
        accent: '#b8860b',
        accentAlt: '#d4af37',
        accentText: '#8b6508',
        accentBg: 'rgba(184,134,11,0.1)',
        accentBorder: 'rgba(184,134,11,0.25)',
        navBg: 'rgba(250,249,246,0.88)',
        inputBg: 'rgba(0,0,0,0.02)',
        inputBorder: 'rgba(0,0,0,0.08)',
        inputText: '#0a0a0a',
        badgeBg: 'rgba(184,134,11,0.05)',
        badgeBorder: 'rgba(184,134,11,0.15)',
        badgeText: '#8b6508',
        divider: 'rgba(0,0,0,0.05)',
        shadow: 'rgba(0,0,0,0.05)',
        tagText: '#8b6508',
        subText: '#6b7280',
        lineColor: 'rgba(0,0,0,0.05)',
        numColor: 'rgba(0,0,0,0.08)',
        headingDim: 'rgba(0,0,0,0.1)',
    },
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [lang, setLang] = useState('ID');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
        }
        const savedLang = localStorage.getItem('portofolio-lang');
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    };

    const toggleLang = () => {
        setLang(prev => {
            const next = prev === 'ID' ? 'EN' : 'ID';
            localStorage.setItem('portofolio-lang', next);
            return next;
        });
    };

    const theme = isDark ? themes.dark : themes.light;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, lang, toggleLang }}>
            <div style={{
                background: theme.bg,
                color: theme.textPrimary,
                minHeight: '100vh',
                transition: 'background 0.3s ease, color 0.3s ease'
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
