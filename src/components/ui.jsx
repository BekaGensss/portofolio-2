import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { sceneStore } from '../sceneStore';

/* ------------------------------------------------------------------ */
/*  Reveal saat scroll (satu IntersectionObserver bersama)              */
/* ------------------------------------------------------------------ */
let sharedObserver;
const getObserver = () => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            sharedObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
  }
  return sharedObserver;
};

export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return undefined;
    }
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Tipografi & elemen kecil                                            */
/* ------------------------------------------------------------------ */
export const Ital = ({ children }) => (
  <span className="font-serif italic font-normal text-acid lowercase">{children}</span>
);

export function SectionHead({ index, label, title, aside }) {
  return (
    <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-alabaster/10">
      <div>
        <div className="font-mono text-xs text-acid uppercase tracking-widest mb-3">
          [{index} // {label}]
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-alabaster">{title}</h2>
      </div>
      {aside}
    </Reveal>
  );
}

export const Chip = ({ children, accent }) => (
  <span
    className={`inline-block px-2.5 py-1 font-mono text-[11px] border ${
      accent ? 'bg-acid/10 text-acid border-acid/30' : 'bg-alabaster/5 text-alabaster/80 border-alabaster/10'
    }`}
  >
    {children}
  </span>
);

/* Penanda teks: **tebal** dan ^^aksen^^ */
export function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\^\^[^^]+\^\^)/g).map((p, i) => {
    if (p.startsWith('**')) return <strong key={i} className="text-alabaster font-semibold">{p.slice(2, -2)}</strong>;
    if (p.startsWith('^^')) return <strong key={i} className="text-acid font-semibold">{p.slice(2, -2)}</strong>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

export function CountUp({ to, decimals = 0, pad = 0, duration = 1300 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fmt = (v) => (pad ? String(Math.round(v)).padStart(pad, '0') : v.toFixed(decimals));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.textContent = fmt(to);
      return undefined;
    }
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, decimals, pad, duration]);
  return <span ref={ref} />;
}

/* ------------------------------------------------------------------ */
/*  Kartu miring dengan kilau (mouse saja)                              */
/* ------------------------------------------------------------------ */
export function Tilt({ as: Tag = 'div', className = '', max = 6, children, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const { clientX, clientY } = e;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      const nx = (x / r.width) * 2 - 1;
      const ny = (y / r.height) * 2 - 1;
      el.style.transform = `perspective(1100px) rotateX(${(-ny * max).toFixed(2)}deg) rotateY(${(nx * max).toFixed(2)}deg) scale3d(1.012,1.012,1.012)`;
      el.style.setProperty('--gx', `${((x / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${((y / r.height) * 100).toFixed(1)}%`);
      el.style.setProperty('--px', `${(-nx * 6).toFixed(1)}px`);
      el.style.setProperty('--py', `${(-ny * 6).toFixed(1)}px`);
    });
  };

  const onLeave = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.setProperty('--px', '0px');
    el.style.setProperty('--py', '0px');
  };

  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), []);

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      <div className="glare" aria-hidden="true" />
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Section aktif (untuk navigasi & HUD)                                */
/* ------------------------------------------------------------------ */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ */
/*  Toast + salin ke clipboard                                          */
/* ------------------------------------------------------------------ */
const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef(0);
  const toast = useCallback((m) => {
    setMsg(m);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2600);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-16 right-6 z-[60] pointer-events-none bg-acid text-obsidian px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-xl transition-all duration-300 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }
}

/* ------------------------------------------------------------------ */
/*  Modal (aksesibel: Esc, focus trap, kunci scroll, jeda 3D)           */
/* ------------------------------------------------------------------ */
export function Modal({ onClose, label, maxWidth = 'max-w-3xl', panelClass = '', children }) {
  const panel = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement;
    document.documentElement.classList.add('modal-open');
    sceneStore.set({ paused: true });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const f = panel.current.querySelectorAll('a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => {
      const el = (panel.current && panel.current.querySelector('[data-autofocus]')) || panel.current;
      if (el && el.focus) el.focus({ preventScroll: true });
    }, 40);

    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('modal-open');
      sceneStore.set({ paused: false });
      if (previous && previous.focus) previous.focus({ preventScroll: true });
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeRef.current();
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`modal-in relative w-full ${maxWidth} bg-charcoal border border-alabaster/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col outline-none ${panelClass}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalBar({ title, onClose, closeLabel = 'ESC / CLOSE [X]' }) {
  return (
    <div className="px-5 sm:px-6 py-4 bg-obsidian border-b border-alabaster/15 flex items-center justify-between gap-4 font-mono text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-2 h-2 bg-acid shrink-0" />
        <span className="text-acid font-semibold truncate">{title}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        data-cursor="CLOSE"
        className="px-3 py-1 bg-alabaster/10 hover:bg-acid hover:text-obsidian text-alabaster transition uppercase shrink-0"
      >
        {closeLabel}
      </button>
    </div>
  );
}
