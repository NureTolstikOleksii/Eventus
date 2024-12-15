import React from "react";
import "../css/Payment.css";
import capibaraBankLogo from "../assets/bank-capibara.png";
import privatLogo from "../assets/privat-logo.png";
import monoLogo from "../assets/mono-logo.png";
import oschadLogo from "../assets/oschad-logo.png";

const PaymentModal = ({ isOpen, onClose, orderName, total }) => {
  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <h2 className="payment-modal-title">Оплата</h2>
        <img src={capibaraBankLogo} alt="Bank Capibara" className="payment-modal-image" />
        <h3 className="payment-modal-order-name">{orderName}</h3>
        <p className="payment-modal-total">{total}</p>
        <p className="payment-modal-methods">Ви можете оплатити за допомогою:</p>
        <div className="payment-modal-icons">
          <img src={privatLogo} alt="Privat Bank" className="payment-modal-logo" />
          <img src={monoLogo} alt="Monobank" className="payment-modal-logo" />
          <img src={oschadLogo} alt="Oschad Bank" className="payment-modal-logo" />
        </div>
        <button className="payment-modal-close-button" onClick={onClose}>
          Повернутися
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
