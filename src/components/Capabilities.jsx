import React from 'react';
import { SiJavascript, SiReact, SiTailwindcss, SiPython, SiLaravel, SiNodedotjs, SiMysql, SiGit } from 'react-icons/si';
import { CAPABILITIES, SOFT_SKILLS, CAREER_INTEREST } from '../data/profile';
import { Reveal, SectionHead, Ital } from './ui';

const STACK = [
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'React', Icon: SiReact },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Python', Icon: SiPython },
  { name: 'Laravel', Icon: SiLaravel },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Git', Icon: SiGit },
];

const Label = ({ children }) => (
  <div className="font-mono text-[11px] text-stone uppercase tracking-[0.16em] mb-5">{children}</div>
);

export default function Capabilities() {
  return (
    <section id="capabilities" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-32 space-y-16">
      <SectionHead
        index="02"
        label="CAPABILITIES"
        title={<>SKILLS, <Ital>stack</Ital> &amp; TOOLING.</>}
        aside={
          <p className="font-mono text-xs text-stone max-w-md leading-relaxed">
            Kompetensi yang dirangkum dari CV dan pengalaman lapangan: jaringan, keamanan, pengembangan web, dan operasional TI.
          </p>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-alabaster/10">
        {CAPABILITIES.map((c, i) => (
          <Reveal
            key={c.key}
            delay={i * 100}
            className="group border-r border-b border-alabaster/10 p-8 sm:p-10 bg-charcoal/70 hover:bg-charcoal transition-colors"
          >
            <div className="flex items-baseline justify-between mb-8">
              <span
                className="font-display font-extrabold text-6xl leading-none text-transparent"
                style={{ WebkitTextStroke: '1px rgba(226,241,99,0.7)' }}
                aria-hidden="true"
              >
                {c.key}
              </span>
              <span className="font-mono text-[11px] text-stone uppercase tracking-widest">
                {String(c.items.length).padStart(2, '0')} ITEMS
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl text-alabaster group-hover:text-acid transition mb-6">{c.title}</h3>
            <ul className="space-y-3 text-sm text-stone leading-relaxed">
              {c.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span className="font-mono text-acid shrink-0" aria-hidden="true">→</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-7">
          <Label>TECH STACK // DIGUNAKAN PADA REPOSITORI</Label>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STACK.map(({ name, Icon }) => (
              <li
                key={name}
                className="flex items-center gap-3 px-4 py-3.5 border border-alabaster/10 bg-charcoal/70 text-stone hover:text-acid hover:border-acid/40 transition"
              >
                <Icon className="text-xl shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs">{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-5 space-y-8" delay={120}>
          <div>
            <Label>MINAT KARIR</Label>
            <div className="flex flex-wrap gap-3">
              {CAREER_INTEREST.map((r) => (
                <span key={r} className="px-4 py-2.5 border border-acid/40 bg-acid/10 text-acid font-mono text-xs uppercase tracking-wider">
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Label>SOFT SKILL</Label>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span key={s} className="px-3 py-1.5 border border-alabaster/10 bg-alabaster/5 text-alabaster/85 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
