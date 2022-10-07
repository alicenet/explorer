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
                neonred: '#FF006B',
                deeppurple: '#3E3036',
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
            'mobile': { 'max': '767px' },
            'tablet': { 'min': '768px', 'max': '992px' },
            'computer': { 'min': '993px' },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}