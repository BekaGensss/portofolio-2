import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';

const LangSwitch = ({ lang, toggleLang }) => {
  const { isDark } = useTheme();

  return (
    <StyledWrapper isDark={isDark} onClick={toggleLang} title={lang === 'EN' ? 'Switch to Indonesian' : 'Switch to English'}>
      <span className={`lang-label ${lang === 'ID' ? 'active' : ''}`}>ID</span>
      
      <div className={`toggle-track ${lang === 'EN' ? 'en' : 'id'}`}>
        <div className="toggle-thumb" />
      </div>

      <span className={`lang-label ${lang === 'EN' ? 'active' : ''}`}>EN</span>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  cursor: pointer;
  user-select: none;
  
  .lang-label {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.5px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
    transition: all 0.3s ease;
  }
  
  .lang-label.active {
    color: ${props => props.isDark ? '#d4af37' : '#b8860b'}; /* Gold color when active */
    text-shadow: ${props => props.isDark ? '0 0 10px rgba(212, 175, 55, 0.3)' : 'none'};
  }

  .toggle-track {
    width: 36px;
    height: 20px;
    border-radius: 20px;
    background: ${props => props.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    border: 1px solid ${props => props.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
    position: relative;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }

  .toggle-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${props => props.isDark ? '#d4af37' : '#b8860b'};
    position: absolute;
    left: 3px;
    transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .toggle-track.en .toggle-thumb {
    transform: translateX(16px);
  }

  &:hover .toggle-track {
    background: ${props => props.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'};
  }
`;

export default LangSwitch;
