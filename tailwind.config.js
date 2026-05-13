/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#4c1d95',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-violet': 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      },
      animation: {
        'float': 'floatUp 4s ease-in-out infinite',
        'spin-slow': 'loaderSpin 3s linear infinite',
        'pulse-glow': 'loaderPulse 2s ease-in-out infinite',
      },
      boxShadow: {
        'violet': '0 0 40px rgba(124, 58, 237, 0.3)',
        'violet-lg': '0 0 80px rgba(124, 58, 237, 0.25)',
        'card': '0 20px 60px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}