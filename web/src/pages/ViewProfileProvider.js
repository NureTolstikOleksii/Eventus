import React, { useState } from "react";
import "../css/ViewProfileProvider.css";
import profileFon from '../assets/profile-fon.png';
import user from '../assets/user.png';
import reviewUser from '../assets/dimon.jpg';
import star from "../assets/star.png";
import serviceImage1 from "../assets/red-roses.jpg";
import serviceImage2 from "../assets/flowers-image.jpg";

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
            image: serviceImage1, // Укажите URL изображения
        },
        {
            author: "Дмитро",
            date: "14.11.2024",
            content: "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти. Сервіс непоганий, але є простір для покращення саме у якості квітів.",
            rating: 2,
            image: "https://example.com/image2.jpg", // Укажите URL изображения
        },
        {
            author: "димончик лимончик",
            date: "14.11.2024",
            content: "Спочатку я був растроєн сервісом. Квіти доставили в жахливому стані – зів’ялі й зламані. Від такого подарунка не оставиться ніяких позитивних емоцій! – подумав я. Але оказалось, шо казати бабло на ветер – це ваще нє про Валєру. Валєра, продавец, спокойно сказав: Та це ж не букет, це віник для бані, шеф! Ща все буде як надо. І правда, через час я вже держал у руках свіжий, розкішний букет, як будто його щас собрали в райському саду. Валєра добавив: Якшо шось не так – обращайтесь, я з веніка для бані шедевр сделаю!",
            rating: 5,
            image: "https://example.com/image3.jpg", // Укажите URL изображения
        }
    ];


    // Пример данных для услуг
    const services = [
        {
            title: "Букет з червоних роз",
            price: "20 000",
            description: "Розкішний букет із червоних троянд – це втілення пристрасті, кохання та бездоганної елегантності. Глибокий червоний колір пелюсток символізує щирість почуттів і силу емоцій. Такий букет стане ідеальним подарунком для вираження любові, поваги чи вдячності, доповнюючи важливий момент нотками вишуканості й тепла.",
            image: serviceImage1,
            rating: 4,
        },
        {
            title: "Весільний букет",
            price: "15 000",
            description: "Ідеальний букет для найважливішого дня. Виготовлений із свіжих квітів найвищої якості.",
            image: serviceImage2,
            rating: 5,
        },
    ];

    // Пример данных профиля
    const profileData = {
        name: "Валєра Х",
        organization: "РОМАШКА",
        image: user,
        rating: 4, // рейтинг в виде числа (от 0 до 5)
    };


    return (
        <div
            className="view-profile-provider"
            style={{ backgroundImage: `url(${profileFon})` }}
        >
            {/* Верхний блок */}
            <div className="upper-block">
                <div className="user-info">
                    {/* Изображение пользователя */}
                    <img src={profileData.image} alt="User" className="user-icon" />

                    {/* Имя пользователя */}
                    <h3>{profileData.name}</h3>

                    {/* Название организации */}
                    <p>{profileData.organization}</p>

                    {/* Рейтинг */}
                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={i < profileData.rating ? "gold" : "none"}
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
            </div>


            {/* Три нижних блока */}
            <div
                className={`full-width-block ${expandedBlock === 1 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(1)}
            >
                <div>Послуги</div>
                <div className="block-content">
                    {services.map((service, index) => (
                        <div key={index} className="service-card"
                            onClick={(event) => event.stopPropagation()} // Останавливаем всплытие события
                        >
                            <div className="service-image-container">
                                <img src={service.image} alt={service.title} className="service-image" />
                            </div>
                            <div className="service-content">
                                <div className="service-header">
                                    <h3 className="service-title">{service.title}</h3>
                                    <div className="service-header-price">
                                        <span className="service-price">{service.price} грн</span>
                                        <button
                                            className="order-button"
                                            onClick={(event) => {
                                                event.stopPropagation(); // Останавливаем распространение клика
                                                console.log("Кнопка 'Замовити' нажата");
                                            }}
                                        >
                                            Замовити
                                        </button>

                                    </div>
                                </div>
                                <div className="service-rating">
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
                                <p className="service-description">{service.description}</p>

                            </div>
                        </div>
                    ))}
                </div>



            </div>






            <div
                className={`full-width-block ${expandedBlock === 2 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(2)}
            >
                <div>Пакети послуг</div>
                <div className="block-content">
                    <p>а нет их</p>
                </div>
            </div>



            <div
                className={`full-width-block ${expandedBlock === 3 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(3)}
            >
                <div>Відгуки</div>
                <div className="block-content">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card"
                            onClick={(event) => event.stopPropagation()} // Останавливаем всплытие события
                        >

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

                            <div className="review-image">
                                <img src={review.image} alt="Review Visual" className="review-thumbnail" />
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewProfileProvider;
