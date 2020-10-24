import type { AppProps } from 'next/app';
import MobileNavigationContextWrapper, {
  MobileNavigationContext,
} from '../context/MobileNavContext';
import '../styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MobileNavigationContextWrapper>
      <MobileNavigationContext.Consumer>
        {({ mobileNavActive }) => (
          <div id="body" className={mobileNavActive ? 'has-open-nav' : undefined}>
            <Component {...pageProps} />
          </div>
        )}
      </MobileNavigationContext.Consumer>
    </MobileNavigationContextWrapper>
  );
}

export default MyApp;
