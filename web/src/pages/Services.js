import React from "react";
import "../css/Services.css";
import serviceImage2 from "../assets/flowers-image.jpg";
import profileFon from "../assets/profile-fon.png";
import { Link } from "react-router-dom";

function Services() {
  const servicesData = [
    {
      photo: serviceImage2,
      name: "Флористика",
      supplier: "Квітковий майстер",
      rating: 4.5,
      price: 500,
    },
    {
      photo: serviceImage2,
      name: "Декор",
      supplier: "Студія декору",
      rating: 4.8,
      price: 1200,
    },
  ];

  const packagesData = [
    {
      photo: serviceImage2,
      name: "Весільний пакет",
      supplier: "Святкова агенція",
      rating: 4.9,
      price: 5000,
    },
    {
      photo: serviceImage2,
      name: "Корпоративний пакет",
      supplier: "Святкова агенція",
      rating: 4.7,
      price: 7000,
    },
  ];
  
  return (
    <div className="services-page" style={{ backgroundImage: `url(${profileFon})` }}>
      <h2 className="section-title">Послуги</h2>
      <div className="services-container">
        {servicesData.map((service) => (
          <div className="service-card" key={service.name}>
            <img src={service.photo} alt={service.name} className="service-photo" />
            <div className="service-info">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-supplier">Постачальник: {service.supplier}</p>
              <p className="service-rating">Рейтинг: {service.rating} ⭐</p>
              <p className="service-price">Ціна: {service.price} грн</p>
              <Link to={`/service-page`} className="details-button">
                Детальніше
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h2 className="section-title">Пакети послуг</h2>
      <div className="packages-container">
        {packagesData.map((pkg) => (
          <div className="service-card" key={pkg.name}>
            <img src={pkg.photo} alt={pkg.name} className="service-photo" />
            <div className="service-info">
              <h3 className="service-name">{pkg.name}</h3>
              <p className="service-supplier">Постачальник: {pkg.supplier}</p>
              <p className="service-rating">Рейтинг: {pkg.rating} ⭐</p>
              <p className="service-price">Ціна: {pkg.price} грн</p>
              <Link to={`/package-of-services-page`} className="details-button package-button">
                Детальніше
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
