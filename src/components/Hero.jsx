import React from 'react';
import { PiSealCheckBold, PiTerminalBold, PiCopyBold, PiDownloadSimpleBold } from 'react-icons/pi';
import { PROFILE, CERTS, IMPACT, hasImpact, asset } from '../data/profile';
import { CountUp, Rich, copyText, useToast } from './ui';

/* Kata naik dari balik "mask" secara bergantian */
const Mask = ({ delay, children }) => (
  <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]">
    <span className="mask-rise" style={{ animationDelay: `${delay}s` }}>{children}</span>
  </span>
);

const fade = (delay) => ({ className: 'fade-up', style: { animationDelay: `${delay}s` } });

export default function Hero({ onOpen }) {
  const toast = useToast();

  const metrics = [
    {
      k: '01 / ACADEMIC HONORS',
      big: <CountUp to={PROFILE.gpa} decimals={2} />,
      sub: '/ 4.00 GPA',
      note: 'KKNI Level 6 • LAM INFOKOM Unggul',
    },
    hasImpact()
      ? { k: '02 / ENTERPRISE IMPACT', big: IMPACT.mttr, sub: `${IMPACT.uptime} Uptime`, note: `${IMPACT.endpoints} Endpoints @ PT Pos Indonesia` }
      : { k: '02 / FIELD OPERATIONS', big: 'BUMN', sub: 'IT Support', note: 'PT Pos Indonesia (Persero) • 2022' },
    {
      k: '03 / VERIFIED CREDENTIALS',
      big: <CountUp to={CERTS.length} pad={2} />,
      sub: 'Certificates',
      note: 'Cisco CCNAv7, NetSec, SKPI & K3',
    },
    { k: '04 / SCHOLARLY OUTPUT', big: 'JKI', sub: 'Publication', note: 'Jurnal Khatulistiwa Informatika' },
  ];

  const copyEmail = async () => {
    const ok = await copyText(PROFILE.email);
    toast(ok ? `Email ${PROFILE.email} disalin` : 'Gagal menyalin — salin manual ya');
  };

  return (
    <section id="hero" className="min-h-[92vh] max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-between py-12 lg:py-20">
      {/* Baris meta editorial */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 pb-8 border-b border-alabaster/10 font-mono text-[11px] sm:text-xs text-stone">
        <div {...fade(0.05)} className="fade-up md:col-span-4 flex items-center gap-2">
          <span className="text-acid">[01 // ARCHITECTURAL INDEX]</span>
          <span>— WEST JAKARTA, 11730</span>
        </div>
        <div {...fade(0.12)} className="fade-up md:col-span-5 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-acid shrink-0" />
          <span className="text-alabaster">S1 INFORMATIKA — UNIVERSITAS NUSA MANDIRI (GPA {PROFILE.gpa} / 4.00)</span>
        </div>
        <div {...fade(0.19)} className="fade-up md:col-span-3 md:text-right">
          SKPI: <span className="text-alabaster">{PROFILE.skpi}</span>
        </div>
      </div>

      {/* Tipografi monumental + bio */}
      <div className="my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8 space-y-6">
          <div {...fade(0.1)} className="fade-up inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-alabaster/5 border border-alabaster/15">
            <span className="font-mono text-[11px] uppercase tracking-widest text-acid">CISCO CCNAv7 &amp; NETWORK SECURITY CERTIFIED</span>
          </div>

          <h1
            aria-label="Securing networks, engineering resilient systems."
            className="font-display font-extrabold text-[2.5rem] leading-[0.98] sm:text-7xl sm:leading-[0.96] xl:text-[5.4rem] tracking-tight uppercase text-alabaster"
          >
            <span aria-hidden="true" className="block">
              <Mask delay={0.05}>SECURING</Mask>{' '}
              <Mask delay={0.17}>
                <span className="font-serif italic font-normal text-acid lowercase px-1">networks,</span>
              </Mask>
            </span>
            <span aria-hidden="true" className="block"><Mask delay={0.3}>ENGINEERING</Mask></span>
            <span aria-hidden="true" className="block">
              <Mask delay={0.42}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-alabaster via-alabaster to-stone">RESILIENT SYSTEMS.</span>
              </Mask>
            </span>
          </h1>
        </div>

        <div {...fade(0.6)} className="fade-up lg:col-span-4 space-y-6 lg:pl-6 lg:border-l border-alabaster/15">
          <p className="text-sm sm:text-base text-stone leading-relaxed">
            <Rich text="**Bara Kusuma, S.Kom.** adalah insinyur keamanan jaringan, spesialis infrastruktur IT, dan pengembang sistem lulusan **Universitas Nusa Mandiri (IPK 3.81 — Akreditasi Unggul)** serta alumni D3 **UBSI**. Berpengalaman memantau kinerja jaringan secara real-time serta mengelola firewall dan antivirus di **PT Pos Indonesia (Persero)**." />
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#vault"
              data-cursor="OPEN VAULT"
              className="px-6 py-4 bg-acid text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-alabaster transition flex items-center gap-3"
            >
              <span>INSPECT {CERTS.length} CERTIFICATES</span>
              <PiSealCheckBold className="text-base" />
            </a>
            <button
              type="button"
              onClick={() => onOpen('cli')}
              data-cursor="RUN CLI"
              className="px-5 py-4 border border-alabaster/20 hover:border-acid text-alabaster font-mono text-xs uppercase tracking-wider transition flex items-center gap-2"
            >
              <PiTerminalBold className="text-acid" />
              <span>LAUNCH CLI</span>
            </button>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-stone">
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="COPY"
              className="text-left py-2.5 px-3 bg-alabaster/5 hover:bg-alabaster/10 border border-alabaster/10 transition flex items-center justify-between gap-2"
            >
              <span className="truncate">{PROFILE.email}</span>
              <PiCopyBold className="text-acid shrink-0" />
            </button>
            <a
              href={asset(PROFILE.cvFile)}
              download="CV-Bara-Kusuma.pdf"
              data-cursor="CV.PDF"
              className="text-left py-2.5 px-3 bg-alabaster/5 hover:bg-alabaster/10 border border-alabaster/10 transition flex items-center justify-between gap-2"
            >
              <span className="truncate">UNDUH CV (PDF)</span>
              <PiDownloadSimpleBold className="text-acid shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Strip metrik */}
      <div {...fade(0.8)} className="fade-up grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-alabaster/10">
        {metrics.map((m) => (
          <div key={m.k}>
            <div className="font-mono text-[11px] text-stone uppercase">{m.k}</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-alabaster mt-1">
              {m.big} <span className="font-serif italic text-lg text-acid">{m.sub}</span>
            </div>
            <div className="font-mono text-[11px] text-stone mt-0.5">{m.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
