
import { createTheme } from '@mui/material/styles';
import { pink, red } from "@mui/material/colors";



export const purpleTheme = createTheme({
  palette: {
        primary: {
            main: pink[300],
        },
        secondary: {
            main: '#f8bbd0',
        },
        error: {
            main: red.A700,
          }, 
    }
    
  }) 