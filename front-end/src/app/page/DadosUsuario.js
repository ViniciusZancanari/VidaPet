import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DadosUsuario = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [CPF, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [address, setAddress] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [smsWhatsappMessages, setSmsWhatsappMessages] = useState(false);
  const [password, setPassword] = useState('');

  const [endereco, setEndereco] = useState('');
  const [enderecoN, setEnderecoN] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) throw new Error('Dados do usuário não encontrados');

        const parsedUser = JSON.parse(userData);
        const userId = parsedUser?.id;
        const token = parsedUser?.token;

        if (!userId || !token) {
          Alert.alert('Erro', 'Usuário não autenticado.');
          router.push('/login');
          return;
        }

        const response = await axios.get(`https://apipet.com.br/client/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;

        setUsername(data.username || '');
        setCpf(data.CPF || '');
        setEmail(data.email || '');
        setCellphone(data.cellphone || '');
        setAddress(data.address || '');
        setPrivacyPolicy(data.privacy_policy ?? true);
        setSmsWhatsappMessages(data.sms_whatsapp_messages ?? false);
        setPassword('');

        if (data.address) {
          const parts = data.address.split(',').map(p => p.trim());
          setEndereco(parts[0] || '');
          setEnderecoN(parts[1] || '');
          setComplemento(parts[2] || '');
          setBairro(parts[3] || '');
          setCidade(parts[4] || '');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAtualizar = async () => {
    const addressParts = [endereco, enderecoN, complemento, bairro, cidade].filter(p => p && p.trim() !== '');
    const formattedAddress = addressParts.join(', ');

    if (!username || !email) {
      Alert.alert('Erro', 'Nome de usuário e e-mail são obrigatórios');
      return;
    }

    const updatedData = {
      username,
      email,
      ...(CPF && { CPF }),
      ...(cellphone && { cellphone }),
      address: formattedAddress,
      privacy_policy: privacyPolicy,
      sms_whatsapp_messages: smsWhatsappMessages,
      ...(password && { password }),
    };

    setLoading(true);

    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) throw new Error('Dados do usuário não encontrados');

      const parsedUser = JSON.parse(userData);
      const userId = parsedUser?.id;
      const token = parsedUser?.token;

      if (!userId || !token) throw new Error('Usuário não autenticado');

      const response = await axios.put(
        `https://apipet.com.br/client/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Resposta da API:', response.data);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      let msg = 'Não foi possível atualizar os dados.';
      if (error.response?.data?.message) {
        msg = error.response.data.message;
      }
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Link style={styles.backButtonText} href="/page/Perfil">{'<'}</Link>
          </TouchableOpacity>
          <Text style={styles.headerText}>DADOS DO USUÁRIO</Text>
        </View>

        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Usuário" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry />
        <TextInput style={styles.input} value={CPF} onChangeText={setCpf} placeholder="CPF" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" />
        <TextInput style={styles.input} value={cellphone} onChangeText={setCellphone} placeholder="Celular" keyboardType="phone-pad" />
        <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Endereço" />
        <TextInput style={styles.input} value={enderecoN} onChangeText={setEnderecoN} placeholder="Número" keyboardType="numeric" />
        <TextInput style={styles.input} value={complemento} onChangeText={setComplemento} placeholder="Complemento" />
        <TextInput style={styles.input} value={bairro} onChangeText={setBairro} placeholder="Bairro" />
        <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Cidade" />

        <TouchableOpacity style={styles.button} onPress={handleAtualizar} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Atualizar</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: '#EF5C43',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#315381',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    color: 'black',
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#faac0f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DadosUsuario;
