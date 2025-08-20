/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tambahkan dark mode dan tentukan file yang akan dipindai Tailwind
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Menambahkan animasi kustom
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'blink': 'blink 1.2s infinite',
        'pulse-strong': 'pulse-strong 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Mendefinisikan keyframes untuk animasi kustom
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'pulse-strong': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}