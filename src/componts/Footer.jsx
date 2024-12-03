import React from "react";
import "./Footer.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>CarFix</h2>
          <p>Providing quality services since 2010.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a onClick={() => scrollToSection('HeaderBar')} style={{ cursor: 'pointer' }}>
                Home
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('About')} style={{ cursor: 'pointer' }}>
                About
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('Services')} style={{ cursor: 'pointer' }}>
                Services
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CarFix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
