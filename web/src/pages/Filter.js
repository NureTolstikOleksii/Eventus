import React, { useState } from "react";
import "../css/Filter.css"; // CSS файл для модального окна


const Filter = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [price, setPrice] = useState(10000);

  const categories = [
    "Флористика",
    "Їжа",
    "Локації",
    "Зйомка",
    "Декор",
    "Розваги",
    "Організація",
    "Одяг та краса",
    "Транспорт",
    "Оренда",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal-content">
        <h3 className="filter-modal-title">Фільтр</h3>

        {/* Категории */}
        <div className="filter-modal-categories">
          {categories.map((category, index) => (
            <label key={index} className="filter-modal-checkbox-label">
              <input
                type="checkbox"
                checked={selectedCategory.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>

        {/* Рейтинг */}
        <div className="filter-modal-rating">
          <p>Рейтинг:</p>
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="filter-modal-rating-label">
              <input
                type="checkbox"
                className="filter-modal-checkbox"
                checked={selectedRating === star}
                onChange={() => setSelectedRating(star)}
              />
              <span className="filter-modal-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < star ? "active" : ""}`}>
                    ★
                  </span>
                ))}
              </span>
            </label>
          ))}
        </div>

        {/* Цена */}
        <div className="filter-modal-price">
          <p>Ціна:</p>
          <input
            type="range"
            min="0"
            max="50000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="filter-modal-price-values">
            <span>0</span>
            <span>{price}</span>
            <span>50 000</span>
          </div>
        </div>

        {/* Кнопка применить */}
        <button className="filter-modal-apply" onClick={onClose}>
          Застосувати
        </button>
      </div>
    </div>
  );
};

export default Filter;
