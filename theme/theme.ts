import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: props.colorMode === 'dark' ? 'white' : 'black',
      bg: props.colorMode === 'dark' ? 'black' : '#fcfcff',
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
