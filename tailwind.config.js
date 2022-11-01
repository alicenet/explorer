module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    important: true,
    theme: {
        screens: {
            'mobile': { 'max': '899px' },
        },
    },
}