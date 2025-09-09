import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
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
    if (!username || !password || !confirmarSenha || !email || !cellphone) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
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

    try {
      // Apenas envia a requisição para cadastrar o usuário
      await axios.post('https://apipet.com.br/client', payload);
      
      // Se a requisição foi bem-sucedida (não deu erro), exibe o alerta de sucesso
      Alert.alert(
        'Sucesso!', 
        'Cadastro realizado. Agora você será redirecionado para fazer o login.'
      );
      
      // Redireciona o usuário para a tela de login
      router.push('page/Login'); 

    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error.message);
      Alert.alert('Erro ao realizar cadastro', error.response?.data?.message || 'Verifique os dados e tente novamente.');
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
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#FFF" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Celular:</Text>
        <TextInput style={styles.input} placeholder="Celular" placeholderTextColor="#FFF" value={cellphone} onChangeText={setCellphone} keyboardType="phone-pad" />
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

// ... Seus estilos continuam aqui
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
    flexShrink: 1, // Permite que o texto quebre a linha se necessário
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40, // Adiciona espaço no final
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Cadastro;