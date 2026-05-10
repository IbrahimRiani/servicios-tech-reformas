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
        background: '#030712',
        accent: '#3b82f6',
        'accent-light': '#60a5fa',
        'accent-dim': 'rgba(59, 130, 246, 0.1)',
        'accent-glow': 'rgba(59, 130, 246, 0.5)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}