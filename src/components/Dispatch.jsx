import React from 'react';
import { PiArrowUpRightBold, PiCalendarCheckBold, PiCopyBold, PiDownloadSimpleBold, PiTerminalWindowBold } from 'react-icons/pi';
import { PROFILE, asset } from '../data/profile';
import { sceneStore } from '../sceneStore';
import { Ital, Reveal, copyText, useToast } from './ui';

const LinkRow = ({ children, icon, ...props }) => (
  <a
    {...props}
    className="flex items-center justify-between p-3.5 bg-obsidian/70 border border-alabaster/10 hover:border-acid text-alabaster transition group"
  >
    <span>{children}</span>
    <span className="text-stone group-hover:text-acid transition">{icon}</span>
  </a>
);

export default function Dispatch({ onOpen }) {
  const toast = useToast();
  const subject = encodeURIComponent('Technical Interview Invitation — Bara Kusuma, S.Kom.');

  const copyEmail = async () => {
    const ok = await copyText(PROFILE.email);
    toast(ok ? `Email ${PROFILE.email} disalin ke clipboard` : 'Gagal menyalin — salin manual ya');
  };

  return (
    <section id="dispatch" className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-20 pb-16">
      <Reveal className="p-8 sm:p-14 lg:p-20 bg-charcoal/85 border border-alabaster/15 relative overflow-hidden">
        <span className="absolute top-4 left-4 font-mono text-[10px] text-stone/60">+ [INIT_DISPATCH_CHANNEL]</span>
        <span className="absolute top-4 right-4 font-mono text-[10px] text-acid">STATUS: OPEN FOR FULL-TIME / CONTRACT</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs text-acid uppercase tracking-widest">[07 // INITIATE EXECUTIVE TRANSMISSION]</div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] text-alabaster">
              READY TO DEPLOY <br />
              <Ital>secure</Ital> INFRASTRUCTURE?
            </h2>
            <p className="text-sm sm:text-base text-stone max-w-xl leading-relaxed">
              Tersedia untuk wawancara teknis dan penempatan posisi{' '}
              <strong className="text-alabaster font-semibold">IT Support Specialist, Network Security Engineer, Infrastructure Administrator,</strong>{' '}
              maupun <strong className="text-alabaster font-semibold">Web Developer</strong>.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`mailto:${PROFILE.email}?subject=${subject}`}
                data-cursor="MAIL"
                className="px-7 py-4 bg-acid text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-alabaster transition flex items-center gap-3"
              >
                <span>SCHEDULE 15-MIN TECHNICAL INTERVIEW</span>
                <PiCalendarCheckBold className="text-base" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="COPY"
                className="px-7 py-4 bg-alabaster/5 hover:bg-alabaster/10 border border-alabaster/20 text-alabaster font-mono text-xs uppercase tracking-wider transition flex items-center gap-3"
              >
                <span>COPY EMAIL: {PROFILE.email.toUpperCase()}</span>
                <PiCopyBold className="text-acid text-base" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 font-mono text-xs border-t lg:border-t-0 lg:border-l border-alabaster/15 pt-8 lg:pt-0 lg:pl-10">
            <div className="text-stone uppercase tracking-widest text-[11px]">DIRECT DIRECTORY // VERIFIED LINKS</div>
            <div className="space-y-2.5">
              <LinkRow href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN" icon={<PiArrowUpRightBold />}>
                LINKEDIN // BARA KUSUMA, S.KOM.
              </LinkRow>
              <LinkRow href={PROFILE.github} target="_blank" rel="noopener noreferrer" data-cursor="GITHUB" icon={<PiArrowUpRightBold />}>
                GITHUB // @BEKAGENSSS
              </LinkRow>
              <LinkRow href={asset(PROFILE.cvFile)} download="CV-Bara-Kusuma.pdf" data-cursor="CV.PDF" icon={<PiDownloadSimpleBold />}>
                CURRICULUM VITAE // PDF
              </LinkRow>
              <button
                type="button"
                onClick={() => onOpen('cli')}
                data-cursor="RUN CLI"
                className="w-full flex items-center justify-between p-3.5 bg-obsidian/70 border border-alabaster/10 hover:border-acid text-alabaster transition group text-left"
              >
                <span>INTERACTIVE SHELL // BK-CLI v2.6</span>
                <PiTerminalWindowBold className="text-acid" />
              </button>
            </div>
            <div className="pt-3 text-[11px] text-stone">DOMICILE: {PROFILE.domicile.toUpperCase()}</div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-14 pt-8 border-t border-alabaster/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-stone">
        <div>© 2026 BARA KUSUMA, S.KOM. — SPATIAL WEBGL PORTFOLIO &amp; VERIFIED CREDENTIAL VAULT.</div>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => sceneStore.set({ mode: 'auto' })} className="hover:text-acid transition">3D: AUTO</button>
          <button type="button" onClick={() => sceneStore.set({ mode: 'mesh' })} className="hover:text-acid transition">3D: MESH</button>
          <button type="button" onClick={() => sceneStore.set({ mode: 'layers' })} className="hover:text-acid transition">3D: LAYERS</button>
          <button type="button" onClick={() => onOpen('cli')} className="text-acid hover:underline">TERMINAL</button>
          <a href="#hero" className="hover:text-acid transition">↑ TOP</a>
        </div>
      </footer>
    </section>
  );
}
