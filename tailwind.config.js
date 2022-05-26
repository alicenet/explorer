module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    important: true,
    theme: {
        extend: {
            colors: {
                dark: '#212121',
                lightgray: '#A7A6A6',
                cleargray: '#DEDEDE',
                darkgray: '#2D2D2D',
                neongreen: '#00FFD1',
                dropgray: '#EEEEEE',
                tableblack: '#383737',
                rowblack: '#343333',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}