import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Profile from './pages/Profile';
import ViewProfileProvider from './pages/ViewProfileProvider';
import ProfileProvider from './pages/ProfileProvider';
import ProfileCustomer from './pages/ProfileCustomer';
import { UserProvider } from './context/UserContext'; // Импортируем UserProvider
import ServicePage from './pages/ServicePage';
import PackageOfServicesPage from './pages/PackageOfServicesPage';

function App() {
  return (
    <UserProvider> {/* Оборачиваем в UserProvider */}
      <Router>
        <div className="App">
          <Header /> {/* Отображаем Header на всех страницах */}
          <Routes>
          <Route path="/profile-provider" element={<ProfileProvider />} />
          <Route path="/profile-customer" element={<ProfileCustomer />} />
          <Route path="/view-profile-provider" element={<ViewProfileProvider />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/service-page" element={<ServicePage />} />
            <Route path="/package-of-services-page" element={<PackageOfServicesPage />} />
            {/* Добавьте другие маршруты здесь */}
          </Routes>
          <Footer /> {/* Отображаем Footer на всех страницах */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
