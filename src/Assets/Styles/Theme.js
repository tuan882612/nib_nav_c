import { green, orange, pink } from '@mui/material/colors';
import { createTheme } from '@mui/system';


export const appTheme = createTheme({
    palette: {
        primary: green,
        secondary: pink,
        default: orange
    }
})