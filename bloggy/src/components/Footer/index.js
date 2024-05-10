import React from 'react';
import './index.css'; // Optional: Create a CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 made by christine</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="https://www.linkedin.com/in/christine-kim-29b272215/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/aesteri" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
