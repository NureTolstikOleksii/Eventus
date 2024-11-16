import React, { useRef, useState } from 'react';
import './footer.css';
import raccoonImage from './raccoon.gif'; // Импортируем локальное изображение
import soundFile from './raccoon.mp3';

const Footer = () => {
  const audioRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundFile);
      }
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

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
          src={raccoonImage} // Используем импортированное изображение
          alt="Profile"
          className="footer-profile-image"
          onClick={toggleSound}
        />
      </div>
    </footer>
  );
};

export default Footer;
