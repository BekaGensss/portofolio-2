import React from 'react';
import { TICKER } from '../data/profile';

const Group = ({ hidden }) => (
  <div className="flex items-center gap-10 pr-10 shrink-0" aria-hidden={hidden || undefined}>
    {TICKER.map((t) => (
      <React.Fragment key={t}>
        <span>{t}</span>
        <span className="text-acid">✦</span>
      </React.Fragment>
    ))}
  </div>
);

export default function Ticker() {
  return (
    <div
      role="marquee"
      aria-label="Ringkasan kredensial"
      className="py-5 border-y border-alabaster/10 bg-obsidian/80 overflow-hidden"
    >
      <div className="marquee-track font-mono text-xs tracking-widest uppercase text-stone">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
