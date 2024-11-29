import React from "react";
import "../css/ServicePage.css";
import bouquetImage from "../assets/red-roses.jpg"; // Укажите путь к изображению букета

const service = {
    id: 1,
    name: "Букет з червоних роз",
    florist: "Флорист Василій",
    price: "20 000",
    description:
      "Розкішний букет з червоних троянд — це втілення пристрасті, кохання та бездоганної елегантності. Глибокий червоний колір пелюсток символізує щирість почуттів і силу емоцій.",
    image: bouquetImage,
    rating: 5,
  };


const ServicePage = () => {
    return (
        <div className="page-service">
          <main className="container-service">
            <div className="info-service" key={service.id}>
              <img src={service.image} alt={service.name} className="image-service" />
              <h2 className="title-service">{service.name}</h2>
              <p className="florist-service">{service.florist}</p>
              <div className="rating-service">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={i < service.rating ? "gold" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                    className="star-icon"
                  >
                    <path
                      d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
                      stroke="gold"
                      strokeWidth="1.2"
                    />
                  </svg>
                ))}
              </div>
              <p className="price-service">{service.price} грн</p>
              <p className="description-service">{service.description}</p>
              <button className="button-order">Замовити</button>
            </div>
    
            <div className="section-reviews">
              <h3>Відгуки</h3>
              <p>тут типо должны быть отзывы</p>
            </div>
          </main>
        </div>
      );
};

export default ServicePage;
