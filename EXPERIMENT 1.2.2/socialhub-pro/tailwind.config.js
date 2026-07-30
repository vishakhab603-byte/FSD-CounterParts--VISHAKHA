/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0E17',
          900: '#0F1420',
          800: '#161C2C',
          700: '#1E2637',
          600: '#2A3348',
          500: '#3A4560',
        },
        mist: {
          400: '#5B6478',
          300: '#8B93A8',
          200: '#B8BECC',
          100: '#E7E9F3',
        },
        violet: {
          DEFAULT: '#7C5CFC',
          soft: '#9B82FF',
          dim: '#5B3FD9',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          dim: '#1AA394',
        },
        amber: {
          DEFAULT: '#F5A623',
          dim: '#C9820F',
        },
        rose: {
          DEFAULT: '#FB5D74',
          dim: '#D63F56',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(124,92,252,0.4), 0 0 24px rgba(124,92,252,0.25)',
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(0.85)' },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        toastIn: {
          '0%': { opacity: 0, transform: 'translateX(24px) scale(0.96)' },
          '100%': { opacity: 1, transform: 'translateX(0) scale(1)' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        rise: 'rise 0.35s ease-out both',
        toastIn: 'toastIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
