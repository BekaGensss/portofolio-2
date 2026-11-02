import React, { useEffect, useRef, useState } from 'react';
import { CERTS, IMPACT, PROFILE, REPOS, SECTIONS, SOFT_SKILLS, CAPABILITIES, TRAJECTORY, asset, hasImpact } from '../data/profile';
import { Modal, ModalBar } from './ui';

const PROMPT = 'bara@unm-s1:~$';
const COMMANDS = ['help', 'whoami', 'edu', 'exp', 'skills', 'certs', 'impact', 'repos', 'contact', 'cv', 'open', 'clear', 'exit'];
const QUICK = ['help', 'whoami', 'certs --verify', 'impact --pos', 'repos', 'clear'];

const Hi = ({ children }) => <span className="text-acid">{children}</span>;
const Dim = ({ children }) => <span className="text-stone">{children}</span>;
const KV = ({ k, children }) => (
  <div className="flex gap-3">
    <span className="text-stone w-24 shrink-0">{k}</span>
    <span className="min-w-0 break-words">{children}</span>
  </div>
);
const Box = ({ children, accent }) => (
  <div className={`p-3 border space-y-1 ${accent ? 'bg-acid/10 border-acid/30' : 'bg-charcoal border-alabaster/10'}`}>{children}</div>
);

const HELP = [
  ['whoami', 'Ringkasan eksekutif & kualifikasi akademik'],
  ['edu', 'Riwayat pendidikan'],
  ['exp', 'Pengalaman magang & pelatihan'],
  ['skills', 'Kompetensi teknis & soft skill'],
  ['certs --verify', 'Daftar sertifikat beserta nomor dokumen'],
  ['impact --pos', 'Lingkup kerja di PT Pos Indonesia (Persero)'],
  ['repos', 'Repositori GitHub'],
  ['contact', 'Email, LinkedIn, GitHub'],
  ['cv', 'Unduh CV (PDF)'],
  ['open <section>', 'Loncat ke section (mis. open vault)'],
  ['clear', 'Bersihkan layar'],
];

