import React, { useState } from "react";
import "../css/ServicePage.css";
import serviceImage1 from "../assets/red-roses.jpg";
import reviewUser from "../assets/dimon.jpg";
import arrow from "../assets/green-arrow.png";
import plus from "../assets/green-plus.png";
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
      "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти. Сервіс непоганий, але є простір для покращення саме у якості квітів.",
    rating: 2,
    image: serviceImage1,
    userImage: reviewUser,
  },
  {
    author: "димончик лимончик",
    date: "14.11.2024",
    serviceName: "Букет з червоних роз",
    content:
      "Спочатку я був растроєн сервісом. Квіти доставили в жахливому стані – зів’ялі й зламані. Від такого подарунка не оставиться ніяких позитивних емоцій! – подумав я. Але оказалось, шо казати бабло на ветер – це ваще нє про Валєру. Валєра, продавец, спокойно сказав: Та це ж не букет, це віник для бані, шеф! Ща все буде як надо. І правда, через час я вже держал у руках свіжий, розкішний букет, як будто його щас собрали в райському саду.",
    rating: 5,
    image: serviceImage1,
    userImage: reviewUser,
  },
];

const ProviderServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    { date: "2024-12-15", time: "14:30" },
    { date: "2024-12-16", time: "10:00" },
  ]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNewModal = () => {
    setIsNewModalOpen(!isNewModalOpen);
  };

  const handleAddAppointment = () => {
    if (newDate && newTime) {
      setAppointments([...appointments, { date: newDate, time: newTime }]);
      setNewDate("");
      setNewTime("");
      toggleNewModal();
    }
  };

  return (
    <div className="page-service">
      <main className="container-service">
        <div className="info-service" key={service.id}>
          <img
            src={service.image}
            alt={service.name}
            className="image-service"
          />
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
          <button className="button-order" onClick={toggleModal}>
            КАЛЕНДАР
          </button>
        </div>

        {/* Reviews Section */}
        <div className="reviews-container">
          <div className="reviews-content">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div className="review-author">
                    {/* Using userImage from the array */}
                    <img
                      src={review.userImage}
                      alt="Author"
                      className="review-author-avatar"
                    />
                    <div className="review-author-info">
                      <h4>{review.author}</h4>
                      <p>{review.date}</p>
                      <p className="review-service">
                        Послуга: {review.serviceName}
                      </p>
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
                  <img
                    src={review.image}
                    alt="Review Visual"
                    className="review-thumbnail"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="provider-service-page-modal">
          <div className="provider-service-page-modal-content">
            <img
              src={arrow}
              alt="Close"
              className="modal-close"
              onClick={toggleModal}
            />
            <h2>Календар</h2>

            {/* Modal Body for Appointments */}
            <div className="provider-service-page-modal-body">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="provider-service-page-appointment-item"
                >
                  <p>
                    <strong>Дата:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Час:</strong> {appointment.time}
                  </p>
                </div>
              ))}
            </div>

            <img
              src={plus}
              alt="Add"
              className="plus-button"
              onClick={toggleNewModal}
            />
          </div>
        </div>
      )}

      {isNewModalOpen && (
        <div className="new-modal">
          <div className="new-modal-content">
            <div className="new-modal-body">
              {/* Date Picker */}
              <div className="date-container">
                <label htmlFor="date" className="date-label">
                  Обрати дату
                </label>
                <input
                  type="date"
                  id="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="date-input"
                />
              </div>
              {/* Time Picker */}
              <div className="time-container">
                <label htmlFor="time" className="time-label">
                  Обрати час
                </label>
                <input
                  type="time"
                  id="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="time-input"
                />
              </div>

              <button
                className="provider-service-add-button"
                onClick={handleAddAppointment}
              >
                Додати
              </button>
            </div>

            <img
              src={arrow}
              alt="Back"
              className="back-arrow"
              onClick={toggleNewModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderServicePage;
