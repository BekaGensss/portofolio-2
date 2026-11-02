/*
 * SUMBER DATA TUNGGAL — seluruh teks, angka, dan tautan situs ada di berkas ini.
 * Ubah di sini, tampilan (kartu, modal, CLI, ticker, HUD) ikut berubah otomatis.
 *
 * Pegangan isi:
 *  - Fakta berasal dari CV dan sertifikat (PDF) yang kamu berikan.
 *  - Data pribadi dari kisi-kisimu (NIM, PIN, SKPI, D3 UBSI, PPKPI, riset JKI,
 *    ID kredensial CCNA) dipakai apa adanya dan TIDAK bisa dicocokkan dengan dokumen.
 *  - Angka performa (uptime, MTTR, jumlah endpoint) sengaja dikosongkan; lihat IMPACT.
 */

import absensi1 from '../assets/project1-gambar1.png';
import absensi2 from '../assets/project1-gambar2.png';
import catur1 from '../assets/project2-gambar1.png';
import catur2 from '../assets/project2-gambar2.png';
import portfolio1 from '../assets/project3-gambar1.png';
import portfolio2 from '../assets/project3-gambar2.png';

export const asset = (path) => `${process.env.PUBLIC_URL || ''}/${path}`;

export const PROFILE = {
  name: 'Bara Kusuma, S.Kom.',
  email: 'stenkrama@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bara-kusuma-707067294',
  github: 'https://github.com/BekaGensss',
  domicile: 'Jakarta Barat, 11730',
  nim: '12240174',
  pin: '031069552012026100038',
  skpi: '12102/4.04/UNM/II/2026',
  gpa: 3.81,
  cvFile: 'CV-Bara-Kusuma.pdf',
};

/*
 * Angka dampak kerja di PT Pos Indonesia. TIDAK ada di CV, jadi default-nya kosong
 * dan situs memakai teks berbasis CV. Isi HANYA jika angkanya benar dan bisa kamu
 * pertanggungjawabkan saat wawancara, contoh:
 *   { mttr: '< 25 menit', uptime: '99.8%', endpoints: '150+' }
 */
export const IMPACT = { mttr: null, uptime: null, endpoints: null };
export const hasImpact = () => Boolean(IMPACT.mttr && IMPACT.uptime && IMPACT.endpoints);

export const SECTIONS = [
  { id: 'hero', n: '01', label: 'OVERVIEW', nav: 'OVERVIEW' },
  { id: 'capabilities', n: '02', label: 'CAPABILITIES', nav: 'SKILLS' },
  { id: 'works', n: '03', label: 'SELECTED WORKS', nav: 'WORKS' },
  { id: 'repos', n: '04', label: 'REPOSITORIES', nav: 'CODE' },
  { id: 'vault', n: '05', label: 'CREDENTIAL VAULT', nav: 'VAULT' },
  { id: 'trajectory', n: '06', label: 'PEDIGREE', nav: 'PEDIGREE' },
  { id: 'dispatch', n: '07', label: 'DISPATCH', nav: 'DISPATCH' },
];

