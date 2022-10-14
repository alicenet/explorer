module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    important: true,
    theme: {
        extend: {
            minWidth: {
                '9': '9em'
            }
        },
        screens: {
            'mobile': { 'max': '899px' },
        },
    },
}