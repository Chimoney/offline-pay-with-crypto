import { createTheme } from '@mui/material'
const font = "'EB Garamond', sans-serif"

// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#35D07F',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FBCC5C',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: font,
    button: {
      textTransform: 'none',
    },
  },
})

export default theme
