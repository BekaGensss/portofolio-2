import React, { useState } from 'react';
import { PiTerminalWindowBold, PiArrowUpRightBold, PiListBold, PiXBold } from 'react-icons/pi';
import { SECTIONS } from '../data/profile';
import { useActiveSection } from './ui';

const IDS = SECTIONS.map((s) => s.id);

export default function Header({ onOpen }) {
  const active = useActiveSection(IDS);
  const [menu, setMenu] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-obsidian/85 border-b border-alabaster/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#hero" onClick={() => setMenu(false)} className="group flex items-center gap-3 shrink-0" data-cursor="TOP">
          <div className="w-9 h-9 border border-alabaster/25 group-hover:border-acid flex items-center justify-center font-mono text-xs font-semibold tracking-tighter transition">
            BK<span className="text-acid">.</span>
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-wider uppercase block text-alabaster">Bara Kusuma, S.Kom.</span>
            <span className="font-mono text-[10px] text-stone block">NETSEC &amp; INFRASTRUCTURE ENGINEER</span>
          </div>
        </a>

        <nav aria-label="Navigasi utama" className="hidden xl:flex items-center gap-6 font-mono text-xs">
          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-cursor={s.n}
                className={`transition flex items-center gap-1.5 ${on ? 'text-alabaster' : 'text-stone hover:text-acid'}`}
              >
                <span className={on ? 'text-acid' : 'text-acid/70'}>{s.n}/</span>
                <span>{s.nav}</span>
                {on && <span className="w-1.5 h-1.5 bg-acid" />}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onOpen('cli')}
            data-cursor="CLI_SHELL"
            className="px-3.5 py-2.5 bg-obsidian/90 border border-acid/40 text-acid hover:bg-acid hover:text-obsidian font-mono text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2"
          >
            <PiTerminalWindowBold className="text-sm" />
            <span className="hidden sm:inline">CLI TERMINAL</span>
          </button>
          <button
            type="button"
            onClick={() => onOpen('dossier')}
            data-cursor="DOSSIER"
            className="hidden sm:flex px-4 py-2.5 bg-alabaster text-obsidian hover:bg-acid font-mono text-xs font-semibold tracking-wider uppercase transition items-center gap-2"
          >
            <span>OFFICIAL DOSSIER</span>
            <PiArrowUpRightBold />
          </button>
          <button
            type="button"
            aria-label={menu ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
            className="xl:hidden w-10 h-10 border border-alabaster/20 hover:border-acid text-alabaster flex items-center justify-center transition"
          >
            {menu ? <PiXBold /> : <PiListBold />}
          </button>
        </div>
      </div>

      {menu && (
        <nav aria-label="Menu seluler" className="xl:hidden border-t border-alabaster/10 bg-obsidian/95 px-4 sm:px-8 py-4 font-mono text-sm">
          <ul className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {SECTIONS.map((s) => (
              <li key={s.id} className="border-b border-alabaster/10">
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenu(false)}
                  className={`flex items-center justify-between py-3.5 ${active === s.id ? 'text-alabaster' : 'text-stone'}`}
                >
                  <span><span className="text-acid mr-3">{s.n}/</span>{s.label}</span>
                  <PiArrowUpRightBold className="text-acid" />
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => { setMenu(false); onOpen('dossier'); }}
            className="sm:hidden mt-4 w-full px-4 py-3 bg-alabaster text-obsidian font-semibold uppercase tracking-wider text-xs"
          >
            OFFICIAL DOSSIER
          </button>
        </nav>
      )}
    </header>
  );
}
