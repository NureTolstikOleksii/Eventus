import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Добро пожаловать на Eventus!</h1>
      <p>Это ваш помощник в организации незабываемых событий.</p>
      <button className="get-started-button">Начать</button>
    </div>
  );
}

export default HomePage;