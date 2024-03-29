import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';

import theme from '../theme/theme';

export function reportWebVitals({ id, name, label, value }) {
  if (!(window as any).dataLayer) {
    return;
  }
  (window as any).dataLayer.push({
    event: 'web-vitals',
    event_category: `Vitals ${label} metric`,
    event_action: name,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    event_value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
  });
}

function Tracking({ children }) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_GTM });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!window || !(window as any).dataLayer) return;

      (window as any).dataLayer.push({
        event: 'VirtualPageView',
        path: router.asPath, // This is not needed, but could be passed through and used in GTM
        title: document.title,
      });
    }, 0);
  }, [router.asPath]);

  return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: any }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Tracking>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </Tracking>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;
