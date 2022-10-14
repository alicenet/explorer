import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#00FFD1',
            light: '#00FFD114',
        },
        secondary: {
            main: '#ff79b0',
            dark: '#3E3036',
        },
        headerBlack: {
            main: '#171717',
        },
        dark: {
            main: '#212121',
            light: '#0000000A',
        },
        darkGray: {
            main: '#2D2D2D',
        },
        rowBlack: {
            main: '#343333',
        },
        tableBlack: {
            main: '#444444',
        },
        buttonBlack: {
            main: '#494949',
        },
        lightGray: {
            main: '#A7A6A6',
        },
        clearGray: {
            main: '#DEDEDE',
        },
        dropGray: {
            main: '#EEEEEE',
        },
    },
    typography: {
        fontFamily: 'Ubuntu Mono',
        button: {
            fontSize: '1.15rem',
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    padding: '10px',
                    fontSize: '0.75rem',
                },
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#444444'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        "-webkit-appearance": "none",
                        width: 10,
                    },
                    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                    },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "rgba(128, 135, 139, 0.8)",
                    },
                }
            }
        }
    }
});