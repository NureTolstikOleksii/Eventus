import React, { useState, useEffect } from "react"; // Добавлен импорт useEffect
import "../css/Registration.css";
import google from "../assets/google.png";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

function Registration() {
  const [isSupplier, setIsSupplier] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    company_name: '', // Переименовано, чтобы соответствовать ключу в бэкенде
    service_category: '' // Переименовано для соответствия выпадающему списку
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const checkboxChange = () => {
    setIsSupplier(!isSupplier);
  };

  useEffect(() => {
    // Получаем категории с бэкенда при загрузке компонента
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/register/categories`); 
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Сохраняем категории в состоянии
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '',
      general: '' // Сбрасываем ошибку при изменении поля
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});  // Сброс ошибок перед отправкой
    try {
      const url = isSupplier ? '/register/provider' : '/register/customer';
      const response = await fetch(`${apiUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Registration successful');
      } else {
        const errorData = await response.json();
        const newErrors = { ...errors }; // Создаем копию текущих ошибок для объединения
  
        // Если сервер возвращает ошибки по полям, добавляем их
        if (errorData.missingFields) {
          Object.assign(newErrors, errorData.missingFields);
        }
  
        // Если сервер возвращает общую ошибку в `message`, проверим, не относится ли она к конкретному полю
        if (errorData.message) {
          if (errorData.message.toLowerCase().includes("email")) {
            newErrors.email = errorData.message;
          } else if (errorData.message.toLowerCase().includes("name")) {
            newErrors.name = errorData.message;
          } else if (errorData.message.toLowerCase().includes("password")) {
            newErrors.password = errorData.message;
          } else if (errorData.message.toLowerCase().includes("company_name")) {
            newErrors.company_name = errorData.message;
          } else if (errorData.message.toLowerCase().includes("service_category")) {
            newErrors.service_category = errorData.message;
          } else {
            newErrors.general = errorData.message;  // Если ошибка общая, отображаем её в общем блоке
          }
        }
        setErrors(newErrors);
      }
    } catch (error) {
      console.error('Error:', error);  // Лог ошибки в консоль
      setErrors({ general: 'Registration failed due to a server error' });
    }
  };
  
  return (
    <div className="registration">
      <form onSubmit={handleSubmit}>
        <h2 className="registration-main-text">ЗАРЕЄСТРУВАТИСЯ</h2>

        <label htmlFor="name">
          <b>Повне ім'я: </b>
        </label>
        <input type="text" name="name" onChange={handleChange} />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label htmlFor="phone_number">
          <b>Номер телефону:</b>
        </label>
        <input type="tel" name="phone_number" onChange={handleChange} />
        {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}

        <label htmlFor="email">
          <b>Email:</b>
        </label>
        <input type="text" name="email" onChange={handleChange} />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label htmlFor="password">
          <b>Пароль:</b>
        </label>
        <input type="password" name="password" onChange={handleChange} />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <div className="supplier-checkbox">
          <input type="checkbox" id="isSupplier" name="isSupplier" onChange={checkboxChange} />
          <label htmlFor="isSupplier">Зареєструватися як постачальник</label>
        </div>

        {isSupplier && (
          <>
            <label htmlFor="company_name">
              <b>Назва організації:</b>
            </label>
            <input type="text" name="company_name" onChange={handleChange} />
            {errors.company_name && <p className="error-text">{errors.company_name}</p>}

            <label htmlFor="service_category">
              <b>Оберіть категорію:</b>
            </label>
            <select name="service_category" onChange={handleChange} value={formData.service_category}>
              <option value="">Оберіть категорію</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.service_category && <p className="error-text">{errors.service_category}</p>}
          </>
        )}

        <button type="submit" className="registration-save-button">
          Зареєструватися
        </button>

        {/* Общая ошибка */}
        {errors.general && <p className="error-text">{errors.general}</p>}

        <div className="google-registration">
          <a href="#" rel="noopener noreferrer">
            <img src={google} alt="Google Logo" className="registration-google-logo" />
          </a>
        </div>
        <div className="registration-add-text">
          <p>
            Вже маєте акаунт? <Link to="/login">Увійдіть</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registration;
