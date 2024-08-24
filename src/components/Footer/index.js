import React from 'react';
import './index.css'; // Optional: Create a CSS file for styling
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 made by christine</p>
        <div className="footer-links">
          <Link to={`/about`}>About</Link>
          <a href="https://www.linkedin.com/in/christine-kim-29b272215/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/aesteri" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://instagram.com/kristi_kreme__" target="_blank" rel="noopener noreferrer">IG</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
