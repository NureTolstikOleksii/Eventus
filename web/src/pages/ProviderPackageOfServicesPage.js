import React from "react";
import "../css/PackageOfServicesPage.css";
import serviceImage1 from "../assets/red-roses.jpg"; // Укажите путь к изображению букета
import serviceImage2 from "../assets/flowers-image.jpg";
import reviewUser from '../assets/dimon.jpg';
import reviewUser2 from '../assets/yellow-flower.jpg';
import reviewUser3 from "../assets/rewiew-image.jpg";
import { Link } from 'react-router-dom';

const packageData = {
  name: 'Пакет "Цветы с грядки"',
  florist: "Флорист Василій",
  price: "100 000",
  description:
    "“Квіти з грядки” — це натуральність, тепло і чарівність природи в кожній деталі. У цьому пакеті зібрано лише сезонні квіти, вирощені з любов’ю на місцевих грядках. Ідеальний вибір для тих, хто цінує автентичність і простоту.",
  image: serviceImage2,
  rating: 5,

  services: [
    {
      name: "Букет з ромашек",
      description: "Розкішний букет з ромашек — це втілення пристрасті.",
      price: "20 000",
      rating: 5,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
    {
      name: "Весільний букет",
      description: "Ідеальний букет для найважливішого дня у вашому житті.",
      price: "15 000",
      rating: 4,
      image: serviceImage2,
    },
  ],
};

const reviews = [
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

const ProviderPackageOfServicesPage = () => {
  return (
<div className="package-of-services-page">
  <main className="package-of-services-container">
    {/* Левый блок: информация о пакете */}
    <div className="package-of-services-info">
      <img src={packageData.image} alt={packageData.name} className="package-of-services-image" />
      <h2 className="package-of-services-title">{packageData.name}</h2>
      <p className="package-of-services-florist">{packageData.florist}</p>
      <div className="package-of-services-rating">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < packageData.rating ? "gold" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
              stroke="gold"
              strokeWidth="1.2"
            />
          </svg>
        ))}
      </div>
      <p className="package-of-services-price">{packageData.price} грн</p>
      <p className="package-of-services-description">{packageData.description}</p>
      <button className="package-of-services-order-button">КАЛЕНДАР</button>
    </div>

 {/* Средний блок: состав пакета */}
<div className="package-of-services-composition">
  <div className="package-of-services-page-name-block">
    <h3>Склад пакету</h3>
  </div>
  <div className="package-of-services-composition-grid">
    {packageData.services.map((service, index) => (
      <div key={index} className="package-of-services-item">
        <img src={service.image} alt={service.name} className="package-of-services-item-image" />
        <div className="package-of-services-item-info">
          <h4>{service.name}</h4>
          <div className="package-of-services-item-rating">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i < service.rating ? "gold" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.9264 8.60145L22 9.40402L17 14.1986L18.8528 21.596L12 17.8L5.14722 21.596L7 14.1986L2 9.40402L9.07355 8.60145L12 2Z"
                  stroke="gold"
                  strokeWidth="1.2"
                />
              </svg>
            ))}
          </div>
          <Link to="/provider-service-page" style={{ textDecoration: 'none', color: 'inherit' }}>  
          <button className="package-of-services-item-order-button">Переглянути</button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>


  </main>

  <div className="package-of-services-reviews-section">
  <div className="package-of-services-page-name-block">
  <h3>Відгуки</h3></div>
  <div className="package-of-services-reviews-container">
    {reviews.map((review, index) => (
      <div key={index} className="package-of-services-review-card">
        <div className="package-of-services-review-header">
          <div className="package-of-services-review-left">
            {/* Используем userImage из данных отзыва */}
            <img
              src={review.userImage}
              alt="Author"
              className="package-of-services-review-author-icon"
            />
            <div className="package-of-services-review-info">
              <h4>{review.author}</h4>
              <p className="package-of-services-review-date">{review.date}</p>
              <p className="package-of-services-review-service">Послуга: {review.serviceName}</p>
            </div>
          </div>
          <div className="package-of-services-review-rating">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={i < review.rating ? "gold" : "none"}
                xmlns="http://www.w3.org/2000/svg"
                className="package-of-services-star-icon"
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
        <p className="package-of-services-review-content">{review.content}</p>
        <div className="package-of-services-review-image">
          <img
            src={review.image}
            alt="Review Visual"
            className="package-of-services-review-thumbnail"
          />
        </div>
      </div>
    ))}
  </div>
</div>

</div>

  );
};


export default ProviderPackageOfServicesPage;
