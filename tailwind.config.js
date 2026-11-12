/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F5F0',
          50: '#FDFAF7',
          100: '#F7F5F0',
          200: '#EFEBE1',
          300: '#E4DDD0',
        },
        forest: {
          DEFAULT: '#24483B',
          50: '#F0F5F2',
          100: '#DEECE4',
          200: '#BED9CC',
          700: '#24483B',
          800: '#1C392F',
          900: '#142921',
        },
        charcoal: {
          DEFAULT: '#242824',
          light: '#3A3F3A',
          muted: '#636963',
          faint: '#8E948E',
        },
        terracotta: {
          DEFAULT: '#C8795A',
          dark: '#B06547',
          light: '#DE9376',
          faint: '#F7EBE6',
        },
        sage: {
          DEFAULT: '#DDE5D9',
          light: '#EAF0E7',
          dark: '#B5C4B0',
        },
        beige: {
          DEFAULT: '#EAE4D8',
          light: '#F4F0E8',
          dark: '#D9D0C1',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(36, 40, 36, 0.04)',
        'soft': '0 10px 30px -10px rgba(36, 40, 36, 0.08)',
        'elevated': '0 20px 40px -15px rgba(36, 40, 36, 0.12)',
        'inner-light': 'inset 0 1px 2px rgba(255, 255, 255, 0.6)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

