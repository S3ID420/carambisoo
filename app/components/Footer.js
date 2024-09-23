import React from 'react';
import Link from 'next/link';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>© 2024 Carambisoo. All rights reserved.</p>
          <ul className="footer-links">
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Social Media Section */}
          <div className="social-media">
            <ul className="social-links">
              <li>
                <a href="https://facebook.com" target="_blank" aria-label="Facebook" rel="noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" aria-label="Twitter" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" aria-label="Instagram" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" rel="noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