/* ------------------------------------------------------------------ */
/*  Sertifikat & kredensial                                             */
/*  Tambah item baru di sini; jumlah di hero, filter, dan CLI otomatis. */
/*  (3 e-sertifikat dari kisi-kisi belum dimasukkan: berkas PDF-nya     */
/*   belum ada, jadi judul/penerbit aslinya belum bisa dipastikan.)     */
/* ------------------------------------------------------------------ */
export const CERTS = [
  {
    id: 'cisco-netsec',
    category: 'cisco',
    code: 'CERT-01 // CISCO NETSEC',
    title: 'Cisco Network Security',
    issuer: 'Cisco Networking Academy',
    subIssuer: 'Diselenggarakan oleh Universitas Nusa Mandiri',
    date: '07 Juni 2025',
    signatory: 'Jordy Lasmana Putra',
    role: 'Instruktur — Universitas Nusa Mandiri',
    serial: null,
    file: 'certificates/cisco-network-security.pdf',
    desc: 'Sertifikat penyelesaian program Network Security melalui Cisco Networking Academy yang diselenggarakan Universitas Nusa Mandiri. Cakupan materi program meliputi mitigasi ancaman siber, Access Control List (ACL), firewall, kriptografi dan VPN, serta pengamanan perangkat jaringan.',
    skillsLabel: 'TOPIK MATERI PROGRAM',
    skills: ['Firewall & ACL', 'VPN & Kriptografi', 'Pencegahan Intrusi', 'Keamanan Layer 2'],
  },
  {
    id: 'cisco-ccna',
    category: 'cisco',
    code: 'CERT-02 // CISCO CCNAv7',
    title: 'CCNAv7: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    subIssuer: 'Universitas Bina Sarana Informatika',
    date: '27 Juli 2022',
    signatory: 'Ahmad Fauzi',
    role: 'Instruktur — Universitas Bina Sarana Informatika',
    serial: '50389a12-04d9-4aed-91ff-ac1126d64939',
    file: 'certificates/cisco-ccna-introduction-to-networks.pdf',
    desc: 'Sertifikat penyelesaian kursus CCNAv7: Introduction to Networks. Mampu mengonfigurasi switch, router, dan perangkat akhir; menyusun skema alamat IPv4 dan IPv6; menjelaskan model OSI serta protokol lapisan fisik dan data link; mengonfigurasi jaringan kecil dengan praktik keamanan terbaik; dan memecahkan masalah konektivitas.',
    skillsLabel: 'KOMPETENSI PADA SERTIFIKAT',
    skills: ['Pengalamatan IPv4 / IPv6', 'Switching & Routing Dasar', 'Model OSI', 'Keamanan Jaringan Dasar', 'Troubleshooting Konektivitas'],
  },
  {
    id: 'unm-skpi',
    category: 'academic',
    code: 'CERT-03 // SKPI & IJAZAH S1',
    title: 'Sarjana Komputer (S.Kom.) — Informatika',
    issuer: 'Universitas Nusa Mandiri (UNM)',
    subIssuer: 'Program Studi Terakreditasi Unggul — LAM INFOKOM',
    date: '13 Februari 2026 (Yudisium)',
    signatory: null,
    role: null,
    serial: 'SKPI 12102/4.04/UNM/II/2026',
    recipient: 'Bara Kusuma, S.Kom.',
    file: null,
    desc: 'Surat Keterangan Pendamping Ijazah (SKPI) dan Ijazah Nasional jenjang Sarjana (KKNI Level 6) dengan capaian IPK 3.81 / 4.00 (NIM 12240174). Program studi terakreditasi Unggul berdasarkan SK LAM INFOKOM No. 166/SK/LAM-INFOKOM/Ak/S/VIII/2025.',
    skillsLabel: 'CAPAIAN AKADEMIK',
    skills: ['IPK 3.81 / 4.00', 'KKNI Level 6', 'Akreditasi Unggul', 'Informatika'],
  },
  {
    id: 'k3-cert',
    category: 'safety',
    code: 'CERT-04 // OCCUPATIONAL SAFETY (K3)',
    title: 'Sertifikat Keselamatan & Kesehatan Kerja (K3)',
    issuer: 'Sertifikat K3',
    subIssuer: 'Atas nama Bara Kusuma, A.Md.T.',
    date: 'November 2025',
    signatory: null,
    role: null,
    serial: '58/MIB/XI/2025/064',
    recipient: 'Bara Kusuma, A.Md.T.',
    file: 'certificates/sertifikat-k3.pdf',
    desc: 'Sertifikat Keselamatan dan Kesehatan Kerja (K3) dengan nomor 58/MIB/XI/2025/064, mendukung kesiapan bekerja dengan standar keselamatan di lingkungan kerja profesional.',
    skillsLabel: 'BIDANG',
    skills: ['K3', 'Keselamatan Kerja', 'Kesehatan Kerja'],
  },
  {
    id: 'ubsi-d3',
    category: 'academic',
    code: 'CERT-05 // ASSOCIATE DEGREE (D3)',
    title: 'Ahli Madya Teknik (A.Md.T.) — Teknologi Informasi',
    issuer: 'Universitas Bina Sarana Informatika (UBSI)',
    subIssuer: 'Program D3 · diperkuat pelatihan PPKPI Pasar Rebo',
    recipient: 'Bara Kusuma, A.Md.T.',
    date: '2023',
    signatory: null,
    role: null,
    serial: null,
    file: null,
    desc: 'Gelar vokasi Ahli Madya Teknik (A.Md.T.) di bidang Teknologi Informasi dari UBSI, diperkuat pelatihan kejuruan rekayasa perangkat lunak di PPKPI Pasar Rebo, Jakarta Timur.',
    skillsLabel: 'BIDANG STUDI',
    skills: ['Teknisi Komputer', 'Basis Data Relasional', 'Pemrograman Web', 'Pengujian Perangkat Lunak'],
  },
];

