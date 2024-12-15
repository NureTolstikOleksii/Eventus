import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/OrderPage.css";
import PaymentModal from "./Payment";
// Пример массива данных для заказа
const orderData = {
    name: "Букет червоний",
    supplier: "Валєра",
    date: "10.11.2024 14:00",
    total: "10 0000 грн",
};

const OrderPage = () => {
    const [isPaymentOpen, setPaymentOpen] = useState(false);

    return (
        <div className="order-page">
            <div className="order-page-content">
                {/* Левый блок */}
                <div className="order-page-left">
                    <h1 className="order-page-title">ЗАМОВЛЕННЯ</h1>
                    <p><b>Назва:</b> {orderData.name}</p>
                    <p><b>Постачальник:</b> {orderData.supplier}</p>
                    <p><b>Дата:</b> {orderData.date}</p>
                    <p><b>СУММА:</b> {orderData.total}</p>
                    <button className="order-page-calendar-button">Календар</button>
                    <p><b>Особливі побажання:</b></p>
                    <textarea
                        className="order-page-textarea"
                        placeholder="Напишіть свої побажання..."
                    ></textarea>
                </div>

                {/* Правый блок */}
                <div>
                    <div className="order-page-right">
                        <div className="order-page-section">
                            <h1 className="order-page-title">МОЇ ДАННІ</h1>
                            <p><b>Ім'я:</b></p>
                            <input
                                type="text"
                                className="order-page-input"
                                placeholder="Ваше ім'я"
                            />
                            <p><b>Номер телефону:</b></p>
                            <input
                                type="text"
                                className="order-page-input"
                                placeholder="Ваш номер"
                            />
                        </div>
                    </div>
                    {/* Кнопка заказа под блоком */}
                    <div className="order-page-footer">
                        <button
                            className="order-page-submit-button"
                            onClick={() => setPaymentOpen(true)}
                        >
                            Замовити
                        </button>
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setPaymentOpen(false)}
                orderName={orderData.name}
                total={orderData.total}
            />
        </div>
    );
};

export default OrderPage;