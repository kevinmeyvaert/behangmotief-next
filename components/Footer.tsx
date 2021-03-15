import { show } from "cookie-though"

const Footer = () => {
  return (
    <footer className="c-row c-row--flush footer">
      <div className="o-container o-flex o-align-center o-justify-space-between">
        <p><a onClick={() => show()} style={{ cursor: 'pointer' }} title='Manage your cookie preferences'>Manage cookies</a></p>
        <p>Made with ♥️ in Gent.</p>
        <div>
          <a href="https://instagram.com/behangmotief" target="_blank" title="@behangmotief on Instagram">
            @behangmotief
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
