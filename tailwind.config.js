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
        background: '#FFFFFF',
        'background-alt': '#F5F5F5',
        'industrial-orange': '#E65100',
        'industrial-orange-light': '#FF6600',
        accent: '#E65100',
        'text-primary': '#111111',
        'text-secondary': '#333333',
        'border-industrial': '#d4d4d4',
        'navy-dark': '#1a2942',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'industrial': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'industrial-hover': '0 4px 8px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}