import React, { useState } from 'react';
import { PiCubeBold } from 'react-icons/pi';
import { CERTS, CERT_FILTERS } from '../data/profile';
import { Ital, Reveal, SectionHead, Tilt } from './ui';

const countOf = (key) => (key === 'all' ? CERTS.length : CERTS.filter((c) => c.category === key).length);

export default function Vault({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? CERTS : CERTS.filter((c) => c.category === filter);

  return (
    <section id="vault" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-32 space-y-14">
      <SectionHead
        index="05"
        label="VERIFIED CREDENTIAL VAULT"
        title={<>AUTHENTICATED <Ital>certificates</Ital> &amp; DIPLOMAS.</>}
        aside={
          <div className="flex flex-wrap gap-2 font-mono text-xs" role="group" aria-label="Filter kredensial">
            {CERT_FILTERS.map((f) => {
              const on = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-2.5 uppercase tracking-wider transition ${
                    on
                      ? 'bg-acid text-obsidian font-bold'
                      : 'bg-alabaster/5 hover:bg-alabaster/10 text-alabaster border border-alabaster/15'
                  }`}
                >
                  {f.label} ({String(countOf(f.key)).padStart(2, '0')})
                </button>
              );
            })}
          </div>
        }
      />

      <Reveal>
        <p className="text-sm text-stone max-w-2xl leading-relaxed">
          Dokumen di bawah ini bersumber dari kredensial resmi milik{' '}
          <strong className="text-alabaster font-semibold">Bara Kusuma</strong> — lengkap dengan nomor dokumen, tanggal penerbitan, dan
          pihak penerbit sesuai berkas. Klik kartu untuk membuka{' '}
          <span className="text-acid font-mono text-xs">Credential Inspector</span> dan, bila tersedia, berkas PDF aslinya.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {list.map((c, i) => (
          <Reveal key={c.id} delay={i * 80} className="h-full">
            <Tilt
              as="button"
              type="button"
              onClick={() => onOpen('cert', c.id)}
              data-cursor="INSPECT"
              className="block w-full h-full text-left p-7 group"
            >
              <div className="parallax h-full flex flex-col justify-between gap-6 min-h-[300px]">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] pb-4 border-b border-alabaster/10">
                    <span className="text-acid font-semibold">{c.code}</span>
                    <span className="px-2 py-0.5 bg-acid/10 text-acid border border-acid/30 text-[10px] shrink-0">
                      {c.file ? 'ORIGINAL PDF' : 'RECORD'}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-stone">{c.issuer}</div>
                    <h3 className="font-display font-bold text-2xl text-alabaster group-hover:text-acid transition mt-1 leading-snug">{c.title}</h3>
                    <div className="font-mono text-[11px] text-stone/80 mt-1">{c.subIssuer} • {c.date}</div>
                  </div>
                  <p className="text-xs text-stone leading-relaxed line-clamp-3">{c.desc}</p>
                </div>

                <div className="pt-5 border-t border-alabaster/10 space-y-3 font-mono text-[11px]">
                  {c.signatory && (
                    <div className="flex items-center justify-between gap-3 text-stone">
                      <span>INSTRUKTUR:</span>
                      <span className="text-alabaster font-medium text-right">{c.signatory}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-stone truncate">{c.serial ? `ID: ${c.serial}` : 'ID: —'}</span>
                    <span className="text-acid font-semibold flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition">
                      <span>3D PLATE</span>
                      <PiCubeBold />
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
