import React from 'react';
import '../css/HomePage.css'; // Подключение стилей
import dreamCapibara from '../assets/dream-capibara.png'; // Импорт изображения капибары

const HomePage = () => {
  return (
    <div className="home-page">
      
      {/* Блок с изображением под затемнением */}
      <div className="home-page-top-image">
        <div className="overlay"></div> {/* Затемнение */}
        <div className="top-content">
          {/* Левый блок с текстом */}
          <div className="text-block">
            <h1>Організуйте незабутні заходи з нами!</h1>
            <button className="start-button">Розпочати</button>
          </div>
          {/* Правый блок с изображением капибары */}
          <div className="image-block">
            <img src={dreamCapibara} alt="Dream Capibara" className="capibara-image" />
          </div>
        </div>
        
      </div>

      {/* Основной контент */}
      <div className="main-content">
        <h2>Категорії</h2>
        <p>Додаткова інформація про заходи...</p>
        <div style={{ height: '500px' }}>Длинный контент для демонстрации прокрутки.</div>
      </div>
    </div>
  );
};

export default HomePage;
