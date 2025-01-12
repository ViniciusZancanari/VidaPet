import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';

const Notifcacao_AulaConfirmada = () => {
  const router = useRouter();
  const [ip, setIp] = useState(Constants.manifest2?.extra?.localhost || '192.168.0.6');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Link
              style={styles.backButtonText}
              href="/page/Notifcacao_AvaliacaoAula">{'<'}
            </Link>
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerText}>CONFIRMAÇÃO DA AULA</Text>
          <View style={styles.headerSpacer} />
        </View>


        <View style={styles.checkIconContainer}>
          <Image source={require('../../../assets/check.png')} />
        </View>

        <Text style={styles.title}>Parabéns, sua aula foi confirmada!</Text>

        <Text style={styles.instructions}>
          Chegue 10 minutos antes no local combinado e não aceite cobranças extras além do que já foi acordado no app. Certifique-se de que o ambiente é seguro para você e seu pet, e evite compartilhar informações pessoais com o profissional.
        </Text>
        <View style={styles.line}>
          <Image source={require('../../../assets/profissionalTrainner.png')} />
          <Text style={styles.subtitle}>Profissional:</Text>
          <Text style={styles.instructions}>Thiago Oliveira Freitas</Text>
        </View>
        <View style={styles.line}>
          <Image source={require('../../../assets/dataTrainner.png')} />
          <Text style={styles.subtitle}>Data/Horário:</Text>
          <Text style={styles.subtitle}>17/08/24 17:00</Text>
        </View>
        <View style={styles.line}>
          <Image source={require('../../../assets/localTrainner.png')} />
          <Text style={styles.subtitle}>Local do Encontro:</Text>
          <Text style={styles.instructions}>
            Av. Lorem Ipsum, 135{'\n'} Aclimação - São Paulo/SP
          </Text>
        </View>

        <View style={styles.line}>
          <Image source={require('../../../assets/valorTrainner.png')} />
          <Text style={styles.subtitle}>Valor do serviço:</Text>
          <Text style={styles.instructions}>
            R$ 50,00
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.inicioButton}>
          <Link
              style={styles.buttonText}
              href="/page/Home">Inicio
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.perfilAdestradorButton}>
            <Link
              style={styles.buttonText2}
              href="/page/PerfilAdestrador">Perfil do Adestrador
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
    marginRight: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 50,
    color: '#000',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  perfilAdestradorButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },

  buttonText2: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Notifcacao_AulaConfirmada;
