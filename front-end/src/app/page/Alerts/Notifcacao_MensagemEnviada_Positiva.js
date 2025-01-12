import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';

const Notifcacao_MensagemEnviada_Positiva = () => {
  const router = useRouter();
  const [ip, setIp] = useState(Constants.manifest2?.extra?.localhost || '192.168.0.6');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Link
              style={styles.backButtonText}
              href="/page/Notificacao_AvaliacaoAula_RelatarProblemas">{'<'}
            </Link>
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerText}>AVALIAÇÃO DA AULA</Text>
          <View style={styles.headerSpacer} />
        </View>


        <View style={styles.checkIconContainer}>
          <Image source={require('../../../../assets/mensagemEnviada.png')} />
        </View>

        <Text style={styles.title}>Sua mensagem foi enviada!</Text>

        <Text style={styles.instructions}>
        Obrigado por tirar um tempinho para compartilhar sua opinião.Seu feedback é fundamental para continuarmos aprimorando o app e oferecendo a melhor experiência possível.        </Text>
        
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.inicioButton}>
          <Link
              style={styles.buttonText}
              href="/page/Home">Inicio
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: '#EF5C43',
  },
  headerSpacer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#315381',
    textAlign: 'center',
  },
  line: {
    flexDirection: 'column', // Centraliza o ícone em cima do texto
    alignItems: 'center', // Centraliza os itens no centro
    borderBottomWidth: 2,
    borderBottomColor: '#DEDEDE',
    marginBottom: 20,
    paddingVertical: 10, // Para dar um espaçamento entre ícone e texto
  },

  checkIconContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  icon: {
    width: 30, // Defina o tamanho do ícone conforme necessário
    height: 30,
    marginBottom: 5, // Espaçamento entre o ícone e o texto
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  inicioButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Notifcacao_MensagemEnviada_Positiva;
