import React from "react";
import "../css/Login.css";

function Login() {
  return (
    <div className="login">
      <div className="main-text"></div>

      <form action="#">
        <h2 className="main-text">УВІЙТИ</h2>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input type="text" placeholder="Enter Email" name="email" required />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <button type="submit" className="save-button">
          Увійти
        </button>
      </form>

      <div className="login-google"></div>
    </div>
  );
}

export default Login;
