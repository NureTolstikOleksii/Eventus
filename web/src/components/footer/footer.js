import React from 'react';
import './footer.css';
import racoonImage from './racoon.gif'; // Импортируем локальное изображение

const Footer = () => {
  return (
    <footer className="footer">
      {/* Заголовок EVENTUS */}
      <div className="footer-header">
        <h2>EVENTUS</h2>
      </div>

      {/* Контейнер для колонок */}
      <div className="footer-container">
        <div className="footer-column">
          <p>Email: eventus@example.com</p>
          <p>Про нас</p>
        </div>
        <div className="footer-column">
          <p>Постачальники</p>
          <p>Відгуки</p>
        </div>
        <div className="footer-column">
          <p>Часті питання (FAQ)</p>
        </div>
      </div>

      {/* Картинка справа */}
      <div className="footer-profile">
        <img
          src={racoonImage} // Используем импортированное изображение
          alt="Profile"
          className="footer-profile-image"
        />
      </div>
    </footer>
  );
};

export default Footer;
