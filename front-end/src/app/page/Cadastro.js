import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Cadastro = () => {
  const router = useRouter();
  const [isSelected, setSelection] = useState(false);
  const [isSMSSelected, setSMSSelection] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCPF] = useState('');
  const [address, setAddress] = useState('');
  const [cellphone, setCellphone] = useState('');

 const handleRegister = async () => {
  if (!username || !password || !confirmarSenha || !email ||  !cellphone) {
    alert('Preencha todos os campos');
    return;
  }

  if (password !== confirmarSenha) {
    alert('As senhas não coincidem');
    return;
  }

  const payload = {
    username,
    password,
    email,
    cellphone,
    privacy_policy: isSelected,
    sms_whatsapp_messages: isSMSSelected,
  };

  console.log('Dados enviados:', payload);

  try {
    const response = await axios.post('https://apipet.com.br/client', payload);

    console.log('Resposta backend:', response.data);

    if (response.data && response.data.id) {
      alert('Cadastro realizado com sucesso!');
      router.push('page/Home');
    } else {
      alert('Erro: Usuário não criado corretamente. Verifique os dados.');
      console.warn('Resposta inesperada do servidor:', response.data);
    }
  } catch (error) {
    console.error('Erro na requisição:', error.response ? error.response.data : error.message);

    alert('Erro ao realizar cadastro:\n' + (error.response ? JSON.stringify(error.response.data, null, 2) : error.message));
  }
};


  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image style={styles.logo} source={require('../../../assets/logo1.png')} />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome Completo:</Text>
        <TextInput style={styles.input} placeholder="Nome de usuário" placeholderTextColor="#FFF" value={username} onChangeText={setUsername} />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail:</Text>
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#FFF" value={email} onChangeText={setEmail} />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Celular:</Text>
        <TextInput style={styles.input} placeholder="Celular" placeholderTextColor="#FFF" value={cellphone} onChangeText={setCellphone} />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha:</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha:" placeholderTextColor="#FFF" secureTextEntry value={password} onChangeText={setPassword} />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirmar senha:</Text>
        <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#FFF" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={isSelected} onValueChange={setSelection} color={isSelected ? '#4630EB' : undefined} />
        <Text style={styles.label}>Li e estou de acordo com o Termo de Uso e Política de Privacidade</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={isSMSSelected} onValueChange={setSMSSelection} color={isSMSSelected ? '#4630EB' : undefined} />
        <Text style={styles.label}>Aceito receber mensagens via SMS e WhatsApp</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
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
