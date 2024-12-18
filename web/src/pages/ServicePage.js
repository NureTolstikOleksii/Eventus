import React, { useState } from "react";
import "../css/ServicePage.css";
import serviceImage1 from "../assets/red-roses.jpg";
import reviewUser from "../assets/dimon.jpg";
import like from "../assets/like.png";
import addLike from "../assets/add-like.png";
import { Link } from "react-router-dom";

const service = {
  id: 1,
  name: "Букет з червоних роз",
  florist: "Флорист Василій",
  price: "20 000",
  description:
    "Розкішний букет з червоних троянд — це втілення пристрасті, кохання та бездоганної елегантності. Глибокий червоний колір пелюсток символізує щирість почуттів і силу емоцій.",
  image: serviceImage1,
  rating: 5,
};

const reviews = [
  {
    author: "ДИМОН",
    date: "14.11.2024",
    serviceName: "Букет з червоних роз",
    content: "ИМБА",
    rating: 5,
    image: serviceImage1,
    userImage: reviewUser,
  },
  {
    author: "Дмитро",
    date: "14.11.2024",
    serviceName: "Букет з червоних роз",
    content:
      "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти.",
    rating: 2,
    image: serviceImage1,
    userImage: reviewUser,
  },
  {
    author: "димончик лимончик",
    date: "14.11.2024",
    serviceName: "Букет з червоних роз",
    content:
      "Спочатку я був растроєн сервісом. Квіти доставили в жахливому стані – зів’ялі й зламані...",
    rating: 5,
    image: serviceImage1,
    userImage: reviewUser,
  },
];

const ServicePage = () => {
  const [isLiked, setIsLiked] = useState(false); // Состояние для отслеживания клика на иконку лайка

  const toggleLike = () => {
    setIsLiked((prev) => !prev); // Переключаем состояние между true и false
  };

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

          {/* Иконка лайка */}
          <img
            src={isLiked ? addLike : like}
            alt="Like"
            className="like-icon"
            onClick={toggleLike}
          />

          <Link to="/order-page" style={{ textDecoration: "none", color: "inherit" }}>
            <button className="button-order">Замовити</button>
          </Link>
        </div>

        {/* Блок отзывов */}
        <div className="reviews-container">
          <div className="reviews-content">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div className="review-author">
                    <img src={review.userImage} alt="Author" className="review-author-avatar" />
                    <div className="review-author-info">
                      <h4>{review.author}</h4>
                      <p>{review.date}</p>
                      <p className="review-service">Послуга: {review.serviceName}</p>
                    </div>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={i < review.rating ? "gold" : "none"}
                        xmlns="http://www.w3.org/2000/svg"
                        className="review-star"
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
                <p className="review-text">{review.content}</p>
                <div className="review-image">
                  <img src={review.image} alt="Review Visual" className="review-thumbnail" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;
