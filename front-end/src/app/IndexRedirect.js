import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const IndexRedirect = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuthentication = async () => {
      try {
        // 1. Busca os dados do usuário
        const userDataString = await AsyncStorage.getItem('userData');
        
        if (!isMounted) return;
        
        // 2. Verifica se os dados existem e são válidos
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          
          // 3. Validação básica dos dados do usuário
          const isValidUser = userData && 
                             userData.token && 
                             userData.userId && 
                             // Verifica se o token não expirou (se tiver expiryDate)
                             (!userData.expiryDate || new Date(userData.expiryDate) > new Date());
          
          if (isValidUser) {
            router.replace('/page/Home');
            return;
          }
          
          // Se os dados existem mas são inválidos, limpa o storage
          await AsyncStorage.removeItem('userData');
        }
        
        // 4. Redireciona para login se não estiver autenticado
        router.replace('/page/Login');
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        if (isMounted) {
          router.replace('/page/Login');
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default IndexRedirect;