/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        resort: {
          50: '#FBF9F5',
          100: '#F6F2EA',
          200: '#EDE4D4',
          300: '#DFCDB3',
          400: '#C7AC87',
          500: '#AF8E60',
          600: '#8E7047',
          700: '#6E5535',
          800: '#4C3B24',
          900: '#2A2114',
        },
        forest: {
          800: '#152520',
          900: '#0C1613',
          950: '#070E0C',
        },
        gold: {
          light: '#F4E5BE',
          DEFAULT: '#D4AF37',
          dark: '#B08B21',
        }
      },
      boxShadow: {
        'luxury': '0 20px 45px -15px rgba(12, 22, 19, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'dropdown': '0 12px 35px -5px rgba(12, 22, 19, 0.22)',
      }
    },
  },
  plugins: [],
}
