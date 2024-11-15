import React from "react"; 
import "../css/ProfileProvider.css";
import profileFon from '../assets/profile-fon.png';
import pencil from '../assets/pencil.png';
import star from '../assets/star.png';
import user from '../assets/user.png';
import { Link } from 'react-router-dom';

function ProfileProvider() {
    return (
        <div
          className="profile-provider"
          style={{ backgroundImage: `url(${profileFon})` }}
        >
           <div className="block">
              <div className="block-header">
                <img src={pencil} alt="Edit" className="icon-pencil" />
              </div>
              <div className="user-info">
                <img src={user} alt="User" className="user-icon" />
                <div>
                  <h3>Валєра Х</h3>
                  <p>Назва організації</p>
                </div>
              </div>
              <div className="rating">
                <img src={star} alt="rating" className="profile-provider-rating" />
              </div>
              <div className="links">
              <Link to="#notifications" className="reviews">Сповіщення</Link>
              <Link to="#logout" className="logout">Вийти з профілю</Link>
              </div>
           </div>
           <div className="block">
           <div className="second-block-header">
                <img src={pencil} alt="Edit" className="icon-pencil" />
                <p>Мої послуги</p>
              </div>



           </div>
           <div className="block">Блок 3</div>
        </div>
    );
}

export default ProfileProvider;
