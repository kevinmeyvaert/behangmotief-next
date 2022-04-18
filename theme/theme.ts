import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
};

const styles = {
  global: (props) => ({
    body: {
      color: mode('black', 'white')(props),
      bg: mode('white', 'black')(props),
    },
  }),
};

const theme = extendTheme({
  config,
  styles,
  fonts: {
    heading: 'Merriweather Sans, sans-serif',
    body: 'Merriweather Sans, sans-serif',
  },
});

export default theme;
