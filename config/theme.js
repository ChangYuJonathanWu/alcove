import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: { main: red.A400, },
    },
    typography: {
        h1: {
            fontSize: '1.8rem'
        },
        h3: {
            fontSize: '1.2rem',
        },
        h4: {
            fontSize: "1rem",
            fontWeight: "500"

        }
    },
    components:{
        MuiSpeedDialAction: {
            styleOverrides: {
                staticTooltipLabel: {
                    maxWidth: 'none',
                    whiteSpace: 'nowrap',
                    
                }
            }
        }
    }
});


export default theme;