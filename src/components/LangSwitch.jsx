import React from 'react';
import styled from 'styled-components';

const LangSwitch = ({ lang, toggleLang }) => {
  return (
    <StyledWrapper>
      <label className="switch-food" title={lang === 'EN' ? 'Switch to Indonesian' : 'Switch to English'}>
        <input 
          type="checkbox" 
          className="switch-input" 
          checked={lang === 'EN'} 
          onChange={toggleLang} 
        />
        <div className="switch-track">
          <div className="switch-knob">
            <div className="burger-container">
              <div className="bun-top"><div className="seeds" /></div>
              <div className="lettuce" />
              <div className="patty" />
              <div className="bun-bottom" />
            </div>
            <div className="fries-container">
              <div className="fry-box">
                <div className="fry f1" />
                <div className="fry f2" />
                <div className="fry f3" />
                <div className="fry f4" />
                <div className="fry f5" />
                <div className="fry f6" />
                <div className="fry f7" />
                <div className="box-face front" />
                <div className="box-face back" />
                <div className="box-face right" />
                <div className="box-face left" />
                <div className="box-face bottom" />
              </div>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 24px;
  
  /* --- MAIN SWITCH CONTAINER --- */
  .switch-food {
    --w: 120px;
    --h: 60px;
    --knob-size: 50px;
    --offset: 5px;
    --bg-burger: #ffecd2;
    --bg-fries: #fff5e6;

    position: relative;
    display: inline-block;
    width: var(--w);
    height: var(--h);
    cursor: pointer;
    
    /* Scale the 120x60 component down to 48x24 */
    transform: scale(0.4);
    transform-origin: center;
  }

  .switch-input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  /* The Background Track */
  .switch-track {
    position: absolute;
    inset: 0;
    background-color: var(--bg-burger);
    border: 3px solid #333;
    border-radius: 60px;
    transition: background-color 0.4s;
    overflow: hidden;
  }

  /* The Moving Knob Wrapper */
  .switch-knob {
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    width: var(--knob-size);
    height: var(--knob-size);
    transition: transform 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ===========================
     1. THE BURGER (2D DOODLE)
     =========================== */
  .burger-container {
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.4s ease,
      opacity 0.3s ease;
    z-index: 2;
  }

  .bun-top {
    width: 36px;
    height: 16px;
    background: #ffa64d;
    border: 2px solid #333;
    border-bottom: none;
    border-radius: 20px 20px 0 0;
    position: relative;
    z-index: 4;
  }
  .seeds {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #333;
    top: 6px;
    left: 10px;
    box-shadow:
      12px 0 #333,
      6px 4px #333;
    border-radius: 50%;
  }
  .lettuce {
    width: 40px;
    height: 6px;
    background: #8cd65e;
    border: 2px solid #333;
    border-radius: 10px;
    margin-top: -2px;
    z-index: 3;
  }
  .patty {
    width: 36px;
    height: 8px;
    background: #8b4513;
    border: 2px solid #333;
    border-radius: 4px;
    margin-top: -2px;
    z-index: 2;
  }
  .bun-bottom {
    width: 36px;
    height: 10px;
    background: #ffa64d;
    border: 2px solid #333;
    border-radius: 0 0 10px 10px;
    margin-top: -2px;
    z-index: 1;
  }

  /* ===========================
     2. THE FRIES (3D)
     =========================== */
  .fries-container {
    position: absolute;
    width: 40px;
    height: 40px;
    perspective: 600px;
    opacity: 0;
    transform: scale(0);
    transition:
      transform 0.4s ease,
      opacity 0.3s ease;
    z-index: 1;
  }

  .fry-box {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-20deg) rotateY(30deg);
  }

  /* The Red Box Faces */
  .box-face {
    position: absolute;
    border: 2px solid #333;
    background: #ff4757;
    backface-visibility: visible;
  }
  .box-face.front {
    width: 30px;
    height: 35px;
    transform: translateZ(15px);
    left: 5px;
    top: 5px;
  }
  .box-face.back {
    width: 30px;
    height: 35px;
    transform: rotateY(180deg) translateZ(15px);
    left: 5px;
    top: 5px;
  }
  .box-face.right {
    width: 30px;
    height: 35px;
    transform: rotateY(90deg) translateZ(15px);
    left: 5px;
    top: 5px;
  }
  .box-face.left {
    width: 30px;
    height: 35px;
    transform: rotateY(-90deg) translateZ(15px);
    left: 5px;
    top: 5px;
  }
  .box-face.bottom {
    width: 30px;
    height: 30px;
    transform: rotateX(-90deg) translateZ(30px);
    left: 5px;
  }

  /* The Yellow Fries sticking out */
  .fry {
    position: absolute;
    width: 6px;
    height: 25px;
    background: #ffd32a;
    border: 2px solid #333;
    top: -10px;
    transform-origin: bottom;
    border-radius: 2px;
  }

  /* Positioning all the fries (Scatter them in 3D) */
  /* Front Left */
  .fry.f1 {
    left: 8px;
    transform: translateZ(10px) rotateZ(-10deg);
  }
  /* Center Tall */
  .fry.f2 {
    left: 16px;
    transform: translateZ(5px) rotateZ(0deg);
    height: 32px;
    top: -17px;
  }
  /* Back Center */
  .fry.f3 {
    left: 12px;
    transform: translateZ(-5px) rotateZ(8deg);
  }
  /* Front Right */
  .fry.f4 {
    left: 22px;
    transform: translateZ(10px) rotateZ(10deg);
    height: 20px;
  }
  /* Back Left */
  .fry.f5 {
    left: 8px;
    transform: translateZ(-8px) rotateZ(-15deg);
    height: 28px;
    top: -12px;
  }
  /* Middle Right */
  .fry.f6 {
    left: 24px;
    transform: translateZ(0px) rotateZ(5deg);
    height: 24px;
  }
  /* Middle Center */
  .fry.f7 {
    left: 14px;
    transform: translateZ(12px) rotateZ(-5deg);
    height: 26px;
    top: -8px;
  }

  /* ===========================
     ANIMATIONS
     =========================== */

  .switch-input:checked ~ .switch-track .switch-knob {
    transform: translateX(
      calc(var(--w) - var(--knob-size) - (var(--offset) * 2))
    );
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .switch-input:checked ~ .switch-track .burger-container {
    opacity: 0;
    transform: scale(0) rotate(-90deg);
  }

  .switch-input:checked ~ .switch-track .fries-container {
    opacity: 1;
    transform: scale(1);
  }

  .switch-input:checked ~ .switch-track .fry-box {
    animation: spinFries 3s infinite linear;
  }

  .switch-input:checked ~ .switch-track {
    background-color: var(--bg-fries);
  }

  @keyframes spinFries {
    0% {
      transform: rotateX(-20deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(-20deg) rotateY(360deg);
    }
  }
`;

export default LangSwitch;
