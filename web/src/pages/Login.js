import React, { useState, useEffect } from "react";
import "../css/Login.css";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
//import profileFon from "../assets/profile-fon.png";
const apiUrl = process.env.REACT_APP_API_URL;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isProvider, setIsProvider] = useState(false); // Определяет, регистрируется ли поставщик
  const [userName, setUserName] = useState(''); // Имя пользователя
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      return;
    }
    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      return;
    }
  
    try {
      const loginResponse = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Включить cookie
        body: JSON.stringify(formData),
      });
  
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        alert('Login successful');
        await fetchSession(); // Запрашиваем текущую сессию
        navigate('/profile'); // Перенаправление на /profile после успешного входа
        window.location.reload(); // Перезагружаем страницу для обновления Header
      } else {
        const errorData = await loginResponse.json();
        setGeneralError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setGeneralError('Operation failed due to a server error');
    }
  };

  const fetchSession = async () => {
    try {
      const sessionResponse = await fetch(`${apiUrl}/session`, {
        method: 'GET',
        credentials: 'include',
      });

      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        setUserName(sessionData.name || '');
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const toggleUserType = () => {
    setIsProvider(!isProvider);
  };

  return (

    
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2 className="main-text">УВІЙТИ</h2>

        {userName && (
          <p className="welcome-text">Привіт, {userName}!</p>
        )}

        <label htmlFor="email">
          <b>Email:</b>
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label htmlFor="password">
          <b>Пароль:</b>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" className="save-button">
          Увійти
        </button>

        {generalError && <p className="error-text">{generalError}</p>}

        <div className="google-login">
          <a href="#" rel="noopener noreferrer">
            <img src={google} alt="Google Logo" className="google-logo" />
          </a>
        </div>

        <div className="add-text">
          <p>
            Досі не маєте аккаунта? <Link to="/registration">Скоріше реєструйтеся!</Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Login;
