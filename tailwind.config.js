/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f7',
          100: '#d4dce9',
          200: '#a9b9d4',
          300: '#7e96bf',
          400: '#5373aa',
          500: '#3a5a96',
          600: '#2d4778',
          700: '#24395f',
          800: '#1e3054',
          900: '#1B2A4A',
          950: '#111c30',
        },
        amber: {
          DEFAULT: '#F5A623',
          50: '#fef8ec',
          100: '#fdefd0',
          200: '#fbdc9f',
          300: '#f9c46e',
          400: '#F5A623',
          500: '#e8920a',
          600: '#c97a08',
          700: '#a36208',
          800: '#7d4b0a',
          900: '#59360c',
        },
        emerald: {
          DEFAULT: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(27, 42, 74, 0.08)',
        'card-hover': '0 8px 32px rgba(27, 42, 74, 0.16)',
        nav: '0 2px 16px rgba(27, 42, 74, 0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
