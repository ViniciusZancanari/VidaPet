// src/app/index.js
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppEntry = () => {
  const router = useRouter();
  const auth = useAuth(); // Agora 'auth' não será undefined

  useEffect(() => {
    const checkAuth = async () => {
      // O AuthProvider já tenta carregar o token do AsyncStorage.
      // Podemos verificar se ele já foi carregado.
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Se temos um token, podemos até mesmo fazer uma validação rápida dele aqui se necessário.
        // E depois, atualizar o estado no contexto antes de redirecionar.
        if (auth) {
            auth.login(token);
        }
        router.replace('/page/Login');
      } else {
        router.replace('/page/Login');
      }
    };

    checkAuth();
  }, []);

  // Exibe um indicador de carregamento enquanto a verificação acontece
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0d47a1" />
    </View>
  );
};

export default AppEntry;