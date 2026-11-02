import React from 'react';
import { PiCopyBold, PiDownloadSimpleBold, PiFilePdfBold } from 'react-icons/pi';
import { CERTS, COMPETENCY_SUMMARY, PROFILE, WORKS, asset } from '../data/profile';
import { Chip, Modal, ModalBar, Tilt, copyText, useToast } from './ui';

/* ------------------------------------------------------------------ */
/*  Credential Inspector                                                */
/* ------------------------------------------------------------------ */
export function CertModal({ id, onClose }) {
  const c = CERTS.find((x) => x.id === id);
  const toast = useToast();
  if (!c) return null;

  const copySerial = async () => {
    const ok = await copyText(c.serial);
    toast(ok ? 'Nomor dokumen disalin' : 'Gagal menyalin — salin manual ya');
  };

  return (
    <Modal onClose={onClose} label={c.title} maxWidth="max-w-4xl">
      <ModalBar title={`${c.code} // RECORD`} onClose={onClose} />
      <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
        <Tilt max={3.5} className="p-6 sm:p-10 border-2 border-acid/40 bg-gradient-to-br from-[#13131A] via-[#0B0B0F] to-[#171721]">
          <div className="parallax space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-alabaster/15">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-acid">{c.issuer}</div>
                <div className="font-mono text-[11px] text-stone mt-0.5">{c.subIssuer}</div>
              </div>
              <div className="sm:text-right font-mono text-xs">
                <span className="px-3 py-1 bg-acid/15 text-acid border border-acid/40 uppercase tracking-wider">
                  {c.file ? 'ORIGINAL PDF TERSEDIA' : 'ARSIP RECORD'}
                </span>
                <div className="text-stone mt-1.5 uppercase">Diterbitkan: {c.date}</div>
              </div>
            </div>

            <div className="py-4 space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-widest text-stone">KREDENSIAL INI DIBERIKAN KEPADA</div>
              <div className="font-serif italic text-3xl sm:text-5xl text-alabaster tracking-wide">{c.recipient || 'Bara Kusuma'}</div>
              <div className="font-mono text-xs text-stone pt-2">ATAS PENYELESAIAN &amp; PEMENUHAN PERSYARATAN:</div>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-acid uppercase tracking-tight">{c.title}</h3>
              <p className="text-sm text-stone leading-relaxed max-w-2xl pt-1">{c.desc}</p>
            </div>

            {(c.signatory || c.serial) && (
              <div className="pt-6 border-t border-alabaster/15 grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                {c.signatory && (
                  <div>
                    <div className="text-[10px] text-stone uppercase">INSTRUKTUR / PENANDATANGAN</div>
                    <div className="text-alabaster font-semibold mt-1 text-sm">{c.signatory}</div>
                    {c.role && <div className="text-[11px] text-stone">{c.role}</div>}
                  </div>
                )}
                {c.serial && (
                  <div className="sm:text-right">
                    <div className="text-[10px] text-stone uppercase">NOMOR / ID DOKUMEN</div>
                    <div className="text-acid font-semibold mt-1 break-all">{c.serial}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Tilt>

        <div className="space-y-3">
          <div className="font-mono text-xs text-stone uppercase tracking-wider">{c.skillsLabel}:</div>
          <div className="flex flex-wrap gap-2">
            {c.skills.map((s) => <Chip key={s}>{s}</Chip>)}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-alabaster/10">
          {c.serial ? (
            <button
              type="button"
              onClick={copySerial}
              className="px-5 py-3 bg-alabaster/10 hover:bg-acid hover:text-obsidian text-alabaster font-mono text-xs uppercase tracking-wider transition flex items-center gap-2"
            >
              <PiCopyBold />
              <span>COPY NOMOR DOKUMEN</span>
            </button>
          ) : <span />}
          {c.file ? (
            <a
              href={asset(c.file)}
              target="_blank"
              rel="noopener noreferrer"
              data-autofocus
              className="px-5 py-3 bg-acid text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-alabaster transition flex items-center gap-2"
            >
              <PiFilePdfBold />
              <span>BUKA DOKUMEN ASLI (PDF)</span>
            </a>
          ) : (
            <span className="font-mono text-[11px] text-stone">Berkas PDF dokumen ini tidak dilampirkan pada situs.</span>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/*  Studi kasus                                                         */
/* ------------------------------------------------------------------ */
export function WorkModal({ id, onClose }) {
  const w = WORKS.find((x) => x.id === id);
  if (!w) return null;
  return (
    <Modal onClose={onClose} label={w.title}>
      <ModalBar title={`[${w.index} // ${w.tag}] — ${w.org}`} onClose={onClose} closeLabel="CLOSE [X]" />
      <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-alabaster uppercase">{w.title}</h3>
        <p className="text-stone text-sm sm:text-base leading-relaxed">{w.summary}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 bg-obsidian/70 border border-alabaster/10 space-y-2">
            <div className="font-mono text-xs text-acid uppercase">01 // PROBLEM &amp; CHALLENGE</div>
            <p className="text-xs sm:text-sm text-stone leading-relaxed">{w.problem}</p>
          </div>
          <div className="p-5 bg-obsidian/70 border border-alabaster/10 space-y-2">
            <div className="font-mono text-xs text-acid uppercase">02 // ARCHITECTURAL SOLUTION</div>
            <p className="text-xs sm:text-sm text-stone leading-relaxed">{w.solution}</p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="font-mono text-xs text-stone uppercase">TECH STACK &amp; PROTOCOLS:</div>
          <div className="flex flex-wrap gap-2">
            {w.stack.map((s) => <Chip key={s} accent>{s}</Chip>)}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/*  Dossier                                                             */
/* ------------------------------------------------------------------ */
const Field = ({ label, value, accent }) => (
  <div>
    <span className="text-stone block">{label}</span>
    <span className={`${accent ? 'text-acid font-bold' : 'text-alabaster'} break-all`}>{value}</span>
  </div>
);

export function DossierModal({ onClose }) {
  const toast = useToast();
  const copy = async (text, ok) => {
    const done = await copyText(text);
    toast(done ? ok : 'Gagal menyalin — salin manual ya');
  };

  return (
    <Modal onClose={onClose} label="Official Executive Dossier">
      <ModalBar title="OFFICIAL EXECUTIVE DOSSIER // BARA KUSUMA, S.KOM." onClose={onClose} closeLabel="CLOSE [X]" />
      <div className="p-6 sm:p-10 overflow-y-auto space-y-6 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-obsidian border border-alabaster/10">
          <Field label="NAMA & GELAR" value={PROFILE.name} />
          <Field label="PIN IJAZAH NASIONAL" value={PROFILE.pin} accent />
          <Field label="NO. SKPI (UNM)" value={PROFILE.skpi} />
          <Field label="NIM" value={PROFILE.nim} />
          <Field label="IPK / AKREDITASI" value={`${PROFILE.gpa} / 4.00 (Prodi Unggul LAM INFOKOM)`} />
          <Field label="DOMISILI" value={PROFILE.domicile} />
        </div>

        <div className="space-y-2">
          <div className="text-acid uppercase">RINGKASAN KOMPETENSI:</div>
          <ul className="space-y-2 text-stone list-disc pl-5 font-sans text-xs leading-relaxed">
            {COMPETENCY_SUMMARY.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-alabaster/10">
          <a
            href={asset(PROFILE.cvFile)}
            download="CV-Bara-Kusuma.pdf"
            data-autofocus
            className="px-5 py-3 bg-acid text-obsidian font-bold uppercase tracking-wider hover:bg-alabaster transition flex items-center gap-2"
          >
            <PiDownloadSimpleBold /> UNDUH CV (PDF)
          </a>
          <button
            type="button"
            onClick={() => copy(PROFILE.pin, 'PIN Ijazah Nasional disalin')}
            className="px-5 py-3 border border-alabaster/20 hover:border-acid text-alabaster uppercase tracking-wider transition"
          >
            COPY PIN IJAZAH
          </button>
          <button
            type="button"
            onClick={() => copy(PROFILE.email, `Email ${PROFILE.email} disalin`)}
            className="px-5 py-3 border border-alabaster/20 hover:border-acid text-alabaster uppercase tracking-wider transition"
          >
            COPY EMAIL
          </button>
        </div>
      </div>
    </Modal>
  );
}
