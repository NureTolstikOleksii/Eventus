// src/components/footer/footer.js

import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2023 Eventus. All rights reserved.</p>
      <nav>
        <ul>
          <li><a href="/privacy">Політика конфіденційності</a></li>
          <li><a href="/terms">Умови використання</a></li>
          <li><a href="/contact">Контакти</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
