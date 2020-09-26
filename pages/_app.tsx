import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
