import Link from 'next/link';
import { useContext } from 'react';
import { MobileNavigationContext } from '../context/MobileNavContext';

const Navigation = ({ items }) => {
  const { toggleMobileNav, mobileNavActive } = useContext(MobileNavigationContext);
  return (
    <>
      <section className={mobileNavActive ? 'c-row c-nav c-nav-dark' : 'c-row c-nav c-nav-light'}>
        <div className="o-container o-flex o-align-center o-justify-end">
          <div className="c-nav-actions">
            <a onClick={toggleMobileNav} className="c-nav-trigger">
              <span className="is-hidden">Menu</span>
              <span className="c-nav-trigger__top" />
              <span className="c-nav-trigger__middle" />
              <span className="c-nav-trigger__bottom" />
            </a>
          </div>
        </div>
        <nav className={mobileNavActive ? undefined : 'is-hidden'}>
          <div className="o-container">
            <div className="o-grid o-grid--gutter">
              <div className="o-grid__item u-1-of-3-bp2">
              <h2>Behangmotief</h2>
                <ul className="c-navigation--main">
                  <li>
                    <Link href="/about" as="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/" as="/">
                      Wannabes
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="o-grid__item u-1-of-3-bp2">
                <h2>Series</h2>
                <ul className="c-navigation--main">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link href="/series/[slug]" as={`/series/${item.slug}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navigation;