export const CERT_FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'cisco', label: 'CISCO ACADEMY' },
  { key: 'academic', label: 'SKPI & DEGREE' },
  { key: 'safety', label: 'K3 SAFETY' },
];

/* ------------------------------------------------------------------ */
/*  Karya terpilih (studi kasus)                                        */
/* ------------------------------------------------------------------ */
export const WORKS = [
  {
    id: 'pos-netops',
    index: '01',
    tag: 'ENTERPRISE INFRASTRUCTURE // BUMN',
    title: 'Real-Time Network Monitoring & Endpoint Hardening',
    org: 'PT Pos Indonesia (Persero) — Jakarta Pusat',
    year: '2022',
    summary: 'Operasional pemantauan jaringan WAN/LAN secara real-time, pemeliharaan perangkat keras/lunak, serta konfigurasi firewall dan antivirus di lingkungan kerja PT Pos Indonesia.',
    problem: 'Gangguan latensi jaringan dan potensi ancaman malware pada endpoint karyawan dapat menghambat layanan operasional logistik dan administrasi harian.',
    solution: 'Menerapkan pemantauan kinerja trafik jaringan secara berkala, mengeksekusi troubleshooting hardware/software secara responsif, serta memperketat aturan firewall & antivirus.',
    stack: ['Cisco Packet Tracer', 'Firewall Configuration', 'Endpoint Antivirus', 'LAN/WAN Diagnostics', 'Hardware Troubleshooting'],
  },
  {
    id: 'jki-research',
    index: '02',
    tag: 'SCHOLARLY PUBLICATION // DATA SCIENCE',
    title: 'Optimasi Klasifikasi Kualitas Udara (Jurnal Khatulistiwa Informatika)',
    org: 'Universitas Nusa Mandiri — Publikasi Ilmiah',
    year: '2025',
    summary: 'Riset komputasi dan publikasi jurnal ilmiah mengenai optimasi algoritma klasifikasi data kualitas udara menggunakan pendekatan Machine Learning.',
    problem: 'Dataset kualitas udara multivariat sering kali memiliki noise dan ketidakseimbangan kelas yang menurunkan akurasi prediksi model standar.',
    solution: 'Merancang pipeline pra-pemrosesan data, seleksi fitur, dan tuning hiperparameter untuk meningkatkan presisi klasifikasi secara terukur.',
    stack: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation', 'Academic Publishing'],
  },
  {
    id: 'ai-web-suite',
    index: '03',
    tag: 'FULL-STACK & AI INTEGRATION',
    title: 'AI Customer Service Chatbot & Nutritional Tracker Web App',
    org: 'Independent Engineering Project',
    year: '2025',
    summary: 'Pengembangan aplikasi web modern terintegrasi AI berupa asisten layanan pelanggan otomatis (Chatbot) serta aplikasi kalkulasi nutrisi harian interaktif.',
    problem: 'Kebutuhan akan antarmuka web responsif yang mampu memproses kueri pengguna secara cerdas dan menyajikan visualisasi metrik secara instan.',
    solution: 'Membangun arsitektur front-end modular dengan integrasi API bahasa alami, manajemen state reaktif, dan pengujian perangkat lunak (Software Testing).',
    stack: ['JavaScript ES6+', 'RESTful API', 'Tailwind CSS', 'UI/UX Architecture', 'Software Testing'],
  },
  {
    id: 'it-audit-cobit',
    index: '04',
    tag: 'IT GOVERNANCE & SECURITY ARCHITECTURE',
    title: 'Enterprise Network Security Topology & IT Audit Framework',
    org: 'Cisco Networking Academy / UNM Lab',
    year: '2025',
    summary: 'Simulasi arsitektur keamanan jaringan berlapis menggunakan Cisco Packet Tracer serta penyusunan laporan audit tata kelola sistem informasi.',
    problem: 'Jaringan kampus dan korporasi rentan terhadap akses ilegal antar-divisi (lateral movement) apabila tidak memiliki segmentasi VLAN dan kebijakan ACL yang ketat.',
    solution: 'Merancang topologi jaringan terisolasi dengan Zone-Based Firewall, pengamanan port switch (Port Security), dan dokumentasi standar audit TI.',
    stack: ['Cisco IOS', 'Access Control Lists', 'VLAN Segmentation', 'Network Security', 'Technical Documentation'],
  },
];

