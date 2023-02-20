import { createTheme, responsiveFontSizes } from '@mui/material/styles';

/**
 * Theme for styling of all components in application
 */
const Theme = createTheme({
  typography : {
    fontFamily: ['Montserrat'].join(',')
  },
  components : {
    MuiButton : {
      styleOverrides : {
        root: {
          borderRadius: 'calc(8px + 1vmin)', //Rounded buttons
        },
      },
    },
  },
  palette: {
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    //The main color for components
    primary: { 
      main: '#2F3C7E' 
    }, 
    //Accent color, sparingly used for components
    secondary: { 
      main: '#FBEAEB' 
    },
    container: {
      light: '#EEEEEE',
      main: '#CCCCCC',
      dark: '#999999',
    },
    contrastThreshold: 3,
    tonalOffset: .3
  },
});

/**
 * 'Module augmentation' is necessary in TS to to define custom options
 */
declare module '@mui/material/styles' {
  interface Palette { 
    container: Palette['primary'];
  }
  interface PaletteOptions {
    container: PaletteOptions['primary'];
  }
}

const THEME = responsiveFontSizes(Theme);
export default THEME;