import React from 'react';
import styled from 'styled-components';

const ThemeSwitch = ({ isDark, toggleTheme }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={!isDark} onChange={toggleTheme} />
        <span className="thumb">
          <div className="cranium" />
          <div className="mouth" />
        </span>
        <span className="arm-wrapper">
          <span className="arm">
            <span className="bone" />
            <span className="bone" />
            <span className="hand">
              <span className="bone" />
              <span className="bone" />
              <span className="bone" />
              <span className="bone" />
            </span>
            <span className="big" />
          </span>
        </span>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .switch {
    font-size: clamp(1.8px, 0.5vw, 2.4px); /* Controls scale: ~36px to 48px width */
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20em;
    height: 10em;
    background: #141414;
    border-radius: 5em;
    overflow: hidden;
    box-shadow:
      0 0 0.1em 0.1em #000000,
      0 0 0.5em 0.1em #0b0b10 inset;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .switch input {
    display: none;
  }

  .thumb {
    position: absolute;
    width: 8.75em;
    height: 8.75em;
    top: 0.6em;
    left: calc(100% - 9.333em);
    border-radius: 5em;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    animation: move-skull-left 0.5s ease-in-out 0.5s forwards;
  }

  .switch input:checked ~ .thumb {
    left: 0.6em;
    animation: move-skull-right 0.5s ease-in-out 0.5s forwards;
  }

  @keyframes move-skull-right {
    0% {
      left: 0.6em;
    }
    100% {
      left: calc(100% - 9.333em);
    }
  }

  @keyframes move-skull-left {
    0% {
      left: calc(100% - 9.333em);
    }
    100% {
      left: 0.6em;
    }
  }

  /*** Skull ***/

  .thumb > * {
    position: absolute;
    filter: drop-shadow(0px 1px 1px #000);
    animation: unselected 1.5s ease-in-out 0s reverse forwards;
  }

  .switch input:checked ~ .thumb * {
    animation: selected 1.5s ease-in-out 0s forwards;
  }

  @keyframes selected {
    0%,
    50% {
      filter: drop-shadow(0px 1px 1px #000) brightness(1);
    }
    50.01%,
    100% {
      filter: drop-shadow(0px 1px 1px #000) brightness(1.875);
    }
  }

  @keyframes unselected {
    0%,
    50% {
      filter: drop-shadow(0px 1px 1px #000) brightness(1);
    }
    50.01%,
    100% {
      filter: drop-shadow(0px 1px 1px #000) brightness(1.875);
    }
  }

  .cranium {
    background: linear-gradient(180deg, #888 0 54%, #fff0 0 94%, #888 0 100%),
      radial-gradient(
        circle at 75% 69%,
        #fff0 0 0.875em,
        #888 calc(0.875em + 1px) 2.425em,
        #fff0 calc(2.425em + 1px) 100%
      ),
      radial-gradient(
        circle at 25% 69%,
        #fff0 0 0.875em,
        #888 calc(0.875em + 1px) 2.425em,
        #fff0 calc(2.425em + 1px) 100%
      );
    width: 100%;
    height: 7em;
    left: 0;
    top: 0;
    border-radius: 5em 5em 2.75em 2.75em;
  }

  .cranium:before {
    content: "";
    position: absolute;
    width: 0.625em;
    height: 0.625em;
    bottom: -0.375em;
    left: 3.75em;
    background: #888;
    border-radius: 100%;
    box-shadow: 0.625em 0 0 0 #888;
  }

  .cranium:after {
    content: "";
    position: absolute;
    width: 2.625em;
    height: 0.75em;
    bottom: -0.475em;
    left: 3em;
    background: radial-gradient(
        circle at 90% 10%,
        #888 0 0.5em,
        #fff0 calc(0.5em + 1px) 100%
      ),
      radial-gradient(
        circle at 10% 10%,
        #888 0 0.5em,
        #fff0 calc(0.5em + 1px) 100%
      );
    border-radius: 0.5em;
  }

  .mouth {
    border: 0.425em solid #fff0;
    border-bottom-color: #888;
    width: 5.875em;
    left: 1.425em;
    height: 3em;
    top: 5.625em;
    background: radial-gradient(
        circle at 35% 98%,
        #888 0 0.325em,
        #fff0 calc(0.325em + 1px) 100%
      ),
      radial-gradient(
        circle at 45% 100%,
        #888 0 0.325em,
        #fff0 calc(0.325em + 1px) 100%
      ),
      radial-gradient(
        circle at 55% 100%,
        #888 0 0.325em,
        #fff0 calc(0.325em + 1px) 100%
      ),
      radial-gradient(
        circle at 65% 98%,
        #888 0 0.325em,
        #fff0 calc(0.325em + 1px) 100%
      );
    background-repeat: no-repeat;
    border-radius: 100%;
  }

  .mouth:before,
  .mouth:after {
    content: "";
    position: absolute;
    border-radius: 100%;
    background: #888;
    width: 0.35em;
    height: 0.35em;
    left: 0.2em;
    bottom: 0.125em;
  }

  .mouth:after {
    left: 4.525em;
  }

  /*** Arm ***/

  @keyframes check-on {
    0% {
      right: -65%;
    }
    25%,
    33% {
      right: 0%;
    }
    66%,
    80% {
      right: -50%;
    }
    100% {
      right: -65%;
    }
  }

  @keyframes check-off {
    0% {
      right: -65%;
    }
    25%,
    33% {
      right: 0%;
    }
    66%,
    80% {
      right: -50%;
    }
    100% {
      right: -65%;
    }
  }

  .arm-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5em;
    overflow: hidden;
    right: -65%;
    animation: check-off 1.5s ease-in-out 0s reverse forwards;
  }

  .switch input:checked ~ .arm-wrapper {
    animation: check-on 1.5s ease-in-out 0s forwards;
  }

  .arm {
    position: absolute;
    width: 8em;
    height: 2.5em;
    right: 2%;
    top: calc(50% - 1.25em);
    border-radius: 0.125em;
  }

  .bone {
    background: #fff;
    width: 4em;
    height: 1em;
    position: absolute;
    transform: rotate(0deg);
    top: 0.75em;
    right: -2em;
  }

  .bone:before,
  .bone:after,
  .big:before,
  .big:after {
    content: "";
    background: #fff;
    width: 0.75em;
    height: 0.75em;
    position: absolute;
    left: -0.25em;
    top: -0.25em;
    border-radius: 100%;
    box-shadow: 4em 0 0 0 #fff;
  }

  .bone:after {
    top: calc(100% - 0.5em);
  }

  .arm > .bone + .bone {
    top: 0.75em;
    left: 0.25em;
    height: 0.425em;
    width: 5.25em;
    box-shadow: 0 0.575em 0 0 #fff;
  }
  .arm > .bone + .bone:before,
  .arm > .bone + .bone:after {
    box-shadow: 5.075em 0 0 0 #fff;
  }

  .arm > .bone + .bone:after {
    top: 100%;
  }

  /*** Hand ***/

  .hand {
    position: absolute;
    background: radial-gradient(
        circle at 91% 29%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      ),
      radial-gradient(
        circle at 92% 49%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      ),
      radial-gradient(
        circle at 91% 69%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      ),
      radial-gradient(
        circle at 76% 21%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      ),
      radial-gradient(
        circle at 78% 39%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      ),
      radial-gradient(
        circle at 79% 58%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      ),
      radial-gradient(
        circle at 78% 78%,
        #fff 0.25em,
        #fff0 calc(0.25em + 1px) 100%
      );
    width: 3.5em;
    height: 2.5em;
    left: -3.5em;
    z-index: 0;
  }

  .hand .bone,
  .big {
    width: 1.5em;
    left: 0.675em;
    height: 0.375em;
    border-radius: 0.25em 0 0 0.25em;
  }

  .hand .bone:before,
  .hand .bone:after,
  .big:before,
  .big:after {
    width: 0.4em;
    height: 0.4em;
    top: -0.125em;
    left: 1.125em;
    box-shadow: none;
  }
  .hand .bone:after,
  .big:after {
    top: 0.0625em;
  }

  .hand .bone:nth-child(1) {
    transform: rotate(5deg) translateY(-0.5em) translateX(0.075em);
    filter: drop-shadow(-1.5em 0em 0px #fff);
  }

  .hand .bone:nth-child(2) {
    transform: rotate(0deg) translateX(0.25em);
    filter: drop-shadow(-1.5em 0em 0px #fff);
  }

  .hand .bone:nth-child(3) {
    transform: rotate(-2deg) translateY(0.575em) translateX(0.25em);
    filter: drop-shadow(-1.5em 0em 0px #fff);
  }

  .hand .bone:nth-child(4) {
    transform: rotate(-5deg) translateY(1.15em) translateX(0.25em);
    filter: drop-shadow(-1.5em 0em 0px #fff);
  }

  .big {
    background: #fff;
    height: 0.5em !important;
    position: absolute;
    left: -2.125em !important;
    top: 0.575em;
    z-index: 1;
    filter: drop-shadow(-1.25em 0em 0px #fff) drop-shadow(0 0 1px #000);
  }`;

export default ThemeSwitch;
