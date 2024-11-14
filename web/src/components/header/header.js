// src/components/header/header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import './header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header>
      <h1>
        <img src={logo} alt="Eventus Logo" />
        Eventus
      </h1>
      <nav>
        <ul>
          <li><Link to="/">Головна</Link></li>
          <li><Link to="/services">Послуги</Link></li>
          <li><Link to="/providers">Постачальники</Link></li>
          <li><Link to="/login">Вхід</Link></li> {/* Ссылка на страницу входа */}
          <li><Link to="/registration">Реєстрація</Link></li>

          <li><Link to="/profile">ПРОФІЛЬ</Link></li> 

        </ul>
      </nav>
    </header>
  );
};

export default Header;
