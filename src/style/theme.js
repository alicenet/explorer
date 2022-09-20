import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#00FFD1',
        },
        secondary: {
            main: '#ff79b0',
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
        }
    },
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiFab: {
            size: 'small',
        },
        MuiFormControl: {
            margin: 'dense',
            size: 'small',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiRadio: {
            size: 'small',
        },
        MuiSwitch: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            size: 'small',
        },
    },
});