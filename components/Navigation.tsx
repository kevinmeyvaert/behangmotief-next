import Link from 'next/link';

const Navigation = ({ items }) => {
  return (
    <section className="c-row c-navigation">
      <nav className="o-container o-flex o-align-center o-justify-end">
        <ul className="c-navigation--series">
          {items.map((item) => (
            <li key={item.slug}>
              <Link href="/series/[slug]" as={`/series/${item.slug}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <span>|</span>
        <ul className="c-navigation--main">
          <li>
            <Link href="/about" as="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
