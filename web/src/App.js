// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/header/header';
import Footer from './components/footer/footer'; // Импортируем Footer
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Отображаем Header на всех страницах */}
        


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          {/* Добавьте другие маршруты здесь */}
        </Routes>



        
        <Footer /> {/* Отображаем Footer на всех страницах */}
      </div>
    </Router>
  );
}

export default App;
