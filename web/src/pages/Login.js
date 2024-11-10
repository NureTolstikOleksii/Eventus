import React from "react";
import "../css/Login.css";
import google from "../assets/google.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <form action="#">
        <h2 className="main-text">УВІЙТИ</h2>
        <label htmlFor="email">
          <b>Email:</b>
        </label>
        <input type="text" name="email" required />

        <label htmlFor="psw">
          <b>Пароль:</b>
        </label>
        <input type="password" name="psw" required />

        <button type="submit" className="save-button">
          Увійти
        </button>
        <div className="google-login">
          <a href="#" rel="noopener noreferrer">
            <img src={google} alt="Google Logo" className="google-logo" />
          </a>
        </div>
        <div className="add-text">
          <p>
            Досі не маєте аккаунта?{" "}
            <Link to="/registration">Скоріше реєструйтеся!</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
