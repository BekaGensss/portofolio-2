# 🌟 Portofolio Kreatif & Interaktif — Bara Kusuma

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38bdf8.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff007f.svg?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed to GitHub Pages](https://img.shields.io/badge/Deployed_to-GitHub_Pages-22c55e.svg?logo=github&logoColor=white)](https://BekaGensss.github.io/portofolio-2)

Portofolio ini merupakan aplikasi web satu halaman (SPA) berkinerja tinggi yang dirancang secara khusus untuk menyajikan profil profesional secara estetik, interaktif, dan responsif. Aplikasi ini menggabungkan desain minimalis modern dengan efek mikro-interaksi canggih untuk memberikan pengalaman pengguna yang tak terlupakan.

---

## ✨ Fitur Utama & Mikro-Interaksi Premium

### 1. 💫 Custom Spring-Physics Cursor (Kursor Interaktif Pegas)
Sistem kursor default browser digantikan dengan sistem kursor ganda dinamis berbasis fisika pegas (*spring-physics*):
* **Outer Ring & Inner Dot**: Cincin luar mengikuti kursor dengan efek jeda pegas yang halus, sementara titik dalam melacak posisi secara instan.
* **Ambient Cursor Spotlight (Pendar Cahaya)**: Pendar cahaya latar belakang (*glow aura*) lembut yang mengikuti kursor untuk menerangi elemen visual secara dinamis di mode gelap.
* **Interactive Lock & Scale**: Cincin kursor secara otomatis membesar dan membungkus elemen interaktif (tombol, tautan, kartu proyek) saat diarahkan (*hover*), memberikan umpan balik taktil yang memuaskan.
* **Touch-Screen Protection**: Secara cerdas dinonaktifkan pada perangkat layar sentuh (mobile/tablet) untuk menjaga keandalan navigasi.

### 2. 👾 Modern "Evil Loader" (Animasi Loading Pintar)
Mengganti animasi pemuatan tradisional dengan karakter animasi *Evil Loader* yang interaktif dan responsif terhadap tema:
* **Tema Gelap**: Karakter berwarna abu-abu terang (`#eee`) agar terlihat kontras di atas latar belakang gelap gulita (`#0a0a0a`).
* **Tema Terang**: Karakter otomatis menyesuaikan warna menjadi hitam gelap (`#111`) dengan sorotan tepi (*inset shadow*) yang indah.
* **Efek Teks Dinamis**: Menampilkan animasi ketikan "Loading..." bergaya elegan dengan font *Julius Sans One*.

### 3. 🌗 Sistem Tema Dual-Mode (Light & Dark)
* Perpindahan tema yang halus dengan transisi warna latar belakang CSS.
* Penyimpanan otomatis pilihan preferensi tema pengguna menggunakan `localStorage` agar tetap tersimpan saat halaman dimuat ulang.

### 4. 📁 Manajemen Proyek Interaktif (Modals)
* Proyek ditampilkan dalam format kartu grid bernuansa *glassmorphism* modern.
* Klik pada kartu proyek akan membuka modal detail yang responsif, menyajikan deskripsi lengkap, tag teknologi, tautan demo langsung, dan repositori kode.

### 5. 📧 Formulir Kontak Terintegrasi
* Formulir yang divalidasi penuh dan terintegrasi langsung dengan layanan **Formspree** pihak ketiga untuk mempermudah penerimaan pesan secara langsung.

---

## 🛠️ Stack Teknologi

* **Library Utama**: [React.js](https://react.dev/) (v19)
* **Styling & Tata Letak**: [Tailwind CSS](https://tailwindcss.com/) & [Styled Components](https://styled-components.com/)
* **Pustaka Animasi**: [Framer Motion](https://www.framer.com/motion/)
* **Efek Latar Belakang**: [React tsparticles](https://github.com/matteobruni/tsparticles)
* **Teks Efek**: [React Typed](https://github.com/ssrw/react-typed)

---

## 🚀 Alur Kerja & Perintah Pengembangan

Proyek ini menggunakan script bawaan React dan gh-pages untuk manajemen deployment otomatis:

### 1. Menjalankan Server Lokal (Development)
Untuk menjalankan aplikasi dalam mode pengembangan lokal dengan hot-reload:
```bash
npm start
```

### 2. Membangun Proyek (Production Build)
Untuk melakukan kompilasi dan optimasi bundle produksi:
```bash
npm run build
```

### 3. Deploy Otomatis ke GitHub Pages
Proyek ini dikonfigurasi untuk langsung melakukan *predeploy* (membangun ulang versi produksi terkini) dan mengunggahnya ke branch `gh-pages` hanya dengan satu perintah:
```bash
npm run deploy
```

---

## 📂 Struktur Direktori Proyek

```text
portofolio-2/
├── public/                 # Aset statis (ikon, font, dll.)
├── src/
│   ├── assets/             # Aset gambar dan media lokal
│   ├── components/         # Komponen UI modular
│   │   ├── CustomCursor.jsx# Kursor pegas interaktif & ambient glow
│   │   ├── Loader.jsx      # Evil Loader yang adaptif terhadap tema
│   │   ├── Hero.jsx        # Bagian landing utama
│   │   ├── Projects.jsx    # Grid proyek dengan efek hover
│   │   └── ...
│   ├── App.js              # Entrypoint utama aplikasi React
│   ├── index.css           # Styling dasar, scrollbar, dan keyframes
│   ├── ThemeContext.js     # State management untuk pergantian tema
│   └── index.js            # Render DOM React
├── package.json            # Konfigurasi dependensi dan perintah script
└── tailwind.config.js      # Kustomisasi sistem Tailwind CSS
```
