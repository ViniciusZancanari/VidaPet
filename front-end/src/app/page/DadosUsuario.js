import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios'; 

const DadosUsuario = () => {
  const [username, setUsername] = useState('');
  const [CPF, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [address, setAddress] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [smsWhatsappMessages, setSmsWhatsappMessages] = useState(false);

  const [endereco, setEndereco] = useState('');
  const [enderecoN, setEnderecoN] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [password, setPassword] = useState(''); // Novo estado para a senha

  // IP Estático
  const ip = '172.29.0.1'; // Substitua pelo IP do seu servidor
  const userId = '9b8b0296-758d-489c-847e-043336b65f35';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://${ip}:3000/client/${userId}`);
        const data = await response.json();
  
        console.log("Dados recebidos do backend:", data); // Depuração
  
        setUsername(data.username || '');
        setCpf(data.CPF || '');
        setEmail(data.email || '');
        setCellphone(data.cellphone || '');
        setAddress(data.address || '');
        setPrivacyPolicy(data.privacy_policy || true);
        setSmsWhatsappMessages(data.sms_whatsapp_messages || false);
        setPassword(data.password || ''); // Opcional, depende do backend
  
        if (data.address) {
          const addressParts = data.address.split(',').map(part => part.trim());
          setEndereco(addressParts[0] || '');
          setEnderecoN(addressParts[1] || '');
          setComplemento(addressParts[2] || '');
          setBairro(addressParts[3] || '');
          setCidade(addressParts[4] || '');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };
  
    fetchUserData();
  }, []);
  


  const handleAtualizar = async () => {
    const formattedAddress = `${endereco}, ${enderecoN}${complemento ? `, ${complemento}` : ''}, ${bairro}, ${cidade}`;
    setAddress(formattedAddress);
  
    const updatedData = {
      username,
      CPF, // Verifique se o CPF está correto aqui
      email,
      cellphone,
      address: formattedAddress,
      privacy_policy: privacyPolicy,
      sms_whatsapp_messages: smsWhatsappMessages,
      password,
    };
  
    console.log("Dados enviados ao backend:", updatedData); // Depuração
  
    try {
      const response = await axios.put(`http://${ip}:3000/client/${userId}`, updatedData);
      console.log('Resposta do backend ao atualizar:', response.data);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Não foi possível atualizar os dados do usuário.');
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

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Usuário"
        />
         <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry // Para ocultar a senha enquanto digita
        />

        <TextInput
          style={styles.input}
          value={CPF}
          onChangeText={setCpf}
          placeholder="CPF"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
        />

        <TextInput
          style={styles.input}
          value={cellphone}
          onChangeText={setCellphone}
          placeholder="Celular"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Endereço"
        />

        <TextInput
          style={styles.input}
          value={enderecoN}
          onChangeText={setEnderecoN}
          placeholder="Número"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={complemento}
          onChangeText={setComplemento}
          placeholder="Complemento"
        />

        <TextInput
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
          placeholder="Bairro"
        />

        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
          placeholder="Cidade"
        />

        <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
          <Text style={styles.buttonText}>Atualizar</Text>
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
