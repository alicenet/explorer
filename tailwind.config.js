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
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}