import React, { useState } from "react";
import "../css/ProfileCustomer.css";
import profileFon from "../assets/profile-fon.png";
import pencil from "../assets/pencil.png";
import user from "../assets/user.png";
import plus from "../assets/plus.png";
import greenPlus from "../assets/green-plus.png";
import greenArrow from "../assets/green-arrow.png";
import flower from "../assets/flower.png";
import minus from "../assets/minus.png";
import greenMinus from "../assets/green-minus.png";
import { Link } from "react-router-dom";
import cust1 from "../assets/img/cust1.jpg";

function ProfileCustomer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewImage, setReviewImage] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [items, setItems] = useState([{ text: "", checked: false }]);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Степан",
    photo: cust1,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsReviewModalOpen(false);
  };

  const handleOpenReviewModal = (order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleAddReviewImage = (e) => {
    const file = e.target.files[0];
    setReviewImage(file);
  };

  const handleSubmitReview = () => {
    console.log("Відгук на замовлення:", selectedOrder.name);
    console.log("Відгук:", reviewText);
    console.log("Фото:", reviewImage);
    handleCloseModal();
  };

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const handleTextChange = (index, text) => {
    const newItems = [...items];
    newItems[index].text = text;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { text: "", checked: false }]);
  };

  const handleCloseUserInfoModal = () => {
    setIsUserInfoModalOpen(false);
  };

  const handleSaveUserInfo = () => {
    console.log("User Info Updated:", userInfo);
    setIsUserInfoModalOpen(false);
  };

  const handleUserNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleUserPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo({ ...userInfo, photo: URL.createObjectURL(file) });
    }
  };

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
    {
      name: "Букет нареченної",
      supplier: "Квіткова студія 'Роза'",
      image: flower,
    },
  ];

  const orders = [
    {
      name: "Букет червоних троянд",
      image: flower,
      date: "01.12.2024",
      price: "1000 грн",
    },
    {
      name: "Букет червоних троянд",
      image: flower,
      date: "01.12.2024",
      price: "1000 грн",
    },
    {
      name: "Букет червоних троянд",
      image: flower,
      date: "01.12.2024",
      price: "1000 грн",
    },
    {
      name: "Букет червоних троянд",
      image: flower,
      date: "01.12.2024",
      price: "1000 грн",
    },
    {
      name: "Букет червоних троянд",
      image: flower,
      date: "01.12.2024",
      price: "1000 грн",
    },
    {
      name: "Букет лілій",
      image: flower,
      date: "02.12.2024",
      price: "1200 грн",
    },
  ];

  return (
    <div className="profile-customer">
      <div
        className="profile-customer-main"
        style={{ backgroundImage: `url(${profileFon})` }}
      >
        <div className="profile-customer-block">
          <div className="profile-customer-block-header">
            <img
              src={pencil}
              alt="Edit"
              className="icon-pencil"
              onClick={() => setIsUserInfoModalOpen(true)}
            />
          </div>

          <div className="user-info">
            <img src={userInfo.photo} alt="User" className="user-icon" />
            <div>
              <h3>{userInfo.name}</h3>
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
                  <h6>{service.name}</h6>
                  <p>{service.supplier}</p>
                </div>
                <Link to="#" className="remove-wish-list-link">
                  <img src={minus} alt="Minus" />
                </Link>
              </div>
            ))}
          </div>

          <div className="add-wish-list">
            <Link to="/services">
              <img src={plus} alt="Plus" className="plus-wish-list" />
            </Link>
          </div>
        </div>

        <div className="profile-customer-block">
          <div className="profile-customer-third-block-header">
            <p>Мої замовлення</p>
          </div>
          <div className="my-orders">
            {orders.map((order, index) => (
              <div
                key={index}
                className="my-orders-item"
                onClick={() => handleOpenReviewModal(order)}
              >
                <img
                  src={order.image}
                  alt={order.name}
                  className="my-orders-image"
                />
                <div className="my-orders-info">
                  <h6>{order.name}</h6>
                  <p>Дата замовлення: {order.date}</p>
                  <p>Ціна: {order.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isReviewModalOpen && selectedOrder && (
        <div className="profile-customer-modal-review">
          <div className="profile-customer-modal-review-content">
            <img
              src={greenArrow}
              alt="Close"
              className="profile-customer-close-arrow-icon"
              onClick={handleCloseModal}
            />
            <h2>Додати відгук</h2>
            <p>Послуга: {selectedOrder.name}</p>
            <p>Постачальник: {}</p>
            <p>Дата: {}</p>
            <div className="profile-customer-review-image-section">
              <label htmlFor="reviewImage">
                Додати фото:
                <input
                  type="file"
                  id="reviewImage"
                  accept="image/*"
                  onChange={handleAddReviewImage}
                  className="review-image-input"
                />
              </label>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Напишіть ваш відгук"
              className="profile-customer-review-textarea"
            />
            <button
              onClick={handleSubmitReview}
              className="profile-customer-submit-review-button"
            >
              Відправити відгук
            </button>
          </div>
        </div>
      )}
      {isUserInfoModalOpen && (
        <div className="profile-customer-modal-user-info">
          <div className="profile-customer-modal-user-info-content">
            <img
              src={greenArrow}
              alt="Close"
              className="profile-customer-close-arrow-icon"
              onClick={handleCloseUserInfoModal}
            />
            <h2>Редагувати профіль</h2>
            <div className="edit-user-info-field">
              <label htmlFor="userName">Ім'я:</label>
              <input
                type="text"
                id="userName"
                value={userInfo.name}
                onChange={handleUserNameChange}
                className="edit-user-info-input"
              />
            </div>
            <div className="edit-user-info-field">
              <label htmlFor="userPhoto">Фото:</label>
              <input
                type="file"
                id="userPhoto"
                accept="image/*"
                onChange={handleUserPhotoChange}
                className="edit-user-info-file-input"
              />
            </div>
            <button
              onClick={handleSaveUserInfo}
              className="profile-customer-submit-user-info-button"
            >
              Зберегти зміни
            </button>
          </div>
        </div>
      )}

      <div className="profile-customer-check-letter">
        <button onClick={handleOpenModal}>Чек-лист</button>
        {isModalOpen && (
          <div className="modal-check-letter">
            <div className="modal-check-letter-content">
              <img
                src={greenArrow}
                alt="Close"
                className="profile-customer-close-arrow-icon"
                onClick={handleCloseModal}
              />

              <h2>Чек-лист</h2>
              {items.map((item, index) => (
                <div key={index} className="modal-check-letter-item">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    placeholder="Напишіть тут..."
                    className={
                      item.checked && item.text !== "" ? "strikethrough" : ""
                    }
                  />
                  <img
                    src={greenMinus}
                    alt="Remove Item"
                    className="profile-customer-remove-item-button"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              ))}
              <img
                src={greenPlus}
                alt="Add Item"
                className="profile-customer-add-item-button"
                onClick={handleAddItem}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCustomer;
