import React, { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const Login = () => {
  const [isSelected, setSelection] = useState(false);
  const [isSMSSelected, setSMSSelection] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo1.png')} />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Login:</Text>
        <TextInput style={styles.input} placeholder="Login:" placeholderTextColor="#FFF" />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha:</Text>
        <TextInput style={styles.input} placeholder="Senha:" placeholderTextColor="#FFF" secureTextEntry />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Link style={styles.buttonText} href="/page/Home">Entrar</Link>
      </TouchableOpacity>

      <Text style={styles.buttonText2}>Ainda não possui conta?</Text>

      <TouchableOpacity style={styles.button}>
        <Link style={styles.buttonText} href="/page/Termos">Cadastre-se</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Fazer login com o Google</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d47a1',
    alignItems: 'center',
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
    marginBottom: 50,
    marginRight: 10,
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
});

export default Login;
