/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FCFAF7',
          100: '#F7F3EE',
          200: '#EFE8DE',
          300: '#E4D8CA',
          DEFAULT: '#F9F6F0',
        },
        cream: {
          50: '#FCFAF6',
          100: '#F7F3EB',
          200: '#EFE6D8',
          300: '#E5D6C1',
          400: '#D5BE9F',
          500: '#C2A37B',
        },
        espresso: {
          50: '#F4ECE8',
          100: '#E5D5CD',
          200: '#C7A899',
          300: '#A47864',
          400: '#7B4E3A',
          500: '#542E1F',
          600: '#422216',
          700: '#32190F',
          800: '#251610',
          900: '#1B110B',
          950: '#120A06',
        },
        terracotta: {
          300: '#D9826C',
          400: '#C76A52',
          500: '#B85D43',
          600: '#9E4E39',
          700: '#843E2B',
          DEFAULT: '#9E4E39',
        },
        sage: {
          300: '#96A99D',
          400: '#7E9385',
          500: '#6E8276',
          600: '#5E6F64',
          700: '#4A584F',
          DEFAULT: '#5E6F64',
        },
        burgundy: {
          500: '#8A243D',
          600: '#6B1D2F',
          700: '#521422',
          800: '#3D0D18',
          900: '#2A080F',
        },
        vintageGold: {
          300: '#E5C77D',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A8823C',
          700: '#8A682D',
        },
        vintagePaper: '#F9F6F0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'vintage': '0 4px 20px -2px rgba(27, 17, 11, 0.12), 0 2px 6px -1px rgba(27, 17, 11, 0.08)',
        'vintage-lg': '0 12px 36px -4px rgba(27, 17, 11, 0.20), 0 4px 12px -2px rgba(27, 17, 11, 0.10)',
        'gold-glow': '0 0 30px rgba(197, 160, 89, 0.25)',
        'terracotta-glow': '0 0 25px rgba(158, 78, 57, 0.25)',
      },
      backgroundImage: {
        'paper-texture': "radial-gradient(#C5A059 0.5px, transparent 0.5px), radial-gradient(#C5A059 0.5px, #FAF6EE 0.5px)",
      }
    },
  },
  plugins: [],
};

