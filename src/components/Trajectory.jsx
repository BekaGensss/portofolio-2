import React from 'react';
import { IMPACT, TRAJECTORY, hasImpact } from '../data/profile';
import { Chip, Ital, Reveal, Rich, SectionHead } from './ui';

export default function Trajectory({ onOpen }) {
  return (
    <section id="trajectory" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-32 space-y-16">
      <SectionHead
        index="06"
        label="CHRONOLOGY & PEDIGREE"
        title={<>FIELD <Ital>experience</Ital> &amp; ACADEMIA.</>}
        aside={
          <div className="font-mono text-xs text-stone">
            TOTAL MILESTONES: {String(TRAJECTORY.length).padStart(2, '0')} RECORDS
          </div>
        }
      />

      <div className="divide-y divide-alabaster/10 border-b border-alabaster/10">
        {TRAJECTORY.map((r) => {
          const chips = r.id === 'pos' && hasImpact()
            ? [...(r.chips || []), `MTTR ${IMPACT.mttr.toUpperCase()}`, `${IMPACT.endpoints} ENDPOINTS`, `${IMPACT.uptime} UPTIME`]
            : r.chips;
          return (
            <Reveal
              key={r.id}
              className="group py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start hover:bg-alabaster/[0.02] px-4 transition-colors"
            >
              <div className={`lg:col-span-2 font-mono text-xs ${r.accent ? 'text-acid' : 'text-stone'}`}>
                {r.period}
                <span className="block text-[10px] text-stone mt-1">{r.kind}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="font-display font-bold text-xl text-alabaster group-hover:text-acid transition">{r.title}</h3>
                <p className="font-mono text-xs text-stone mt-1">{r.org}</p>
              </div>
              <div className="lg:col-span-4 text-sm text-stone leading-relaxed space-y-3">
                <p><Rich text={r.desc} /></p>
                {chips && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {chips.map((c, i) => <Chip key={c} accent={i === 0}>{c}</Chip>)}
                  </div>
                )}
              </div>
              <div className="lg:col-span-2 lg:text-right font-mono text-xs text-stone">
                {r.action ? (
                  <button
                    type="button"
                    onClick={() => onOpen(r.action.type, r.action.id)}
                    data-cursor="OPEN"
                    className="px-3 py-1.5 border border-alabaster/20 hover:border-acid text-alabaster hover:text-acid transition"
                  >
                    {r.action.label}
                  </button>
                ) : (
                  r.place
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
