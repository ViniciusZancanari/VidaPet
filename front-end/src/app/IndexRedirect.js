import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const IndexRedirect = () => {
  const router = useRouter();
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('userData');
        if (user) {
          router.replace('/page/Login'); // ✅ redireciona para a Home
        } else {
          router.replace('/page/Cadastro'); // permanece se não logado
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        router.replace('/page/Login'); // fallback seguro
      } finally {
        setCheckingLogin(false);
      }
    };

    verifyLogin();
  }, []);

  if (checkingLogin) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null; // nada a renderizar, pois o router.replace cuida da navegação
};

export default IndexRedirect;