/* ------------------------------------------------------------------ */
/*  Proyek web & repositori GitHub                                      */
/* ------------------------------------------------------------------ */
export const FEATURED = [
  {
    id: 'absensi',
    n: '01',
    title: 'Sistem Absensi Sekolah',
    kind: 'Aplikasi Web',
    desc: 'Sistem absensi modern dengan barcode scanning, laporan real-time, manajemen siswa & guru, dan dashboard analitik berbasis Laravel.',
    url: 'https://github.com/BekaGensss/absensi-barcode',
    tags: ['PHP', 'Laravel', 'CSS'],
    images: [absensi1, absensi2],
  },
  {
    id: 'catur',
    n: '02',
    title: 'Game Catur Python',
    kind: 'Aplikasi Desktop',
    desc: 'Permainan catur lengkap dengan Python — implementasi semua aturan bidak, sistem giliran, dan deteksi skak-mat via OOP.',
    url: 'https://github.com/BekaGensss/game_catur',
    tags: ['Python', 'OOP'],
    images: [catur1, catur2],
  },
  {
    id: 'portfolio',
    n: '03',
    title: 'Portfolio Website',
    kind: 'Proyek Frontend',
    desc: 'Website portfolio interaktif dengan HTML, CSS, dan JavaScript — animasi halus dan layout responsif untuk semua perangkat.',
    url: 'https://github.com/BekaGensss/my-portfolio',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [portfolio1, portfolio2],
  },
];

