import React, { useState } from "react";
import "../css/Registration.css";
import google from "../assets/google.png";
import { Link } from "react-router-dom";

function Registration() {
  const [isSupplier, setIsSupplier] = useState(false);

  const checkboxChange = () => {
    setIsSupplier(!isSupplier);
  };
  return (
    <div className="registration">
      <form action="#">
        <h2 className="registration-main-text">ЗАРЕЄСТРУВАТИСЯ</h2>
        <label htmlFor="fullName">
          <b>Повне ім'я:</b>
        </label>
        <input type="text" name="fullName" required />
        <label htmlFor="phoneNumber">
          <b>Номер телефону:</b>
        </label>
        <input type="tel" name="phoneNumber" required />
        <label htmlFor="email">
          <b>Email:</b>
        </label>
        <input type="text" name="email" required />
        <label htmlFor="psw">
          <b>Пароль:</b>
        </label>
        <input type="password" name="psw" required />
        <div className="supplier-checkbox">
          <input type="checkbox"id="isSupplier"name="isSupplier"onChange={checkboxChange}/>
          <label htmlFor="isSupplier">Зареєструватися як постачальник</label>
        </div>

        {isSupplier && (
          <>
            <label htmlFor="organizationName">
              <b>Назва організації:</b>
            </label>
            <input type="text" name="organizationName" required />

            <label htmlFor="category">
              <b>Оберіть категорію:</b>
            </label>
            <select name="category" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </>
        )}

        <button type="submit" className="registration-save-button">
          Зареєструватися
        </button>
        <div className="google-registration">
          <a href="#" rel="noopener noreferrer">
            <img src={google} alt="Google Logo" className="registration-google-logo"/>
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
