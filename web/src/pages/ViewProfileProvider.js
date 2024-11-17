import React, { useState } from "react";
import "../css/ViewProfileProvider.css";
import profileFon from '../assets/profile-fon.png';
import user from '../assets/user.png';
import reviewUser from '../assets/dimon.jpg';
import star from "../assets/star.png";


function ViewProfileProvider() {
    const [expandedBlock, setExpandedBlock] = useState(null);

    const toggleBlock = (blockIndex) => {
        setExpandedBlock(expandedBlock === blockIndex ? null : blockIndex);
    };

    // Пример данных для отзывов
    const reviews = [
        {
            author: "ДИМОН",
            date: "14.11.2024",
            content: "ИМБА",
            rating: 5,
        },
        {
            author: "Дмитро",
            date: "14.11.2024",
            content: "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти. Сервіс непоганий, але є простір для покращення саме у якості квітів.",
            rating: 3,
        },
        {
            author: "димончик лимончик",
            date: "14.11.2024",
            content: "Спочатку я був растроєн сервісом. Квіти доставили в жахливому стані – зів’ялі й зламані. Від такого подарунка не оставиться ніяких позитивних емоцій! – подумав я. Але оказалось, шо казати бабло на ветер – це ваще нє про Валєру. Валєра, продавец, спокойно сказав: Та це ж не букет, це віник для бані, шеф! Ща все буде як надо. І правда, через час я вже держал у руках свіжий, розкішний букет, як будто його щас собрали в райському саду. Валєра добавив: Якшо шось не так – обращайтесь, я з веніка для бані шедевр сделаю!",
            rating: 5,
        }
    ];

    return (
        <div
            className="view-profile-provider"
            style={{ backgroundImage: `url(${profileFon})` }}
        >
            {/* Верхний блок */}
            <div className="upper-block">
                <div className="user-info">
                    <img src={user} alt="User" className="user-icon" />
                    <h3>Валєра Х</h3>
                    <p>Назва організації</p>
                    <div className="rating">
            <img src={star} alt="rating" className="profile-provider-rating" />
          </div>
                </div>
            </div>

            {/* Три нижних блока */}
            <div
                className={`full-width-block ${expandedBlock === 1 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(1)}
            >
                <div>Послуги</div>
                <div className="block-content">
                    <p>Тут отображается список услуг, предлагаемых пользователем.</p>
                </div>
            </div>
            <div
                className={`full-width-block ${expandedBlock === 2 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(2)}
            >
                <div>Пакети послуг</div>
                <div className="block-content">
                    <p>Описание пакетов услуг.</p>
                </div>
            </div>
            <div
                className={`full-width-block ${expandedBlock === 3 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(3)}
            >
                <div>Відгуки</div>
                <div className="block-content">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-header">
                                <div className="review-left">
                                    <img src={reviewUser} alt="Author" className="review-author-icon" />
                                    <div className="review-info">
                                        <h4>{review.author}</h4>
                                        <p>{review.date}</p>
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
                                            className="star-icon"
                                        >
                                            <path
                                                d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
                                                stroke="gold"
                                                stroke-width="1.2"
                                            />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="review-content">{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewProfileProvider;
