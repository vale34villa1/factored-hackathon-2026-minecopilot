module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        minebg: '#09111f',
        minepanel: '#111827',
        accent: '#7dd3fc',
        warning: '#fbbf24',
        critical: '#f87171',
        success: '#4ade80',
      },
      boxShadow: {
        glow: '0 0 30px rgba(125,211,252,0.2)',
      },
    },
  },
  plugins: [],
}
