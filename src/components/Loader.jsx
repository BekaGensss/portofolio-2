import React from 'react';
import styled from 'styled-components';

const Loader = ({ theme }) => {
  return (
    <StyledWrapper theme={theme}>
      <div className="circ">
        <div className="load">Loading...</div>
        <div className="hands" />
        <div className="body" />
        <div className="head">
          <div className="eye" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  /* Design Tokens adapting to theme */
  --char-bg: ${props => props.theme === 'light' ? '#111111' : '#eeeeee'};
  --char-highlight: ${props => props.theme === 'light' ? 'rgba(240, 220, 220, 1)' : 'rgba(17, 17, 17, 1)'};
  --eye-color: ${props => props.theme === 'light' ? 'rgba(240, 220, 220, 1)' : 'rgba(17, 17, 17, 1)'};
  --text-color: ${props => props.theme === 'light' ? 'rgb(120, 120, 120)' : 'rgb(180, 180, 180)'};

  .circ {
    backface-visibility: hidden;
    margin: 60px auto;
    width: 180px;
    height: 180px;
    border-radius: 0px 0px 50px 50px;
    position: relative;
    z-index: 1;
    left: 0%;
    top: 0%;
    overflow: hidden;
  }

  .eye {
    width: 20px;
    height: 8px;
    background-color: var(--eye-color);
    border-radius: 0px 0px 20px 20px;
    position: relative;
    left: 10px;
    top: 40px;
    box-shadow: 40px 0px 0px 0px var(--eye-color);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .head {
    backface-visibility: hidden;
    position: relative;
    margin: -250px auto;
    width: 80px;
    height: 80px;
    background-color: var(--char-bg);
    border-radius: 50px;
    box-shadow: inset -4px 2px 0px 0px var(--char-highlight);
    animation: headAnim 1.5s infinite alternate;
    animation-timing-function: ease-out;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .body {
    position: relative;
    margin: 90px auto;
    width: 140px;
    height: 120px;
    background-color: var(--char-bg);
    border-radius: 50px/25px;
    box-shadow: inset -5px 2px 0px 0px var(--char-highlight);
    animation: bodyAnim 1.5s infinite alternate;
    animation-timing-function: ease-out;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  @keyframes headAnim {
    0% {
      top: 0px;
    }
    50% {
      top: 10px;
    }
    100% {
      top: 0px;
    }
  }

  @keyframes bodyAnim {
    0% {
      top: -5px;
    }
    50% {
      top: 10px;
    }
    100% {
      top: -5px;
    }
  }

  .hands {
    margin-top: 140px;
    width: 120px;
    height: 120px;
    position: absolute;
    background-color: var(--char-bg);
    border-radius: 20px;
    box-shadow: -1px -4px 0px 0px var(--char-highlight);
    transform: rotate(45deg);
    top: 75%;
    left: 16%;
    z-index: 2;
    animation: bodyAnim 1.5s infinite alternate;
    animation-timing-function: ease-out;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .load {
    position: absolute;
    width: 7ch;
    height: 32px;
    text-align: left;
    line-height: 32px;
    margin: -10px auto;
    font-family: 'Julius Sans One', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-color);
    left: 12%;
    top: 5%;
    animation: fontAnim 3.75s infinite;
    animation-timing-function: ease-out;
    word-wrap: break-word;
    display: block;
    overflow: hidden;
    letter-spacing: 2px;
    transition: color 0.3s ease;
  }

  @keyframes fontAnim {
    0% {
      width: 7ch;
    }
    16% {
      width: 8ch;
    }
    32% {
      width: 9ch;
    }
    48% {
      width: 10ch;
    }
    64% {
      width: 11ch;
    }
    80% {
      width: 12ch;
    }
    100% {
      width: 13ch;
    }
  }
`;

export default Loader;
