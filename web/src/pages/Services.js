import React, { useState } from "react";
import "../css/Services.css";
import serviceImage2 from "../assets/flowers-image.jpg";
import profileFon from "../assets/profile-fon.png";
import { Link } from "react-router-dom";
import Filter from "./Filter";

function Services() {
  const [activeTab, setActiveTab] = useState("services");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const servicesData = [
    {
      photo: serviceImage2,
      name: "Букет з червоних роз",
      supplier: "Флорист Василій",
      rating: 3,
      price: 500,
    },
    {
      photo: serviceImage2,
      name: "Букет з червоних роз",
      supplier: "Флорист Василій",
      rating: 4,
      price: 1200,
    },
  ];

  const packagesData = [
    {
      photo: serviceImage2,
      name: 'Пакет "Цветы с грядки"',
      supplier: "Флорист Василій",
      rating: 2,
      price: 5000,
    },
    {
      photo: serviceImage2,
      name: 'Пакет "Цветы с грядки"',
      supplier: "Флорист Василій",
      rating: 1,
      price: 100000,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "gold" : "none"}
          xmlns="http://www.w3.org/2000/svg"
          className="star-icon"
        >
          <path
            d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
            stroke="gold"
            strokeWidth="1.2"
          />
        </svg>
      );
    }
    return stars;
  };

  const currentData =
    activeTab === "services" ? servicesData : packagesData;

  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="services-page"
      style={{ backgroundImage: `url(${profileFon})` }}
    >
      {/* Поле поиска и кнопка Фільтр */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Пошук..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
         <button className="filter-button" onClick={() => setIsFilterOpen(true)}>
          Фільтр
        </button>
      </div>

         {/* Модальное окно */}
      <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      <div className="tab-buttons">
        <button
          className={`tab-button ${
            activeTab === "services" ? "active" : ""
          }`}
          onClick={() => setActiveTab("services")}
        >
          Послуги
        </button>
        <button
          className={`tab-button ${
            activeTab === "packages" ? "active" : ""
          }`}
          onClick={() => setActiveTab("packages")}
        >
          Пакети послуг
        </button>
      </div>

      <div className="services-container">
        {filteredData.map((item, index) => (
          <Link
            to={
              activeTab === "services"
                ? `/service-page`
                : `/package-of-services-page`
            }
            className="services-card-link"
            key={index}
          >
            <div className="services-card">
              <img
                src={item.photo}
                alt={item.name}
                className="services-photo"
              />
              <div className="services-info">
                <h3 className="services-name">{item.name}</h3>
                <p className="services-supplier">
                  Постачальник: {item.supplier}
                </p>
                <div className="services-rating">
                  {renderStars(item.rating)}
                </div>
                <p className="services-price">Ціна: {item.price} грн</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Services;
