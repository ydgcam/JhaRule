import { createTheme, responsiveFontSizes } from '@mui/material/styles';

/**
 * Resources Cited: 
 * https://mui.com/customization/theming/
 * and subsequent links from this page
 */

const Theme = createTheme({
  typography : {
    fontFamily: ['Roboto', 'Avenir Next'].join(',')
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
    //The main color for components, lineup color :)
    primary: { 
      main: '#339966' 
    }, 
    //Accent color, sparingly used for components. Here i have used Quest diagnostics's
    //counterpart on their website, which is similar to the MUI default for this.
    secondary: { 
      main: '#80276c' 
    },
    /* 
      Think of this as a way to define background colors.
      Should be used for things such as: Grid, div, Container etc... things that are techinically 
      'components' but that are used to specify space on a page. 
    */
    container: {
      light: '#DDDDDD',
      main: '#BFB5AB',
      dark: '#AC9F92',
    },
    contrastThreshold: 3,
    /*
      Pallete options with main assigned get two other calculated values light and dark.
      These values are calculated using the tonalOffset (real: [0-1]) value provided. 
    */
    tonalOffset: 0.3,
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
  /*
    Example of how to define your own config variables: palette, typography, etc...
    interface Theme {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
    interface ThemeOptions {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  */

  /*
    Example of how to define your own palette options: main, light, dark, etc...
    interface PaletteColor {
      default?: string;
      alternate?: string
    }
    interface SimplePaletteColorOptions {
      default?: string;
      alternate?: string
    }
  */
}

const THEME = responsiveFontSizes(Theme);
export default THEME;