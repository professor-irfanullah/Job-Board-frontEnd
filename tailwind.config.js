/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        w100: '100px',
        w150: '150px',
        w200: '200px',
        w250: '250px',
        w300: '300px',
        w350: '350px',
        w400: '400px',
        w450: '450px',
        w500: '500px',
        w600: '600px',
        w700: '700px',
        w800: '800px',
        w900: '900px',
        w1000: '1000px',
        w1300: '1300px',

      },
    },
  },
  plugins: [],
}

