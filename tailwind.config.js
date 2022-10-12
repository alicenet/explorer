module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    important: true,
    theme: {
        extend: {
            colors: {
                headerblack: '#171717',
                dark: '#212121',
                darkgray: '#2D2D2D',
                rowblack: '#343333',
                tableblack: '#444444',
                lightgray: '#A7A6A6',
                cleargray: '#DEDEDE',
                dropgray: '#EEEEEE'
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