export const REPOS = [
  { name: 'project-perpustakaan2', lang: 'JavaScript', desc: 'Sistem manajemen perpustakaan modern berbasis web dengan peminjaman, pengembalian, dan laporan buku.', url: 'https://github.com/BekaGensss/project-perpustakaan2' },
  { name: 'aplikasi-keuangan', lang: 'Blade', desc: 'Aplikasi web untuk perencanaan keuangan pribadi — catat pemasukan, pengeluaran, dan kelola anggaran.', url: 'https://github.com/BekaGensss/aplikasi-keuangan' },
  { name: 'web-app-ibadahI', lang: 'TypeScript', desc: 'Aplikasi Islam modern (IbadahKu) untuk menemani ibadah harian. Dibangun dengan Next.js dan Capacitor JS.', url: 'https://github.com/BekaGensss/web-app-ibadahI' },
  { name: 'project-hijab-store', lang: 'Blade', desc: 'Platform e-commerce responsif dengan Laravel 11 — katalog produk, keranjang belanja, dan dashboard admin.', url: 'https://github.com/BekaGensss/project-hijab-store' },
  { name: 'absensi-barcode', lang: 'Blade', desc: 'Sistem absensi sekolah berbasis web menggunakan pemindaian barcode, dibangun dengan Laravel dan PHP.', url: 'https://github.com/BekaGensss/absensi-barcode' },
  { name: 'canvasell', lang: 'Blade', desc: 'Portal manajemen inventaris dan pemesanan untuk produk digital (Redeem Codes) berbasis Laravel.', url: 'https://github.com/BekaGensss/canvasell' },
  { name: 'antrian-online', lang: 'Blade', desc: 'Sistem antrian modern dengan real-time monitoring menggunakan Laravel dan Pusher.', url: 'https://github.com/BekaGensss/antrian-online' },
  { name: 'crime-prediction-app', lang: 'Blade', desc: 'Aplikasi prediksi tingkat kejahatan di Indonesia menggunakan Machine Learning dan Laravel.', url: 'https://github.com/BekaGensss/crime-prediction-app' },
  { name: 'health-info-website', lang: 'JavaScript', desc: 'Sumber informasi kesehatan komprehensif dengan artikel dan infografis. Dibangun dengan React dan Vite.', url: 'https://github.com/BekaGensss/health-info-website' },
];

/* ------------------------------------------------------------------ */
/*  Kapabilitas (dari CV + repositori)                                  */
/* ------------------------------------------------------------------ */
export const CAPABILITIES = [
  {
    key: 'A',
    title: 'Network & Security',
    items: [
      'Jaringan komputer LAN/WAN',
      'Cisco Packet Tracer — simulasi topologi',
      'Switching & routing dasar (CCNAv7)',
      'Pengalamatan IPv4 / IPv6',
      'Keamanan jaringan: ACL, firewall, VPN (materi Cisco NetSec)',
      'Monitoring kinerja jaringan real-time',
    ],
  },
  {
    key: 'B',
    title: 'Software & Web',
    items: [
      'Web development: React, JavaScript, Tailwind CSS',
      'Backend: Laravel / PHP, Node.js, MySQL',
      'Python dan Machine Learning dasar',
      'Pengujian perangkat lunak (software testing)',
      'Dokumentasi teknis',
      'Git & version control',
    ],
  },
  {
    key: 'C',
    title: 'Operations & Tools',
    items: [
      'Troubleshooting hardware dan software',
      'Konfigurasi firewall & antivirus endpoint',
      'Dukungan pengguna (IT Support)',
      'Pelaporan berkala ke tim internal',
      'Microsoft Office',
      'Visual Studio Code',
    ],
  },
];

export const SOFT_SKILLS = [
  'Berorientasi Detail', 'Berpikir Kritis & Analitis', 'Pemecahan Masalah', 'Komunikasi',
  'Negosiasi', 'Pekerja Keras', 'Bekerja di Bawah Tekanan', 'Kerja Tim',
];

export const CAREER_INTEREST = ['Network Administrator', 'Computer Technician'];

