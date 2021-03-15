import '../styles/index.scss';

import { init } from 'cookie-though';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';

import MobileNavigationContextWrapper, {
  MobileNavigationContext,
} from '../context/MobileNavContext';
import usePolicy from '../hooks/usePolicy';
import { config, CookiePolicy } from '../lib/ct';

if (typeof window !== 'undefined') {
  init(config);
}

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
  const [enabled, setEnabled] = useState(false);
  const policy = usePolicy(CookiePolicy.Statistics);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (policy) {
      TagManager.initialize({ gtmId: process.env.NEXT_GTM });
      return setEnabled(true);
    }
    if (enabled) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [policy]);
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Tracking>
      <MobileNavigationContextWrapper>
        <MobileNavigationContext.Consumer>
          {({ mobileNavActive }) => (
            <div id="body" className={mobileNavActive ? 'has-open-nav' : undefined}>
              <Component {...pageProps} />
            </div>
          )}
        </MobileNavigationContext.Consumer>
      </MobileNavigationContextWrapper>
    </Tracking>
  );
}

export default MyApp;
