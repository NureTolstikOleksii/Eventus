import React from 'react';
import '../css/HomePage.css';
import Header from '../components/header/header';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Home Page Content</h2>
        {/* Остальной контент домашней страницы */}
      </main>
    </div>
  );
};

export default HomePage;
