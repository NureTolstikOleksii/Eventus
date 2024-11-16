import React, { useState } from "react";
import "../css/ViewProfileProvider.css";
import profileFon from '../assets/profile-fon.png';
import star from '../assets/star.png';
import user from '../assets/user.png';

function ViewProfileProvider() {
    const [expandedBlock, setExpandedBlock] = useState(null);

    const toggleBlock = (blockIndex) => {
        setExpandedBlock(expandedBlock === blockIndex ? null : blockIndex);
    };

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
                    <img src={star} alt="rating" className="view-profile-provider-rating" />
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
                    <p>Дополнительная информация о выбранной услуге.</p>
                </div>
            </div>
            <div
                className={`full-width-block ${expandedBlock === 2 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(2)}
            >
                <div>Пакети послуг</div>
                <div className="block-content">
                    <p>Описание пакетов услуг.</p>
                    <p>Детали каждого пакета с ценами и условиями.</p>
                </div>
            </div>
            <div
                className={`full-width-block ${expandedBlock === 3 ? "expanded" : "collapsed"}`}
                onClick={() => toggleBlock(3)}
            >
                <div>Коментарі</div>
                <div className="block-content">
                    <p>Список комментариев от пользователей.</p>
                    <p>Дополнительная информация о каждом комментарии.</p>
                </div>
            </div>
        </div>
    );
}

export default ViewProfileProvider;
