import React, { useState } from "react";
import "../css/PackageOfServicesPage.css";
import serviceImage1 from "../assets/red-roses.jpg"; // Укажите путь к изображению букета
import serviceImage2 from "../assets/flowers-image.jpg";
import reviewUser from "../assets/dimon.jpg";
import reviewUser2 from "../assets/yellow-flower.jpg";
import reviewUser3 from "../assets/rewiew-image.jpg";
import like from "../assets/like.png";
import addLike from "../assets/add-like.png";
import { Link } from "react-router-dom";
import review4 from "../assets/img/review4.jpg";
import review5 from "../assets/img/review5.jpg";
import review6 from "../assets/img/review6.jpg";


const packageData = {
  name: 'Букет з червоних роз',
  florist: "Флорист Василій",
  price: "100 000",
  description:
    "“Букет з червоних роз” — це натуральність, тепло і чарівність природи в кожній деталі. У цьому пакеті зібрано лише сезонні квіти, вирощені з любов’ю на місцевих грядках. Ідеальний вибір для тих, хто цінує автентичність і простоту.",
  image: serviceImage2,
  rating: 5,

  services: [
    {
      name: "Букет з ромашек",
      description: "Розкішний букет з ромашек — це втілення пристрасті.",
      price: "20 000",
      rating: 5,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
  ],
};

const reviews = [
  {
    author: "Марина",
    date: "30.11.2024",
    serviceName: "Квіти з грядки",
    content:
      "Чудовий букет, виглядав натурально і свіжо! Рекомендую!",
    rating: 5,
    image: review4,
    userImage: reviewUser,
  },
  {
    author: "Анатолій",
    date: "10.11.2024",
    serviceName: "Квіти з грядки",
    content:
      "Букет неймовірний! Квіти свіжі і красиві, дуже задоволена покупкою!",
    rating: 3,
    image: review5,
    userImage: reviewUser3,
  },
  {
    author: "Дмитро",
    date: "10.11.2024",
    serviceName: "Квіти з грядки",
    content:
      "Букет неймовірний! Квіти свіжі і красиві, дуже задоволена покупкою!.",
    rating: 5,
    image: review6,
    userImage: reviewUser2,
  },
];

const PackageOfServicesPage = () => {
  const [isLiked, setIsLiked] = useState(false); // Состояние для переключения лайка

  const toggleLike = () => {
    setIsLiked((prev) => !prev); // Переключение состояния
  };

  return (
    <div className="package-of-services-page">
      <main className="package-of-services-container">
        {/* Левый блок: информация о пакете */}
        <div className="package-of-services-info">
          <img
            src={packageData.image}
            alt={packageData.name}
            className="package-of-services-image"
          />
          <h2 className="package-of-services-title">{packageData.name}</h2>
          <p className="package-of-services-florist">{packageData.florist}</p>
          <div className="package-of-services-rating">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={i < packageData.rating ? "gold" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
                  stroke="gold"
                  strokeWidth="1.2"
                />
              </svg>
            ))}
          </div>
          <p className="package-of-services-price">{packageData.price} грн</p>
          <p className="package-of-services-description">
            {packageData.description}
          </p>

          {/* Иконка лайка */}
          <img
            src={isLiked ? addLike : like}
            alt="Like"
            className="like-icon"
            onClick={toggleLike}
          />
          <Link
            to="/order-page"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="package-of-services-order-button">
              Замовити
            </button>
          </Link>
        </div>

        {/* Средний блок: состав пакета */}
        <div className="package-of-services-composition">
          <div className="package-of-services-page-name-block">
            <h3>Склад пакету</h3>
          </div>
          <div className="package-of-services-composition-grid">
            {packageData.services.map((service, index) => (
              <div key={index} className="package-of-services-item">
                <img
                  src={service.image}
                  alt={service.name}
                  className="package-of-services-item-image"
                />
                <div className="package-of-services-item-info">
                  <h4>{service.name}</h4>
                  <div className="package-of-services-item-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < service.rating ? "gold" : "none"}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
                          stroke="gold"
                          strokeWidth="1.2"
                        />
                      </svg>
                    ))}
                  </div>

                  <Link
                    to="/service-page"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <button className="package-of-services-item-order-button">
                      Переглянути
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="package-of-services-reviews-section">
        <div className="package-of-services-page-name-block">
          <h3>Відгуки</h3>
        </div>
        <div className="package-of-services-reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="package-of-services-review-card">
              <div className="package-of-services-review-header">
                <div className="package-of-services-review-left">
                  {/* Используем userImage из данных отзыва */}
                  <img
                    src={review.userImage}
                    alt="Author"
                    className="package-of-services-review-author-icon"
                  />
                  <div className="package-of-services-review-info">
                    <h4>{review.author}</h4>
                    <p className="package-of-services-review-date">
                      {review.date}
                    </p>
                    <p className="package-of-services-review-service">
                      Послуга: {review.serviceName}
                    </p>
                  </div>
                </div>
                <div className="package-of-services-review-rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={i < review.rating ? "gold" : "none"}
                      xmlns="http://www.w3.org/2000/svg"
                      className="package-of-services-star-icon"
                    >
                      <path
                        d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
                        stroke="gold"
                        strokeWidth="1.2"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="package-of-services-review-content">
                {review.content}
              </p>
              <div className="package-of-services-review-image">
                <img
                  src={review.image}
                  alt="Review Visual"
                  className="package-of-services-review-thumbnail"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageOfServicesPage;
