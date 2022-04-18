import { ColorModeScript } from '@chakra-ui/color-mode';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import theme from '../theme/theme';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <style>
            {`
          .c-masonry {
  display: flex;
  margin-left: calc(var(--chakra-space-6)*-1); /* gutter size offset */
  width: auto;
}

.c-masonry--grid-column {
  padding-left: var(--chakra-space-6); /* gutter size */
  background-clip: padding-box;
}`}
          </style>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
