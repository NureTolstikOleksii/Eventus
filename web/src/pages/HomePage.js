import React from 'react';
import '../css/HomePage.css'; // Подключение стилей
import dreamCapibara from '../assets/dream-capibara.png'; // Импорт изображения капибары

import categoryCake from '../assets/category/category-cake.png';
import categoryEat from '../assets/category/category-eat.png';
import categoryFlower from '../assets/category/category-flower.png';
import categoryHouse from '../assets/category/category-house.png';

import package1 from '../assets/packages/package1.jpg';
import package2 from '../assets/packages/package2.jpg';
import package3 from '../assets/packages/package3.jpg';

import service1 from '../assets/services/service1.jpg'; // Импорт изображений услуг
import service2 from '../assets/services/service2.jpg';
import service3 from '../assets/services/service3.jpg';
import service4 from '../assets/services/service4.jpg';
import service5 from '../assets/services/service5.jpg';

// Массив данных с пакетами
const packages = [
  {
    id: 1,
    title: 'Пакет "День Народження"',
    description:
      'Пакет "День Народження" – святкова атмосфера без зайвих турбот. Стильна локація з тематичним декором, вишукане меню, преміум напої, розваги з ведучим, живою музикою або діджеєм, шоу-програма та інтерактиви – все для незабутнього свята.',
    image: package1,
  },
  {
    id: 2,
    title: 'Пакет "Весілля Мрії"',
    description:
      'Пакет "Весілля Мрії" – елегантне свято з чарівною атмосферою. Розкішна локація, витончений декор, вишукане меню, жива музика або діджей, шоу-програма та інтерактиви. Ми подбаємо про деталі, щоб ваше весілля було стильним і незабутнім.',
    image: package2,
  },
  {
    id: 3,
    title: 'Пакет "Гідне Прощання"',
    description:
      'Пакет "Гідне Прощання" – сервіс для організації спокійної прощальної церемонії. Локація з стриманим декором, трансфер, ритуальні послуги, фуршет, пам*ятні матеріали, музичний супровід – усе для гідного прощання з близькими.',
    image: package3,
  },
];

// Массив данных с услугами
const services = [
  {
    id: 1,
    title: 'Файний ведмідь',
    provider: 'Анатолій',
    rating: 5,
    image: service1,
  },
  {
    id: 2,
    title: 'Смачний фуршет',
    provider: 'Марина',
    rating: 5,
    image: service2,
  },
  {
    id: 3,
    title: 'Букет "Червоний"',
    provider: 'Валєра',
    rating: 5,
    image: service3,
  },
  {
    id: 4,
    title: 'Букет "Ніжність"',
    provider: 'Валєра',
    rating: 5,
    image: service4,
  },
  {
    id: 5,
    title: 'Їжа на корпоратив',
    provider: 'Василій',
    rating: 5,
    image: service5,
  },
];

const HomePage = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Блок с изображением под затемнением */}
      <div className="home-page-top-image">
        <div className="overlay"></div> {/* Затемнение */}
        <div className="top-content">
          {/* Левый блок с текстом */}
          <div className="text-block">
            <h1>Організуйте незабутні заходи з нами!</h1>
            <button className="start-button" onClick={scrollToCategories}>
              Розпочати
            </button>
          </div>
          {/* Правый блок с изображением капибары */}
          <div className="image-block">
            <img src={dreamCapibara} alt="Dream Capibara" className="capibara-image" />
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div id="categories-section" className="main-content">
        <h2>Категорії</h2>
        {/* Секция с иконками */}
        <div className="categories">
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryFlower} alt="Flowers" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryHouse} alt="House" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryEat} alt="Eat" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryCake} alt="Cake" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryFlower} alt="Flowers" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryHouse} alt="House" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryEat} alt="Eat" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryCake} alt="Cake" />
          </a>
          <a href="#" className="category-item" onClick={(e) => e.preventDefault()}>
            <img src={categoryFlower} alt="Flowers" />
          </a>
        </div>

        <h2>Топ пакетів послуг</h2>
        {/* Динамическая секция "Топ пакетов" */}
        <div className="top-packages">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <img src={pkg.image} alt={pkg.title} />
              <h3>{pkg.title}</h3>
              <p>{pkg.description}</p>
            </div>
          ))}
        </div>

        {/* Секция "Топ услуг" */}
        <h2>Топ послуг</h2>
        <div className="top-services">
          {services.map((service) => (
            <div key={service.id} className="top-service-card">
              <div className="top-service-image-container">
                <img src={service.image} alt={service.title} className="top-service-image" />
              </div>
              <h3 className="top-service-title">{service.title}</h3>
              <p className="top-service-provider">Від {service.provider}</p>
              <div className="top-service-rating">{'★'.repeat(service.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
