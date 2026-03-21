/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Fraunces', 'serif'],
                body: ['DM Sans', 'sans-serif'],
            },
            colors: {
                primary: '#2F3A45',
                secondary: '#6B7684',
                muted: '#8A95A3',
                accent: '#7060A8',
                success: '#3A7A54',
            },
            transitionDuration: {
                DEFAULT: '180ms',
            },
        },
    },
    plugins: [],
}
