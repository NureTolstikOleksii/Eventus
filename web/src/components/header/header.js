import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Используем контекст
import './header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const { userName, setUserName } = useUser();

  const fetchUserName = async () => {
    try {
      const response = await fetch('http://localhost:4200/session', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.name) {
          setUserName(data.name); // Устанавливаем имя пользователя в контексте
        }
      }
    } catch (error) {
      console.error('Failed to fetch session data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4200/profile/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUserName(''); // Сбрасываем имя пользователя
        alert('Ви успішно вийшли!');
      } else {
        alert('Не вдалося виконати вихід. Спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Виникла помилка під час виходу.');
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <header>
      <Link to="/" className="logo-link">
        <h1>
          <img src={logo} alt="Eventus Logo" />
          Eventus
        </h1>
      </Link>
      <nav>
        <ul>
          <li><Link to="/service-page">Послуга</Link></li>
          <li><Link to="/package-of-services-page">Пакет</Link></li>
          <li><Link to="/profile-provider">Профіль постачальника</Link></li>
          <li><Link to="/view-profile-provider">Вид постачальника</Link></li>
          <li><Link to="/services">Послуги</Link></li>

          {userName ? (
            <>
              <li><Link to="/profile">Привіт, {userName}</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Вихід</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Вхід</Link></li>
              <li><Link to="/registration">Реєстрація</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
