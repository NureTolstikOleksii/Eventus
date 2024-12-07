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

function ProfileCustomer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([{ text: "", checked: false }]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    {
      name: "Букет орхідей",
      image: flower,
      date: "03.12.2024",
      price: "1500 грн",
    },
    {
      name: "Букет нареченої",
      image: flower,
      date: "04.12.2024",
      price: "1800 грн",
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
              <div key={index} className="my-orders-item">
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
          <div className="add-order">
            <img src={plus} alt="Plus" className="plus-my-orders" />
          </div>
        </div>
      </div>

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
