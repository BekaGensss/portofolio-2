import { useEffect } from 'react';

/*
 * Kursor ringan, tanpa bentuk bulat.
 *  - Bentuk kursor adalah gambar SVG lewat CSS `cursor: url(...)`: digambar langsung
 *    oleh browser, tanpa JavaScript per frame, sehingga tidak ada lag sama sekali.
 *  - Label kecil (kotak) muncul di elemen ber-atribut data-cursor.
 *  - Efek klik: dua kotak berputar 45 derajat yang mengembang lalu hilang (CSS animation).
 *  - Hanya aktif pada perangkat dengan mouse.
 */

const svg = (body) =>
  'url("data:image/svg+xml,' +
  encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'>${body}</svg>`) +
  '")';

const OUTLINE = "stroke='#070709' stroke-opacity='.8' stroke-width='3.4' stroke-linecap='square' stroke-linejoin='miter'";
const LINE = "stroke='#E2F163' stroke-width='1.6' stroke-linecap='square' stroke-linejoin='miter'";

const DEFAULT_CURSOR = svg(`
  <path ${OUTLINE} d='M14 3v7M14 18v7M3 14h7M18 14h7'/>
  <path ${LINE} d='M14 3v7M14 18v7M3 14h7M18 14h7'/>
  <rect x='12.5' y='12.5' width='3' height='3' fill='#E2F163' stroke='#070709' stroke-opacity='.8' stroke-width='.8'/>
`);

const HOVER_CURSOR = svg(`
  <path ${OUTLINE} d='M4 10V4h6M18 4h6v6M24 18v6h-6M10 24H4v-6'/>
  <path ${LINE} d='M4 10V4h6M18 4h6v6M24 18v6h-6M10 24H4v-6'/>
  <rect x='12' y='12' width='4' height='4' fill='#E2F163' stroke='#070709' stroke-opacity='.8' stroke-width='.8'/>
`);

const CSS = `
@media (hover: hover) and (pointer: fine) {
  html, body { cursor: ${DEFAULT_CURSOR} 14 14, crosshair; }
  a, button, [role="button"], summary, label[for], select, [data-cursor] {
    cursor: ${HOVER_CURSOR} 14 14, pointer;
  }
  input, textarea { cursor: text; }
}
.cursor-tag {
  position: fixed; top: 0; left: 0; z-index: 999998; pointer-events: none;
  padding: 4px 8px; background: #E2F163; color: #070709;
  font: 600 10px/1 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: .1em; text-transform: uppercase; white-space: nowrap;
  opacity: 0; transition: opacity .15s ease; will-change: transform;
}
.cursor-tag.on { opacity: 1; }
.click-mark {
  position: fixed; z-index: 999999; width: 46px; height: 46px; margin: -23px 0 0 -23px;
  border: 1.5px solid #E2F163; pointer-events: none; opacity: 0;
  transform: rotate(45deg) scale(.2);
  animation: clickMark .55s cubic-bezier(.16,1,.3,1) forwards; will-change: transform, opacity;
}
.click-mark::after { content: ''; position: absolute; inset: 12px; border: 1px solid #E2F163; opacity: .6; }
@keyframes clickMark {
  0%   { opacity: .95; transform: rotate(45deg) scale(.2); }
  100% { opacity: 0;   transform: rotate(45deg) scale(1.7); }
}
@media (prefers-reduced-motion: reduce) { .click-mark { animation-duration: .01s; } }
`;

export default function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const tag = document.createElement('div');
    tag.className = 'cursor-tag';
    tag.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tag);

    let x = 0;
    let y = 0;
    let raf = 0;
    let visible = false;
    let marks = 0;

    const place = () => {
      raf = 0;
      tag.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`;
    };
    const hide = () => {
      visible = false;
      tag.classList.remove('on');
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (visible && !raf) raf = requestAnimationFrame(place);
    };
    const onOver = (e) => {
      const t = e.target && e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (!t) {
        if (visible) hide();
        return;
      }
      tag.textContent = t.getAttribute('data-cursor');
      x = e.clientX;
      y = e.clientY;
      visible = true;
      place();
      tag.classList.add('on');
    };
    const onDown = (e) => {
      if (e.button !== 0 || marks > 5) return;
      if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;
      const m = document.createElement('div');
      m.className = 'click-mark';
      m.style.left = `${e.clientX}px`;
      m.style.top = `${e.clientY}px`;
      m.addEventListener('animationend', () => {
        m.remove();
        marks -= 1;
      }, { once: true });
      marks += 1;
      document.body.appendChild(m);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('mouseleave', hide);
      if (raf) cancelAnimationFrame(raf);
      style.remove();
      tag.remove();
      document.querySelectorAll('.click-mark').forEach((n) => n.remove());
    };
  }, []);

  return null;
}
