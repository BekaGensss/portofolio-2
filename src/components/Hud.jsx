import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { SECTIONS } from '../data/profile';
import { sceneStore } from '../sceneStore';
import { useActiveSection } from './ui';

const IDS = SECTIONS.map((s) => s.id);

const MODES = [
  { key: 'auto', label: 'AUTO' },
  { key: 'mesh', label: 'MESH' },
  { key: 'layers', label: 'LAYERS' },
];
const POWER_NEXT = { on: 'eco', eco: 'off', off: 'on' };

export default function Hud() {
  const snap = useSyncExternalStore(sceneStore.subscribe, sceneStore.get);
  const active = useActiveSection(IDS);
  const depthRef = useRef(null);
  const clockRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
      if (depthRef.current) depthRef.current.textContent = `SCROLL_DEPTH: ${String(pct).padStart(3, '0')}%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = `WIB ${new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta', hour12: false })}`;
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(iv);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const section = SECTIONS.find((s) => s.id === active) || SECTIONS[0];
  const noGl = snap.webgl === 'none';
  const status = noGl ? '3D // TIDAK TERSEDIA' : snap.power === 'off' ? '3D // OFF' : snap.power === 'eco' ? '3D // ECO MODE' : '3D ENGINE // AKTIF';

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 hidden sm:flex items-center justify-between gap-4 text-[11px] font-mono text-stone/80 px-4 py-2 rounded-full bg-obsidian/85 border border-alabaster/10">
      <div className="flex items-center gap-4 min-w-0">
        <span className="flex items-center gap-2 text-alabaster shrink-0">
          <span className={`w-2 h-2 rounded-full ${noGl || snap.power === 'off' ? 'bg-stone' : 'bg-acid animate-pulse'}`} />
          <span>{status}</span>
        </span>
        <span className="text-stone/40 hidden md:inline">|</span>
        <span className="hidden md:inline truncate">SECTION: <span className="text-alabaster">{section.n} {section.label}</span></span>
        <span className="text-stone/40 hidden lg:inline">|</span>
        <span ref={depthRef} className="hidden lg:inline shrink-0">SCROLL_DEPTH: 000%</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-stone mr-1 hidden md:inline">3D Field:</span>
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={snap.mode === m.key}
            onClick={() => sceneStore.set({ mode: m.key })}
            disabled={noGl}
            className={`px-2.5 py-0.5 rounded-full transition ${
              snap.mode === m.key ? 'bg-acid text-obsidian font-semibold' : 'hover:bg-alabaster/10 text-alabaster/70'
            } disabled:opacity-40`}
          >
            {m.label}
          </button>
        ))}
        <span className="text-stone/40 mx-1">|</span>
        <button
          type="button"
          onClick={() => sceneStore.set({ power: POWER_NEXT[snap.power] })}
          disabled={noGl}
          aria-label="Ubah mode performa 3D"
          className="px-2.5 py-0.5 rounded-full border border-acid/40 text-acid hover:bg-acid hover:text-obsidian transition disabled:opacity-40"
        >
          3D: {snap.power.toUpperCase()}
        </button>
      </div>

      <div className="hidden xl:flex items-center gap-3 shrink-0">
        <span>JAKARTA, ID (6.1751° S, 106.8650° E)</span>
        <span ref={clockRef} className="text-acid">WIB --:--:--</span>
      </div>
    </div>
  );
}
