import React from 'react';
import { PiArrowUpRightBold } from 'react-icons/pi';
import { WORKS } from '../data/profile';
import { Chip, Ital, Reveal, SectionHead, Tilt } from './ui';

export default function Works({ onOpen }) {
  return (
    <section id="works" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-32 space-y-16">
      <SectionHead
        index="03"
        label="SELECTED ENGINEERING WORKS"
        title={<>SYSTEMS, <Ital>topologies</Ital> &amp; CODE.</>}
        aside={
          <p className="font-mono text-xs text-stone max-w-md leading-relaxed">
            Arahkan kursor pada kartu untuk merasakan respons perspektif 3D. Klik studi kasus untuk membaca spesifikasi teknis dan arsitektur sistem.
          </p>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {WORKS.map((w, i) => (
          <Reveal key={w.id} delay={(i % 2) * 110} className="h-full">
            <Tilt
              as="button"
              type="button"
              onClick={() => onOpen('work', w.id)}
              data-cursor="INSPECT"
              className="block w-full h-full text-left p-8 sm:p-10 group"
            >
              <div className="parallax h-full flex flex-col justify-between gap-8 min-h-[280px]">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 font-mono text-xs border-b border-alabaster/10 pb-4">
                    <span className="text-acid font-semibold">[{w.index} // {w.tag}]</span>
                    <span className="text-stone shrink-0">{w.year}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] text-stone uppercase">{w.org}</div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-alabaster group-hover:text-acid transition leading-tight">
                      {w.title}
                    </h3>
                  </div>
                  <p className="text-sm text-stone leading-relaxed">{w.summary}</p>
                </div>
                <div className="pt-6 border-t border-alabaster/10 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {w.stack.slice(0, 3).map((s) => <Chip key={s}>{s}</Chip>)}
                  </div>
                  <span className="font-mono text-xs text-acid flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition">
                    <span>READ SPEC</span>
                    <PiArrowUpRightBold />
                  </span>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
