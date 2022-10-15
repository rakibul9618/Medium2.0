/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '450px': '450px',
        '440px': '440px',
      },
      backgroundImage: {
        'sign_in_bg': "url('../public/images/icons-gray-bg.svg')",
      },
    },
  },
  plugins: [],
};
