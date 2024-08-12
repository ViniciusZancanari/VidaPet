import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';

const Cadastro = () => {
  const [isSelected, setSelection] = useState(false);
  const [isSMSSelected, setSMSSelection] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image style={styles.logo} source={require('../../../assets/logo1.png')} />
      <View style={styles.radioContainer}>
        <TouchableOpacity style={styles.radioItem}>
          <View style={styles.radioButtonSelected} />
          <Text style={styles.radioText}>Usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioItem}>
          <View style={styles.radioButton} />
          <Text style={styles.radioText}>Adestrador</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail:</Text>
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#FFF" />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome completo:</Text>
        <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor="#FFF" />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Celular:</Text>
        <TextInput style={styles.input} placeholder="Celular" placeholderTextColor="#FFF" />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Digite uma senha:</Text>
        <TextInput style={styles.input} placeholder="Digite uma senha" placeholderTextColor="#FFF" secureTextEntry={true} />
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.gradientLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirmar senha:</Text>
        <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#FFF" secureTextEntry={true} />
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

      <TouchableOpacity style={styles.button}>
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  radioText: {
    color: 'white',
    marginLeft: 5,
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
