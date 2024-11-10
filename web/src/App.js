// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Главная страница */}
          <Route path="/login" element={<Login />} /> {/* Страница входа */}
          <Route path="/registration" element={<Registration />} /> {/* Страница регистрации */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
