import React, { useState } from "react";
import "../css/ProfileProvider.css";
import profileFon from "../assets/profile-fon.png";
import pencil from "../assets/pencil.png";
import star from "../assets/star.png";
import user from "../assets/user.png";
import plus from "../assets/green-plus.png";
import checkMark from "../assets/green-checkMark.png";
import arrow from "../assets/green-arrow.png";
import minus from "../assets/minus.png";
import serviceImage1 from "../assets/red-roses.jpg";
import { Link } from "react-router-dom";

function ProfileProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    name: "Валєра Х",
    company: "Назва організації",
    photo: user,
  });
  const handleRemoveService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemovePackage = (index) => {
    setServicePackages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProfileModalOpen = () => setIsProfileModalOpen(true);
  const handleProfileModalClose = () => setIsProfileModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileInfo((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    }
  };
  const orders = [
    {
      orderNumber: "№184567",
      name: "Іван Петренко",
      date: "2024-12-15",
      time: "14:00",
      service: "Букет для весілля",
      specialRequests: "Без рожевих квітів",
    },
    {
      orderNumber: "№184567",
      name: "Іван Петренко",
      date: "2024-12-15",
      time: "14:00",
      service: "Букет для весілля",
      specialRequests: "Без рожевих квітів",
    },
    {
      orderNumber: "№184567",
      name: "Іван Петренко",
      date: "2024-12-15",
      time: "14:00",
      service: "Букет для весілля",
      specialRequests: "Без рожевих квітів",
    },
  ];
  const [services, setServices] = useState([
    "Букет",
    "Прикраса зали",
    "Букет нареченної",
    "Прикраса автомобілю",
  ]);

  const [servicePackages, setServicePackages] = useState([
    "Пакет послуг №1",
    "Пакет послуг №2",
    "Пакет послуг №3",
    "Пакет послуг №4",
  ]);

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

  const toggleOrders = () => setIsOrdersOpen((prevState) => !prevState);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const handleOrderClick = (order) => {
    setOrderDetails(order);
    setIsOrderModalOpen(true);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalOpen(false);
    setOrderDetails(null);
  };

  return (
    <div className="profile-provider">
      <div
        className="profile-provider-main"
        style={{ backgroundImage: `url(${profileFon})` }}
      >
        <div className="block">
          <div className="block-header">
            <img
              src={pencil}
              alt="Edit"
              className="icon-pencil"
              onClick={handleProfileModalOpen}
            />
          </div>

          <div className="user-info">
            <img src={profileInfo.photo} alt="User" className="user-icon" />
            <div>
              <h3>{profileInfo.name}</h3>
              <p>{profileInfo.company}</p>
            </div>
          </div>

          <div className="rating">
            <img src={star} alt="rating" className="profile-provider-rating" />
          </div>
          <div className="links">
            <Link to="#logout" className="logout">
              Вийти з профілю
            </Link>
          </div>
        </div>

        <div className="block">
          <div className="second-block-header">
            <p>Мої послуги</p>
          </div>
          <div className="my-services">
            {services.map((service, index) => (
              <div key={index} className="my-service-item">
                <Link
                  to={`/provider-service-page`}
                  className="service-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {service}
                </Link>
                <img
                  src={minus}
                  alt="Minus"
                  className="minus-my-services"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveService(index);
                  }}
                />
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
            <p>Мої пакети послуг</p>
          </div>
          <div className="my-services-package">
            {servicePackages.map((packageName, index) => (
              <div key={index} className="my-services-package-item">
                <Link
                  to={`/provider-package-of-services-page`}
                  className="package-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {packageName}
                </Link>

                <img
                  src={minus}
                  alt="Minus"
                  className="minus-my-services-package"
                  onClick={() => handleRemovePackage(index)}
                />
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

      <div className="profile-provider-orders-section">
        <div className="orders-section" onClick={toggleOrders}>
          <h3>Замовлення</h3>
          {isOrdersOpen && (
            <div className="orders-content">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="order-item"
                  onClick={() => handleOrderClick(order)}
                >
                  {order.orderNumber}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOrderModalOpen && orderDetails && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-buttons">
              <img
                src={arrow}
                alt="arrow"
                className="arrow-my-services-package"
                onClick={handleOrderModalClose}
              />
            </div>
            <div className="order-detail-number">
              {orderDetails.orderNumber}
            </div>
            <div className="order-details">
              <div className="order-detail">
                <strong>Ім'я:</strong> {orderDetails.name}
              </div>
              <div className="order-detail">
                <strong>Дата:</strong> {orderDetails.date}
              </div>
              <div className="order-detail">
                <strong>Час:</strong> {orderDetails.time}
              </div>
              <div className="order-detail">
                <strong>Послуга:</strong> {orderDetails.service}
              </div>
              <div className="order-detail">
                <strong>Особисті побажання:</strong>{" "}
                {orderDetails.specialRequests}
              </div>
            </div>
          </div>
        </div>
      )}

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

      {isProfileModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-buttons">
              <img
                src={arrow}
                alt="arrow"
                className="arrow-my-services-package"
                onClick={handleProfileModalClose}
              />
              <img
                src={checkMark}
                alt="checkMark"
                className="check-mark-my-services-package"
                onClick={handleProfileModalClose}
              />
            </div>
            <h2>Зміна профілю</h2>
            <form>
              <div className="form-group">
                <label htmlFor="input-photo">Фото</label>
                <input
                  type="file"
                  id="input-photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-name">Ім'я</label>
                <input
                  type="text"
                  id="input-name"
                  name="name"
                  value={profileInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-company">Назва компанії</label>
                <input
                  type="text"
                  id="input-company"
                  name="company"
                  value={profileInfo.company}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileProvider;
