import React, { useState } from "react";
import "../css/ViewProfileProvider.css";
import profileFon from '../assets/profile-fon.png';
import user from '../assets/user.png';
import reviewUser from '../assets/dimon.jpg';
import star from "../assets/star.png";
import serviceImage1 from "../assets/red-roses.jpg";
import serviceImage2 from "../assets/flowers-image.jpg";
import reviewUser2 from '../assets/yellow-flower.jpg';
import reviewUser3 from "../assets/rewiew-image.jpg";
function ViewProfileProvider() {
    const [expandedBlocks, setExpandedBlocks] = useState({
        services: false,
        packages: false,
        reviews: false,
    });

    const toggleBlock = (blockName) => {
        setExpandedBlocks((prev) => ({
            ...prev,
            [blockName]: !prev[blockName], // Переключение состояния только для указанного блока
        }));
    };


    const reviews = [
        {
            author: "ДИМОН",
            date: "14.11.2024",
            serviceName: "Букет з червоних роз", // Название услуги
            content: "ИМБА",
            rating: 5,
            image: serviceImage1, // Укажите URL изображения услуги
            userImage: reviewUser, // Укажите URL изображения пользователя
        },
        {
            author: "Дмитро",
            date: "14.11.2024",
            serviceName: "Букет з червоних роз", // Название услуги
            content:
                "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти. Сервіс непоганий, але є простір для покращення саме у якості квітів.",
            rating: 2,
            image: serviceImage1, // Укажите URL изображения услуги
            userImage: reviewUser, // Укажите URL изображения пользователя
        },
        {
            author: "димончик лимончик",
            date: "14.11.2024",
            serviceName: "Букет з червоних роз", // Название услуги
            content:
                "Спочатку я був растроєн сервісом. Квіти доставили в жахливому стані – зів’ялі й зламані. Від такого подарунка не оставиться ніяких позитивних емоцій! – подумав я. Але оказалось, шо казати бабло на ветер – це ваще нє про Валєру. Валєра, продавец, спокойно сказав: Та це ж не букет, це віник для бані, шеф! Ща все буде як надо. І правда, через час я вже держал у руках свіжий, розкішний букет, як будто його щас собрали в райському саду. Валєра добавив: Якшо шось не так – обращайтесь, я з веніка для бані шедевр сделаю!",
            rating: 5,
            image: serviceImage1, // Укажите URL изображения услуги
            userImage: reviewUser, // Укажите URL изображения пользователя
        },
        {
            author: "ДИМОН",
            date: "30.11.2024",
            serviceName: "Квіти з грядки",
            content: "Спочатку я заржав, коли побачив назву Квіти з грядки. Ну думаю, Валєра, ти серйозно? Що там, моркву з петрушкою підвезеш? Але ні, Валєра не розчаровує. Приніс букет, шо виглядає так, ніби збирав його біля найпрестижнішого під’їзду в місті, де клумби поливають мінералкою і квіти слухають класику. Натуральність зашкалює – навіть бабка з сусіднього під’їзду дивилась з підозрою, чи не з її грядки це все. Валєра підморгнув і каже: Ну шо, шеф, хай заздрять! Наступного разу ще й дощову воду для свіжості підвезу!",
            rating: 5,
            image: serviceImage2,
            userImage: reviewUser,
          },
          {
          author: "Анатолій",
            date: "10.11.2024",
            serviceName: "Квіти з грядки",
            content:
              "Квіти з грядки – це було щось зовсім неочікуване. Коли Валєра озвучив назву, я подумав, що він знову вирішив пожартувати. Але ні, цей хлопець вміє дивувати. Приніс букет, який виглядав так, ніби його вирощували під класичну музику, поливали джерельною водою і вкривали пледом у холодні ночі. Троянди, ромашки, навіть щось, що я не зміг упізнати, але пахло так, що сусіди почали визирати у вікна. І це ще не все. Валєра, ніби між іншим, додав: та це з ранкової поставки, шеф. Хочете, завтра підвезу з вечірньої – там ще більш ароматні. І тут я зрозумів, що Квіти з грядки – це не просто сервіс, це стиль життя. Валєра робить свою справу так, що навіть найбільш вибагливі клієнти лишаються в захваті. Якщо шукаєте щось душевне, натуральне і з легким нальотом шику – це точно ваш вибір.",
            rating: 3,
            image: serviceImage1,
            userImage: reviewUser3,
          },
          {
            author: "Джованни",
            date: "10.11.2024",
            serviceName: "Квіти з грядки",
            content:
              "Ну шо сказать, хлопці й дівчата, пишу цей отзив прямо з 2077 року. Світ змінився, літаючі машини, роботи кругом, а Валєра – той самий. Як робив букетіще, так і робить. Квіти з грядки, каже він, – це вам не якісь там синт-квіти чи голограми. Це реальні квіти, вирощені, як у старі добрі часи, на землі, шо ще залишилась після всіх цих технокриз. Приніс мені Валєра букет, і я чуть з крісла не впав. Ромашки, півонії, навіть соняшник якийсь затесався – ну прямо артхаус на стеблі. І аромат такий натуральний, шо сусідський дрон завис у вікна нюхать. Валєра, як завжди, філософствує: Еко-френдлі, шеф, це ж із минулого для вашого майбутнього. Я таке збирав, шо вам навіть голограмна бабця заздрить буде.Словом, Валєра – легенда. Якщо у 2077 році ще існує хоч щось справжнє, то це точно його Квіти з грядки. Не пропустіть шанс підтримати традиції в еру нейроштучності!",
            rating: 5,
            image: serviceImage2,
            userImage:  reviewUser2,
          },
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

    const packages = [
        {
            title: "Цветы с грядки",
            images: [
                serviceImage2, // замените на URL ваших изображений
            ],
            price: "100 000 000",
            rating: 4,
        },
        {
            title: "Цветы с грядки",
            images: [
                serviceImage2, // замените на URL ваших изображений

            ],
            price: "100 000 000",
            rating: 4,
        }, {
            title: "Цветы с грядки",
            images: [
                serviceImage2, // замените на URL ваших изображений
            ],
            price: "100 000 000",
            rating: 4,
        }, {
            title: "Цветы с грядки",
            images: [
                serviceImage2, // замените на URL ваших изображений
            ],
            price: "100 000 000",
            rating: 4,
        }, {
            title: "Цветы с грядки",
            images: [
                serviceImage2, // замените на URL ваших изображений
            ],
            price: "100 000 000",
            rating: 4,
        }, {
            title: "Цветы с грядки",
            images: [
                serviceImage2, // замените на URL ваших изображений
            ],
            price: "100 000 000",
            rating: 4,
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

            {/* Верхний блок ПРОФИЛЯ */}
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

            {/* БЛОК 1 УСЛУГИ*/}
            <div
                className={`full-width-block ${expandedBlocks.services ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock("services")}
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


            {/* БЛОК 2 ПАКЕТЫ */}
            <div
                className={`full-width-block ${expandedBlocks.packages ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock("packages")}
            >
                <div>Пакети послуг</div>
                <div className="block-content package-container">
                    {packages.map((pkg, index) => (
                        <div key={index} className="package-card-centered"
                            onClick={(event) => event.stopPropagation()} >
                            <div className="package-header-centered">
                                <h3 className="package-title-centered">{pkg.title}</h3>
                                <div className="package-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill={i < pkg.rating ? "gold" : "none"}
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
                                <span className="package-price-centered">{pkg.price} грн</span>
                            </div>
                            {/* Большая картинка */}
                            <div className="package-image-container">
                                <img
                                    src={pkg.images[0]}
                                    alt="Package Image"
                                    className="package-image-centered"
                                />
                            </div>
                            {/* Кнопка */}
                            <button className="package-order-button-centered"
                                onClick={(event) => {
                                    event.stopPropagation(); // Останавливаем распространение клика
                                    console.log("Кнопка 'Замовити' нажата");
                                }}
                            >Замовити</button>
                        </div>
                    ))}
                </div>
            </div>






            {/* БЛОК 3  КОМЕНТЫ */}
            <div
                className={`full-width-block ${expandedBlocks.reviews ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock("reviews")}
            >
                <div>Відгуки</div>
                <div className="block-content">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="review-card"
                            onClick={(event) => event.stopPropagation()} // Останавливаем всплытие события
                        >
                            <div className="review-header">
                                <div className="review-left">
                                    {/* Используем userImage из данных отзыва */}
                                    <img src={review.userImage} alt="Author" className="review-author-icon" />
                                    <div className="review-info">
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
