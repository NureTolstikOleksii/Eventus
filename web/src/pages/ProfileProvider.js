import React, { useState } from "react";
import "../css/ProfileProvider.css";
import profileFon from "../assets/profile-fon.png";
import pencil from "../assets/pencil.png";
import star from "../assets/star.png";
import user from "../assets/user.png";
import plus from "../assets/plus.png";
import { Link } from "react-router-dom";

function ProfileProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    "Букет",
    "Прикраса зали",
    "Букет нареченної",
    "Прикраса автомобілю",
  ];

  const servicePackages = [
    "Пакет послуг №1",
    "Пакет послуг №2",
    "Пакет послуг №3",
    "Пакет послуг №4",
  ];

  const reviews = [
    {
      name: "Дмитро",
      text: "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти. Сервіс непоганий, але є простір для покращення саме у якості квітів.",
    },
    {
      name: "Дмитро",
      text: "Прекрасний букет! Квіти свіжі, ароматні, оформлення стильне. Дуже задоволена, обов’язково замовлятиму ще!",
    },
    {
      name: "Дмитро",
      text: "Прекрасний букет! Квіти свіжі, ароматні, оформлення стильне. Дуже задоволена, обов’язково замовлятиму ще!",
    },
  ];

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="profile-provider">
      <div
        className="profile-provider-main"
        style={{ backgroundImage: `url(${profileFon})` }}
      >
        <div className="block">
          <div className="block-header">
            <img src={pencil} alt="Edit" className="icon-pencil" />
          </div>
          <div className="user-info">
            <img src={user} alt="User" className="user-icon" />
            <div>
              <h3>Валєра Х</h3>
              <p>Назва організації</p>
            </div>
          </div>
          <div className="rating">
            <img src={star} alt="rating" className="profile-provider-rating" />
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

        <div className="block">
          <div className="second-block-header">
            <img src={pencil} alt="Edit" className="icon-pencil" />
            <p>Мої послуги</p>
          </div>
          <div className="my-services">
            {services.map((service, index) => (
              <div key={index} className="my-service-item">
                {service}
              </div>
            ))}
          </div>
          <div className="add-service">
            <img
              src={plus}
              alt="Plus"
              className="plus-my-services"
              onClick={handleModalOpen}
            />
          </div>
        </div>

        <div className="block">
          <div className="third-block-header">
            <img src={pencil} alt="Edit" className="icon-pencil" />
            <p>Мої пакети послуг</p>
          </div>
          <div className="my-services-package">
            {servicePackages.map((packageName, index) => (
              <div key={index} className="my-services-package-item">
                {packageName}
              </div>
            ))}
          </div>
          <div className="add-service-package">
            <Link to="/add-service-package">
              <img src={plus} alt="Plus" className="plus-my-services-package" />
            </Link>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Відгуки</h3>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-item-main">
                <div className="review-header">
                  <img src={user} alt="User" className="review-user-photo" />
                  <div className="review-info">
                    <strong>{review.name}</strong>
                    <p className="review-date">Дата додавання: 20.11.2024</p>
                  </div>
                </div>
                <div className="review-rating">
                  <img
                    src={star}
                    alt="Rating"
                    className="review-rating-photo"
                  />
                </div>
              </div>
              <div className="review-text">
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Додавання</h2>
            <form>
              <div className="form-group">
                <input type="file" accept="image/*" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Назва" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Опис" required></textarea>
              </div>
              <div className="form-group">
                <input type="number" placeholder="Ціна" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Час роботи" required />
              </div>
              <div className="form-buttons">
                <button type="submit">Додати</button>
                <button type="button" onClick={handleModalClose}>
                  Закрити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileProvider;
