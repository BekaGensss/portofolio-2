import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';

const LangSwitch = ({ lang, toggleLang }) => {
  const { isDark } = useTheme();

  return (
    <StyledWrapper isDark={isDark}>
      <span className={`lang-label ${lang === 'ID' ? 'active' : ''}`}>ID</span>
      
      <div className="switch-wrapper" title={lang === 'EN' ? 'Switch to Indonesian' : 'Switch to English'}>
        <input 
          type="checkbox" 
          id="lang-switch-heart"
          className="lang-input"
          checked={lang === 'EN'} 
          onChange={toggleLang} 
        />
        <label htmlFor="lang-switch-heart" className="love-heart">
          <div className="bottom" />
          <div className="round" />
        </label>
      </div>

      <span className={`lang-label ${lang === 'EN' ? 'active' : ''}`}>EN</span>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Jarak antara teks dan hati */
  height: 24px;
  
  .lang-label {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.5px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
    transition: color 0.3s ease;
  }
  
  .lang-label.active {
    color: ${props => props.isDark ? '#d4af37' : '#b8860b'}; /* Warna emas kalau aktif */
  }

  .switch-wrapper {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* Sedikit di-tweak agar posisinya pas di tengah */
    padding-top: 4px;
    padding-right: 2px;
  }

  /* From Uiverse.io by barisdogansutcu */ 
  .love-heart:before, .lang-input {
    display: none;
  }

  .love-heart, .love-heart::after {
    border-color: ${props => props.isDark ? 'hsl(231deg 15% 40%)' : 'hsl(231deg 28% 70%)'};
    border: 1px solid;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    width: 10px;
    height: 8px;
    border-bottom: 0;
    transition: border-color 0.4s;
  }

  .round {
    position: absolute;
    z-index: 1;
    width: 8px;
    height: 8px;
    background: ${props => props.isDark ? 'hsl(0deg 0% 80%)' : 'hsl(0deg 0% 100%)'};
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 4px 0px;
    border-radius: 100%;
    left: 0px;
    bottom: -1px;
    transition: all .5s ease;
    animation: check-animation2 .5s forwards;
  }

  .lang-input:checked + .love-heart .round {
    transform: translate(0px, 0px);
    animation: check-animation .5s forwards;
    background-color: hsl(0deg 0% 100%);
  }

  @keyframes check-animation {
    0% { transform: translate(0px, 0px); }
    50% { transform: translate(0px, 7px); }
    100% { transform: translate(7px, 7px); }
  }

  @keyframes check-animation2 {
    0% { transform: translate(7px, 7px); }
    50% { transform: translate(0px, 7px); }
    100% { transform: translate(0px, 0px); }
  }

  .love-heart {
    box-sizing: border-box;
    position: relative;
    /* Disesuaikan skala dan transformasinya agar muat di navbar */
    transform: rotate(-45deg) scale(1.6);
    display: block;
    cursor: pointer;
    margin: 0;
  }

  .lang-input:checked + .love-heart, 
  .lang-input:checked + .love-heart::after, 
  .lang-input:checked + .love-heart .bottom {
    /* Merah Hati ketika EN (Checked) */
    border-color: hsl(347deg 81% 61%);
    box-shadow: inset 6px -5px 0px 2px hsl(347deg 99% 72%);
  }

  .love-heart::after, .love-heart .bottom {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-color: ${props => props.isDark ? 'hsl(231deg 15% 40%)' : 'hsl(231deg 28% 70%)'};
    transition: border-color 0.4s;
  }

  .love-heart::after {
    right: -9px;
    transform: rotate(90deg);
    top: 7px;
  }

  .love-heart .bottom {
    width: 11px;
    height: 11px;
    border-left: 1px solid;
    border-bottom: 1px solid;
    left: -1px;
    top: 5px;
    border-radius: 0px 0px 0px 5px;
  }
`;

export default LangSwitch;
