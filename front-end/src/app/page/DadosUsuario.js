import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const DadosUsuario = () => {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();

  const handleAtualizar = () => {
    console.log('Dados atualizados:', { nome, cpf, email, telefone });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Link
            style={styles.backButtonText}
            href="/page/Perfil">{'<'}</Link>
        </TouchableOpacity>
        <Text style={styles.headerText}>DADOS DO USUÁRIO</Text>
      </View>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder='Nome'
      />

      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder='CPF'
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='E-mail'
      />

      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder='Telefone'
      />

      <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
