/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
 theme: {
    extend: {
      colors: {
        // Dark navy background
        'primary-dark': '#0F1B42',
        
        // White for text
        'text-white': '#FFFFFF',
        
        // Light blue/white glow elements (like the logo and emphasis text)
        'accent-light': '#F2F7FF',
        
        // Subtle gradient blue for text (trustless solutions)
        'gradient-blue-start': '#5A88F7',
        'gradient-blue-end': '#788EFD',
        
        // Lighter blue for secondary elements
        'secondary-blue': '#2A5ACF',
        
        // Accent bright blue/purple
        'accent-blue': '#587DFF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        // Adding a gradient for the title text like "Trustless Solutions"
        'title-gradient': 'linear-gradient(90deg, #5A88F7, #788EFD)',
      },
      boxShadow: {
        'logo-glow': '0 0 15px rgba(82, 145, 255, 0.4)',
      },
    },
  },
  plugins: [],
}

