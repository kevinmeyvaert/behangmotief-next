import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { MobileNavigationContext } from '../context/MobileNavContext';
import Logo from './Logo';

const Navigation = ({ items, isDark }) => {
  const { toggleMobileNav, mobileNavActive } = useContext(MobileNavigationContext);
  return (
    <>
      <section className='c-row c-nav'>
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
        <div className="o-container o-flex o-align-center o-justify-center">
          <Logo
            title="Behangmotief"
            link="/"
            isDark={isDark}
            style={{
              marginBottom: '20px',
              '--scroll': !isDark ? 1 : 0.5,
            }}
          />
        </div>
        <nav className={mobileNavActive ? undefined : 'is-hidden'}>
          <div className="o-container c-nav-active">
            <div className="o-grid o-grid--gutter">
              <div className="o-grid__item u-1-of-3-bp2">
                <h2>Behangmotief</h2>
                <ul className="c-navigation--main">
                  <li>
                    <Link href="/about">
                      <a onClick={() => toggleMobileNav()}>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/wannabes">
                      <a onClick={() => toggleMobileNav()}>Wannabes</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="o-grid__item u-1-of-3-bp2">
                <h2>Series</h2>
                <ul className="c-navigation--main">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/series/${item.slug}`}>
                        <a onClick={() => toggleMobileNav()}>{item.title}</a>
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
