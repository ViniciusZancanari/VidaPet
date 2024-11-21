import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import axios from 'axios'
import { Link } from 'expo-router';
;

const Cadastro = () => {
  const [isSelected, setSelection] = useState(false);
  const [isSMSSelected, setSMSSelection] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCPF] = useState('');
  const [address, setAddress] = useState('');
  const [cellphone, setCellphone] = useState('');

  const handleRegister = () => {
    if (password !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    axios.post('http://192.168.0.2:3000/client/', {
      username,
      password,
      email,
      CPF,
      address,
      cellphone,
      privacy_policy: isSelected,
      sms_whatsapp_messages: isSMSSelected,
    })
      .then(response => {
        console.log(response.data);
        alert('Cadastro realizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro na requisição:', error.response ? error.response.data : error.message);
        alert('Erro ao realizar o cadastro: ' + (error.response ? error.response.data : error.message));
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image style={styles.logo} source={require('../../../assets/logo1.png')} />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome Completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#FFF"
          value={username}
          onChangeText={setUsername}
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={setEmail}
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Celular:</Text>
        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#FFF"
          value={cellphone}
          onChangeText={setCellphone}
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha:"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirmar senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isSelected}
          onValueChange={() => setSelection(!isSelected)}
          color={isSelected ? '#4630EB' : undefined}
        />
        <Text style={styles.label}>Li e estou de acordo com o Termo de Uso e Política de Privacidade</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isSMSSelected}
          onValueChange={setSMSSelection}
          color={isSMSSelected ? '#4630EB' : undefined}
        />
        <Text style={styles.label}>Aceito receber mensagens via SMS e WhatsApp</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Link style={styles.buttonText} href="/page/VerificarEmail">Confirmar</Link>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#0d47a1',
    alignItems: 'center',
    paddingVertical: 20,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
  },
  label: {
    marginLeft: 8,
    color: 'white',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Cadastro;
