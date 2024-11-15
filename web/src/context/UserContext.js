import React, { createContext, useContext, useState } from 'react';

// Создаем контекст пользователя
const UserContext = createContext();

// Провайдер для передачи данных пользователя
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста пользователя
export const useUser = () => useContext(UserContext);
