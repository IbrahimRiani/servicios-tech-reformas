/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf8f5',
        accent: '#FF6600',
        'accent-light': '#ff8533',
        'accent-dim': 'rgba(255, 102, 0, 0.1)',
        'accent-glow': 'rgba(255, 102, 0, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 102, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 102, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}