function run(raw, api) {
  const [cmd = '', ...args] = raw.trim().split(/\s+/);
  const name = cmd.toLowerCase();
  const flag = args.join(' ').toLowerCase();

  switch (name) {
    case 'help':
      return (
        <Box>
          <div className="text-acid font-semibold">DAFTAR PERINTAH BK-CLI v2.6:</div>
          {HELP.map(([c, d]) => (
            <div key={c}>• <Hi>{c}</Hi> — {d}</div>
          ))}
          <div className="pt-1 text-stone">Tab = lengkapi · ↑/↓ = riwayat · Ctrl+L = bersihkan · Esc = tutup</div>
        </Box>
      );

    case 'whoami':
      return (
        <div className="space-y-1">
          <div className="text-alabaster font-bold">{PROFILE.name}</div>
          <KV k="Pendidikan">S1 Informatika — Universitas Nusa Mandiri (IPK {PROFILE.gpa}/4.00, Akreditasi Unggul)</KV>
          <KV k="PIN Ijazah"><Hi>{PROFILE.pin}</Hi></KV>
          <KV k="SKPI"><Hi>{PROFILE.skpi}</Hi></KV>
          <KV k="Fokus">Network Security (Cisco CCNAv7 &amp; NetSec), IT Support, Web Engineering</KV>
        </div>
      );

    case 'edu':
      return (
        <div className="space-y-1">
          {TRAJECTORY.filter((t) => t.id === 's1' || t.id === 'd3' || t.id === 'ppkpi').map((t) => (
            <KV key={t.id} k={t.period.slice(0, 12)}><Hi>{t.title}</Hi> — {t.org}</KV>
          ))}
        </div>
      );

    case 'exp':
      return (
        <div className="space-y-1">
          {TRAJECTORY.filter((t) => t.id === 'pos' || t.id === 'surya').map((t) => (
            <KV key={t.id} k={t.period.slice(0, 12)}><Hi>{t.title}</Hi> — {t.org}</KV>
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="space-y-2">
          {CAPABILITIES.map((c) => (
            <div key={c.key}>
              <div className="text-acid">[{c.key}] {c.title}</div>
              <div className="text-alabaster/85">{c.items.join(' · ')}</div>
            </div>
          ))}
          <div><span className="text-acid">[S] Soft skill</span><div className="text-alabaster/85">{SOFT_SKILLS.join(' · ')}</div></div>
        </div>
      );

    case 'certs':
    case 'cert':
    case 'certificates':
      return (
        <div className="space-y-1">
          <div className="text-acid font-bold">[CREDENTIAL LEDGER — {String(CERTS.length).padStart(2, '0')} RECORDS]</div>
          {CERTS.map((c, i) => (
            <div key={c.id}>
              {String(i + 1).padStart(2, '0')}. {c.title} <Dim>({c.date})</Dim>
              {c.serial && <> — <Hi>{c.serial}</Hi></>}
              {flag.includes('verify') && <Dim> [{c.file ? 'PDF tersedia' : 'record'}]</Dim>}
            </div>
          ))}
        </div>
      );

    case 'impact': {
      const pos = TRAJECTORY.find((t) => t.id === 'pos');
      return (
        <Box accent>
          <div className="text-acid font-bold">LINGKUP KERJA @ PT POS INDONESIA (PERSERO) — {pos.period}:</div>
          <div>• Memeriksa &amp; memperbaiki masalah hardware dan software</div>
          <div>• Memonitor kinerja jaringan secara real-time dan menangani gangguan</div>
          <div>• Memantau &amp; mengonfigurasi antivirus dan firewall</div>
          <div>• Pelaporan berkala kinerja sistem &amp; jaringan ke tim internal</div>
          {hasImpact() && (
            <div className="pt-1 text-alabaster">MTTR {IMPACT.mttr} · {IMPACT.uptime} uptime · {IMPACT.endpoints} endpoint</div>
          )}
        </Box>
      );
    }

    case 'repos':
    case 'repo':
      return (
        <div className="space-y-1">
          {REPOS.map((r, i) => (
            <div key={r.name}>{String(i + 1).padStart(2, '0')}. <Hi>{r.name}</Hi> <Dim>[{r.lang}]</Dim></div>
          ))}
          <div className="text-stone pt-1">{PROFILE.github}?tab=repositories</div>
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-1">
          <KV k="Email"><Hi>{PROFILE.email}</Hi></KV>
          <KV k="LinkedIn">{PROFILE.linkedin.replace('https://www.', '')}</KV>
          <KV k="GitHub">{PROFILE.github.replace('https://', '')}</KV>
        </div>
      );

    case 'open': {
      const q = flag.replace(/^#/, '');
      const s = SECTIONS.find((x) => x.id === q || x.nav.toLowerCase() === q || x.label.toLowerCase() === q || x.n === q);
      if (!s) return <Dim>Section tidak ditemukan. Coba: {SECTIONS.map((x) => x.id).join(', ')}</Dim>;
      api.go(s.id);
      return <span>Membuka <Hi>{s.n} {s.label}</Hi> …</span>;
    }

    case 'sudo':
      if (flag.replace(/\s+/g, ' ') === 'hire bara') {
        api.hire();
        return (
          <div>
            <div><Dim>[sudo] password for recruiter:</Dim> ********</div>
            <div className="text-acid">Akses diberikan. Membuka draft email wawancara teknis …</div>
          </div>
        );
      }
      return <Dim>sudo: perintah tidak dikenali. (Petunjuk: coba <Hi>sudo hire bara</Hi>)</Dim>;

    default:
      return <Dim>Perintah &apos;{cmd}&apos; tidak dikenali. Ketik <Hi>help</Hi> untuk melihat daftar perintah.</Dim>;
  }
}

export default function CliModal({ onClose }) {
  const [lines, setLines] = useState(() => [{ id: 0, cmd: null, out: null }]);
  const [value, setValue] = useState('');
  const history = useRef([]);
  const pointer = useRef(0);
  const nextId = useRef(1);
  const outRef = useRef(null);
  const hireTimer = useRef(0);

  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);
  useEffect(() => () => clearTimeout(hireTimer.current), []);

  const api = {
    go: (id) => {
      onClose();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    },
    hire: () => {
      clearTimeout(hireTimer.current);
      hireTimer.current = setTimeout(() => {
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Technical Interview Invitation — Bara Kusuma, S.Kom.')}`;
      }, 900);
    },
  };

  const exec = (raw) => {
    const text = raw.trim();
    if (!text) return;
    history.current.push(text);
    pointer.current = history.current.length;
    const name = text.split(/\s+/)[0].toLowerCase();

    if (name === 'clear') { setLines([]); return; }
    if (name === 'exit') { onClose(); return; }

    let out;
    if (name === 'cv') {
      const a = document.createElement('a');
      a.href = asset(PROFILE.cvFile);
      a.download = 'CV-Bara-Kusuma.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      out = <span>Mengunduh <Hi>CV-Bara-Kusuma.pdf</Hi> …</span>;
    } else {
      out = run(text, api);
    }
    setLines((prev) => [...prev, { id: nextId.current++, cmd: text, out }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    exec(value);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.current.length) return;
      pointer.current = Math.max(0, pointer.current - 1);
      setValue(history.current[pointer.current] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      pointer.current = Math.min(history.current.length, pointer.current + 1);
      setValue(history.current[pointer.current] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = value.trim().toLowerCase();
      if (!v || v.includes(' ')) return;
      const m = COMMANDS.filter((c) => c.startsWith(v));
      if (m.length === 1) setValue(`${m[0]} `);
      else if (m.length > 1) setLines((prev) => [...prev, { id: nextId.current++, cmd: value, out: <Dim>{m.join('   ')}</Dim> }]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <Modal onClose={onClose} label="Terminal interaktif BK-CLI" panelClass="!bg-[#09090C] border-acid/40 h-[560px]">
      <ModalBar title="bara@netsec-node:~ (BK-CLI v2.6 — Interactive Inspection Shell)" onClose={onClose} closeLabel="ESC [X]" />

      <div className="px-5 py-2.5 bg-charcoal border-b border-alabaster/10 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span className="text-stone">QUICK EXEC:</span>
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => exec(q)}
            className="px-2.5 py-0.5 bg-alabaster/5 hover:bg-acid hover:text-obsidian text-alabaster border border-alabaster/15 transition"
          >
            {q}
          </button>
        ))}
      </div>

      <div ref={outRef} className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-3 text-alabaster/90 leading-relaxed" aria-live="polite">
        <div className="text-stone">BARA KUSUMA, S.KOM. — SECURITY &amp; INFRASTRUCTURE SHELL [AUTHENTICATED]</div>
        <div>Ketik perintah di bawah atau klik tombol cepat di atas (contoh: <Hi>certs --verify</Hi> atau <Hi>impact --pos</Hi>).</div>
        {lines.filter((l) => l.cmd !== null).map((l) => (
          <div key={l.id} className="pt-2 border-t border-alabaster/10">
            <div className="text-acid">{PROMPT} <span className="text-alabaster">{l.cmd}</span></div>
            <div className="mt-1">{l.out}</div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="px-5 py-3.5 bg-obsidian border-t border-alabaster/15 flex items-center gap-3 font-mono text-xs">
        <span className="text-acid font-bold shrink-0">{PROMPT}</span>
        <input
          data-autofocus
          aria-label="Perintah terminal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="help, whoami, certs --verify, impact --pos …"
          className="flex-1 min-w-0 bg-transparent text-alabaster focus:outline-none placeholder:text-stone/50"
        />
        <button type="submit" className="px-3 py-1 bg-acid text-obsidian font-bold uppercase shrink-0">EXEC</button>
      </form>
    </Modal>
  );
}
