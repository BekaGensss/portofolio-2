import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position coordinates for the cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the outer ring (slower, smooth lag)
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 220, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 220, mass: 0.8 });

  // Springs for the inner dot (fast, highly responsive)
  const dotX = useSpring(mouseX, { damping: 20, stiffness: 400, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 20, stiffness: 400, mass: 0.2 });

  // Springs for the ambient background glow spotlight (very slow, smooth trail)
  const glowX = useSpring(mouseX, { damping: 50, stiffness: 80 });
  const glowY = useSpring(mouseY, { damping: 50, stiffness: 80 });

  useEffect(() => {
    // Check if the device is a mobile or touch screen to prevent layout issues
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      // Set target coordinates (center the elements by subtracting half their default widths)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.proj-item') ||
        target.closest('.gcard') ||
        target.closest('.cert-card') ||
        target.closest('[role="button"]') ||
        target.style.cursor === 'pointer';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor in CSS on desktop
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, [role="button"], input, textarea, select {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      const styleEl = document.getElementById('custom-cursor-style');
      if (styleEl) styleEl.remove();
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <CursorWrapper theme={theme}>
      {/* 1. Ambient Background Glow (Spotlight) */}
      <motion.div
        className="cursor-glow"
        style={{
          left: glowX,
          top: glowY,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 2. Interactive Outer Ring */}
      <motion.div
        className={`cursor-ring ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
        style={{
          left: ringX,
          top: ringY,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 3. Responsive Inner Dot */}
      <motion.div
        className={`cursor-dot ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
        style={{
          left: dotX,
          top: dotY,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </CursorWrapper>
  );
};

const CursorWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 999999;

  --accent-color: #d4af37; /* Gold accent color */
  --glow-color: ${props => props.theme === 'light' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(212, 175, 55, 0.08)'};

  /* Ambient Cursor Spotlight */
  .cursor-glow {
    position: fixed;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, var(--glow-color) 0%, rgba(212, 175, 55, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    mix-blend-mode: screen;
    will-change: transform;
  }

  /* Custom Outer Ring */
  .cursor-ring {
    position: fixed;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid var(--accent-color);
    pointer-events: none;
    will-change: transform, width, height, background-color, border-color;
    transition: 
      width 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
      height 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
      background-color 0.3s ease, 
      border-color 0.3s ease;
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.2);
  }

  .cursor-ring.hovered {
    width: 64px;
    height: 64px;
    background-color: rgba(212, 175, 55, 0.1);
    border-color: rgba(212, 175, 55, 0.8);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
  }

  .cursor-ring.clicked {
    width: 24px;
    height: 24px;
    background-color: rgba(212, 175, 55, 0.25);
    border-color: var(--accent-color);
  }

  /* Custom Inner Dot */
  .cursor-dot {
    position: fixed;
    width: 6px;
    height: 6px;
    background-color: var(--accent-color);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform, background-color;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .cursor-dot.hovered {
    transform: scale(0); /* Hide or shrink inner dot when hovering to focus on the ring expansion */
  }

  .cursor-dot.clicked {
    transform: scale(0.5);
  }
`;

export default CustomCursor;