/* ------------------------------------------------------------------ */
/*  Pendidikan & pengalaman                                             */
/*  Penanda teks: **tebal**  dan  ^^aksen^^                             */
/* ------------------------------------------------------------------ */
export const TRAJECTORY = [
  {
    id: 's1',
    period: 'MAR 2025 — FEB 2026',
    kind: 'DEGREE // KKNI LV.6',
    accent: true,
    title: 'Sarjana Komputer (S.Kom.) — Informatika',
    org: 'Universitas Nusa Mandiri (UNM) • Jakarta',
    place: 'JAKARTA, ID',
    desc: 'Lulus dengan **IPK 3.81 / 4.00** pada Program Studi Terakreditasi ^^Unggul^^ (LAM INFOKOM). Fokus riset pada Keamanan Jaringan (Cisco), Machine Learning, IT Auditing, serta publikasi ilmiah di Jurnal Khatulistiwa Informatika.',
    action: { label: 'SKPI: 12102/4.04 ↗', type: 'cert', id: 'unm-skpi' },
  },
  {
    id: 'pos',
    period: 'SEP 2022 — NOV 2022',
    kind: 'ENTERPRISE BUMN',
    accent: true,
    title: 'IT Support & Network Operations Intern',
    org: 'PT Pos Indonesia (Persero) • Jakarta Pusat',
    place: 'JAKARTA PUSAT, ID',
    desc: 'Memeriksa dan memperbaiki masalah **hardware dan software** untuk mendukung operasional, **memonitor kinerja jaringan secara real-time**, menangani gangguan jaringan secepat mungkin, serta memantau dan mengonfigurasi **antivirus dan firewall** untuk perlindungan optimal. Rutin melaporkan kinerja sistem dan jaringan kepada tim internal.',
    chips: ['WAN/LAN MONITORING', 'FIREWALL & ANTIVIRUS', 'HW/SW TROUBLESHOOTING'],
    action: { label: 'STUDI KASUS ↗', type: 'work', id: 'pos-netops' },
  },
  {
    id: 'd3',
    period: '2020 — 2023',
    kind: 'ASSOCIATE DEGREE',
    title: 'Diploma Tiga (D3) Teknologi Informasi',
    org: 'Universitas Bina Sarana Informatika (UBSI)',
    place: 'JAKARTA, ID',
    desc: 'Membangun fondasi rekayasa jaringan komputer, administrasi server, pemrograman berorientasi objek, serta berhasil meraih sertifikasi global **Cisco CCNAv7: Introduction to Networks**.',
    action: { label: 'CCNAv7 CERT ↗', type: 'cert', id: 'cisco-ccna' },
  },
  {
    id: 'ppkpi',
    period: 'VOCATIONAL',
    kind: 'COMPETENCY TRAINING',
    title: 'Programming & Software Engineering Training',
    org: 'PPKPI Pasar Rebo • Jakarta Timur',
    place: 'JAKARTA TIMUR, ID',
    desc: 'Pelatihan intensif berbasis kompetensi industri dalam pengembangan aplikasi perangkat lunak, logika algoritma, dan pengujian basis data.',
  },
  {
    id: 'surya',
    period: 'MAR 2019 — APR 2019',
    kind: 'INDUSTRIAL INTERN',
    title: 'Production Documentation & Data Verification',
    org: 'PT Surya Label Jayamanufacturer • Jakarta Utara',
    place: 'JAKARTA UTARA, ID',
    desc: 'Menyusun dan mengelola dokumen produksi secara sistematis, **memeriksa dan memverifikasi keakuratan data** yang tercatat, berkoordinasi dengan tim lain, serta mendukung pengarsipan fisik dan digital.',
  },
];

/* Ringkasan untuk Dossier & CLI */
export const COMPETENCY_SUMMARY = [
  'Lulusan Sarjana Informatika (IPK 3.81) dengan kemampuan pengelolaan jaringan komputer, pengujian, dan pengembangan perangkat lunak.',
  'Bersertifikat Cisco CCNAv7: Introduction to Networks dan Cisco Network Security — konfigurasi jaringan dan dasar keamanan jaringan.',
  'Berpengalaman magang IT Support di PT Pos Indonesia (Persero): troubleshooting hardware/software, monitoring jaringan real-time, serta pengelolaan firewall dan antivirus.',
];

export const TICKER = [
  ...CERTS.filter((c) => c.category !== 'academic').map((c) => `${c.title.toUpperCase()} (${c.date.toUpperCase()})`),
  'S1 INFORMATIKA — IPK 3.81 / 4.00',
  'IT SUPPORT @ PT POS INDONESIA (PERSERO)',
  `SKPI NO: ${PROFILE.skpi}`,
  'PUBLIKASI: JURNAL KHATULISTIWA INFORMATIKA',
];
