/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-green': 'linear-gradient(180deg, #1B263B, #0D1B2A, #49416D)',
      },
      colors: {
        color: {
          primary: '#eeeeee',
          accent: '#0D1B2A',
          secondary: '#E7C672',
          dark: '#1B263B',
          yellow: '#FFC639',
          red: "#E94242",
          blue: "#CBC5EA",
          hover: "#49416D"
        }
      }
    },
  },
  plugins: [],
};
