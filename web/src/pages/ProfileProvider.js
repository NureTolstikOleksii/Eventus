import React, { useState } from "react";
import "../css/ProfileProvider.css";
import profileFon from "../assets/profile-fon.png";
import pencil from "../assets/pencil.png";
import star from "../assets/star.png";
import user from "../assets/user.png";
import plus from "../assets/plus.png";
import checkMark from "../assets/checkMark.png";
import arrow from "../assets/arrow.png";
import serviceImage1 from "../assets/red-roses.jpg";
import { Link } from "react-router-dom";

function ProfileProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

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
      serviceImage: "../assets/serviceImage1.png",
    },
    {
      name: "Дмитро",
      text: "Прекрасний букет! Квіти свіжі, ароматні, оформлення стильне. Дуже задоволена, обов’язково замовлятиму ще!",
      serviceImage: "../assets/serviceImage1.png",
    },
    {
      name: "Дмитро",
      text: "Прекрасний букет! Квіти свіжі, ароматні, оформлення стильне. Дуже задоволена, обов’язково замовлятиму ще!",
      serviceImage: "../assets/serviceImage1.png",
    },
  ];

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handlePackageModalOpen = () => setIsPackageModalOpen(true);
  const handlePackageModalClose = () => setIsPackageModalOpen(false);
  const handleAddServiceModalOpen = () => setIsAddServiceModalOpen(true);
  const handleAddServiceModalClose = () => setIsAddServiceModalOpen(false);

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
            <img
              src={plus}
              alt="Plus"
              className="plus-my-services-package"
              onClick={handlePackageModalOpen}
            />
          </div>
        </div>
      </div>

      <div className="profile-provider-reviews-section">
  <h3>Відгуки</h3>
  <div className="profile-provider-reviews-container">
    {reviews.map((review, index) => (
      <div key={index} className="profile-provider-review-item">
        <div className="profile-provider-review-item-main">
          <div className="profile-provider-review-header">
            <img
              src={user}
              alt="User"
              className="profile-provider-review-user-photo"
            />
            <div className="profile-provider-review-info">
              <strong>{review.name}</strong>
              <p className="profile-provider-review-date">
                Дата додавання: 20.11.2024
              </p>
            </div>
          </div>
          <div className="profile-provider-review-rating">
            <img
              src={star}
              alt="Rating"
              className="profile-provider-review-rating-photo"
            />
          </div>
        </div>
        <div className="profile-provider-review-text">
          <p>{review.text}</p>
        </div>
        <div className="profile-provider-review-image">
          <img
            src={serviceImage1}
            alt="Service"
            className="profile-provider-review-service-image"
          />
        </div>
      </div>
    ))}
  </div>
</div>



      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-buttons">
              <img
                src={arrow}
                alt="arrow"
                className="arrow-my-services-package"
                onClick={handleModalClose}
              />
              <img
                src={checkMark}
                alt="checkMark"
                className="check-mark-my-services-package"
              />
            </div>
            <h2>Додавання</h2>
            <form>
              <div className="form-group">
                <label htmlFor="input-image">Фото</label>
                <input type="file" id="input-image" accept="image/*" />
              </div>

              <div className="form-group">
                <label htmlFor="input-title">Назва</label>
                <input type="text" id="input-title" required />
              </div>

              <div className="form-group">
                <label htmlFor="input-description">Опис</label>
                <textarea id="input-description" required></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="input-price">Ціна</label>
                <input type="number" id="input-price" required />
              </div>

              <div className="form-group">
                <label htmlFor="input-hours">Час роботи</label>
                <input type="text" id="input-hours" required />
              </div>
            </form>
          </div>
        </div>
      )}

      {isPackageModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-buttons">
              <img
                src={arrow}
                alt="arrow"
                className="arrow-my-services-package"
                onClick={handlePackageModalClose}
              />
              <img
                src={checkMark}
                alt="checkMark"
                className="check-mark-my-services-package"
              />
            </div>
            <h2>Пакет послуг</h2>
            <form>
              <div className="form-group">
                <label htmlFor="input-package-image">Фото</label>
                <input type="file" id="input-package-image" accept="image/*" />
              </div>
              <div className="form-group">
                <label htmlFor="input-package-title">Назва</label>
                <input type="text" id="input-package-title" required />
              </div>

              <div className="form-group">
                <label htmlFor="input-package-description">Опис</label>
                <textarea id="input-package-description" required></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="input-package-price">Ціна</label>
                <input type="number" id="input-package-price" required />
              </div>

              <div className="form-group">
                <label htmlFor="input-package-duration">Тривалість</label>
                <input type="number" id="input-package-duration" required />
              </div>

              <div className="form-group add-service-to-package">
                <label>Додати послугу</label>
                <img
                  src={plus}
                  alt="Plus"
                  className="plus-my-services-package"
                  onClick={handleAddServiceModalOpen}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddServiceModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-buttons">
              <img
                src={arrow}
                alt="arrow"
                className="arrow-my-services-package"
                onClick={handleAddServiceModalClose}
              />
            </div>
            <h3>Додати послугу</h3>
            <div className="form-group">
              <label>Послуги:</label>
              <select>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-service-button">Додати до пакету</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileProvider;
