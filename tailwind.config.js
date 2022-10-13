module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    important: true,
    theme: {
        extend: {
            colors: {
                rowblack: '#343333',
                tableblack: '#444444',
            },
            height: {
                '19/20': '95%',
            },
            minWidth: {
                '9': '9em'
            }
        },
        screens: {
            'mobile': { 'max': '899px' },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}