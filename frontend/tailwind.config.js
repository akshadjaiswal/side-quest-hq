/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutral theme
        background: {
          DEFAULT: '#FDFCFB',
          secondary: '#F9F7F4',
          tertiary: '#F5F1E8',
        },
        foreground: {
          DEFAULT: '#292524',
          secondary: '#57534E',
          tertiary: '#78716C',
          muted: '#A8A29E',
        },
        primary: {
          DEFAULT: '#D97706',
          hover: '#B45309',
          light: '#FEF3C7',
        },
        // Status colors
        status: {
          active: '#059669',
          'active-light': '#D1FAE5',
          paused: '#EA580C',
          'paused-light': '#FFEDD5',
          abandoned: '#78716C',
          'abandoned-light': '#E7E5E4',
          shipped: '#2563EB',
          'shipped-light': '#DBEAFE',
        },
        // Graveyard theme (softer, more elegant dark theme)
        graveyard: {
          background: '#1E1B2E',      // Softer dark purple-gray
          'background-light': '#2D2640', // Muted purple
          text: '#E5DEFF',            // Warmer lavender
          accent: '#9D8DF1',          // Softer purple accent
          sepia: '#6B4423',           // Warmer sepia tone
        },
        border: {
          DEFAULT: '#E7E5E4',
          medium: '#D6D3D1',
          dark: '#A8A29E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
