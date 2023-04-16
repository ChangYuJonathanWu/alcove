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
            fontSize: '1.2rem'
        }
    }
});


export default theme;