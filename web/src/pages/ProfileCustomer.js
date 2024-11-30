import React, { useState } from "react";
import "../css/ProfileCustomer.css";
import profileFon from "../assets/profile-fon.png";
import pencil from "../assets/pencil.png";
import star from "../assets/star.png";
import user from "../assets/user.png";
import plus from "../assets/plus.png";
import checkMark from "../assets/checkMark.png";
import arrow from "../assets/arrow.png";
import flower from "../assets/flower.png";
import serviceImage1 from "../assets/red-roses.jpg";
import { Link } from "react-router-dom";

function ProfileCustomer() {
  const list = [
    {
      name: "Букет",
      supplier: "Квіткова студія 'Роза'",
      image: flower,
    },
    {
      name: "Прикраса зали",
      supplier: "Декоратор 'Святковий стиль'",
      image: flower,
    },
    {
      name: "Букет нареченної",
      supplier: "Квіткова студія 'Роза'",
      image: flower,
    },
    {
      name: "Букет нареченної",
      supplier: "Квіткова студія 'Роза'",
      image: flower,
    },
    {
      name: "Букет нареченної",
      supplier: "Квіткова студія 'Роза'",
      image: flower,
    },
  ];

  const orders = [
    "Пакет послуг №1",
    "Пакет послуг №2",
    "Пакет послуг №3",
    "Пакет послуг №4",
  ];

  return (
    <div className="profile-customer">
      <div
        className="profile-customer-main"
        style={{ backgroundImage: `url(${profileFon})` }}
      >
        <div className="profile-customer-block">
          <div className="profile-customer-block-header">
            <img src={pencil} alt="Edit" className="icon-pencil" />
          </div>
          <div className="user-info">
            <img src={user} alt="User" className="user-icon" />
            <div>
              <h3>Валєра Х</h3>
            </div>
          </div>
          <div className="links">
            <Link to="#notifications" className="reviews">
              Сповіщення
            </Link>
            <Link to="#logout" className="logout">
              Вийти з профілю
            </Link>
          </div>
        </div>

        <div className="profile-customer-block">
          <div className="profile-customer-second-block-header">
            <img src={pencil} alt="Edit" className="icon-pencil" />
            <p>Список бажань</p>
          </div>
          <div className="wish-list">
            {list.map((service, index) => (
              <div key={index} className="wish-list-item">
                <img
                  src={service.image}
                  alt={service.name}
                  className="wish-list-image"
                />
                <div className="wish-list-info">
                  <h5>{service.name}</h5>
                  <p>{service.supplier}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="add-wish-list">
            <Link to="/services">
              <img src={plus} alt="Plus" className="plus-wish-list" />
            </Link>
          </div>
        </div>

        <div className="block">
          <div className="third-block-header">
            <img src={pencil} alt="Edit" className="icon-pencil" />
            <p>Мої замовлення</p>
          </div>
          <div className="my-orders">
            {orders.map((packageName, index) => (
              <div key={index} className="my-orders-item">
                {packageName}
              </div>
            ))}
          </div>
          <div className="add-service-package">
            <img src={plus} alt="Plus" className="plus-my-orders" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCustomer;
