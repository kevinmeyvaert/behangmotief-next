import Logo from './Logo';

const Navigation = ({ isDark }) => {
  return (
    <>
      <section className="c-row c-nav">
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
      </section>
    </>
  );
};

export default Navigation;
