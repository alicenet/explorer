import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#00FFD1',
        },
        secondary: {
            main: '#FF006B',
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
});