import React from 'react';
import { PiArrowUpRightBold } from 'react-icons/pi';
import { FEATURED, PROFILE, REPOS } from '../data/profile';
import { Chip, Ital, Reveal, SectionHead, Tilt } from './ui';

export default function Repos() {
  return (
    <section id="repos" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-32 space-y-16">
      <SectionHead
        index="04"
        label="REPOSITORIES"
        title={<>BUILDS, <Ital>open</Ital> &amp; SHIPPED.</>}
        aside={
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="font-mono text-xs text-acid inline-flex items-center gap-2 link-line w-fit"
          >
            GITHUB // @BEKAGENSSS <PiArrowUpRightBold />
          </a>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED.map((p, i) => (
          <Reveal key={p.id} delay={i * 110} className="h-full">
            <Tilt
              as="a"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="VIEW CODE"
              max={4}
              className="block h-full group"
            >
              <div className="parallax flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-alabaster/10 bg-obsidian">
                  <img
                    src={p.images[0]}
                    alt={`Tangkapan layar ${p.title}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-80 group-hover:opacity-0 transition-opacity duration-500"
                  />
                  <img
                    src={p.images[1]}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold text-obsidian bg-acid px-2 py-0.5">{p.n}</span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="font-mono text-[11px] text-stone uppercase tracking-widest">{p.kind}</div>
                  <h3 className="font-display font-bold text-xl text-alabaster group-hover:text-acid transition">{p.title}</h3>
                  <p className="text-sm text-stone leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.tags.map((t) => <Chip key={t}>{t}</Chip>)}
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>

      <div className="border-t border-alabaster/10">
        <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 font-mono text-[11px] uppercase tracking-widest text-stone border-b border-alabaster/10">
          <span className="col-span-4">REPOSITORY</span>
          <span className="col-span-6">DESKRIPSI</span>
          <span className="col-span-2 text-right">BAHASA</span>
        </div>
        {REPOS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 4) * 50}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-4 border-b border-alabaster/10 hover:bg-alabaster/[0.03] transition"
            >
              <span className="md:col-span-4 font-mono text-sm text-alabaster group-hover:text-acid transition flex items-center gap-3 min-w-0">
                <span className="text-acid/70 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate">{r.name}</span>
              </span>
              <span className="md:col-span-6 text-sm text-stone leading-relaxed">{r.desc}</span>
              <span className="md:col-span-2 md:justify-end font-mono text-[11px] text-stone flex items-center gap-2">
                <span>{r.lang}</span>
                <PiArrowUpRightBold className="text-acid opacity-0 group-hover:opacity-100 transition" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
