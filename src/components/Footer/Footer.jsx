import Icon from '../Icon';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <span className="footer-brand">foodies</span>
        <div className="footer-socials">
          <a href="https://www.facebook.com/goITclub/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Icon name="facebook" size={20} />
          </a>
          <a href="https://www.instagram.com/goitclub/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Icon name="instagram" size={20} />
          </a>
          <a href="https://www.youtube.com/c/GoIT" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Icon name="youtube" size={20} />
          </a>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <p className="footer-copyright">@2024, Foodies. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
