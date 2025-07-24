import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../context/AuthContext'; // ajuste o caminho conforme seu projeto

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenDebug, setTokenDebug] = useState('');
  const router = useRouter();

  const { login } = useAuth(); // <-- ADICIONADO AQUI

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('https://apipet.com.br/client/authenticate', {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;

        console.log("Token recebido:", token);
        setTokenDebug(token);

        // Usa o método do contexto para salvar o token e atualizar estado global
        await login(token);

        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error.message);

      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          setErrorMessage('Senha errada. Digite novamente.');
        } else if (status === 404) {
          setErrorMessage('Usuário não existe. Por favor, clique em Cadastro.');
        } else {
          setErrorMessage('Erro ao realizar login. Tente novamente mais tarde.');
        }
      } else {
        setErrorMessage('Erro de conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/page/Home');
    }
  }, [isLoggedIn]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Image style={styles.logo} source={require('../../../assets/logo1.png')} />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail:"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha:"
          placeholderTextColor="#FFF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      <Text style={styles.buttonText2}>Ainda não possui conta?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/page/Termos')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Fazer login com o Google</Text>
      </TouchableOpacity>

      {/* Exibe o token na tela (para debug) */}
      {tokenDebug ? (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}>
            Token: {tokenDebug}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#1C4175'
  },
  logo: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 0,
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'white',
    paddingHorizontal: 10,
    height: 40,
  },
  gradientLine: {
    height: 2,
    borderRadius: 5,
    marginTop: -2,
  },
  button: {
    backgroundColor: '#fff',
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
