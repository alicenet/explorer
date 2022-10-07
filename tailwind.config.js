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
                dropgray: '#EEEEEE',
                tableblack: '#444444',
                rowblack: '#343333',
                buttonblack: '#494949',
                headerblack: '#171717'
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