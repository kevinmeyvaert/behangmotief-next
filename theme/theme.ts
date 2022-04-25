import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
};

const styles = {
  global: (props) => ({
    body: {
      color: mode('black', 'white')(props),
      bg: mode('#fcfcff', 'black')(props),
    },
  }),
};

const theme = extendTheme({
  config,
  styles,
  sizes: {
    container: {
      '2xl': '1920px',
    },
  },
  fonts: {
    heading: 'Helvetica, sans-serif',
    body: 'Helvetica, sans-serif',
  },
  components: {
    Button: {
      variants: {
        unstyled: { display: 'flex', alignItems: 'center', justifyContent: 'center', px: 4 },
      },
      baseStyle: {
        bg: 'none',
        _focusVisible: {
          boxShadow: 'none',
        },
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
