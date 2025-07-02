module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626', // red-600
          light: '#ef4444', // red-500
          dark: '#b91c1c', // red-700
        },
      },
    },
  },
  plugins: [],
}; 