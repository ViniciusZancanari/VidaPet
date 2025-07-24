import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Carrega o token salvo ao iniciar o app
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('userToken');
      if (savedToken) setToken(savedToken);
    };
    loadToken();
  }, []);

  const login = async (newToken) => {
    await AsyncStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
