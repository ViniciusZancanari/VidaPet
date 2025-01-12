import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';

const Notifcacao_AvaliacaoAula = () => {
  const router = useRouter();
  const [ip, setIp] = useState(Constants.manifest2?.extra?.localhost || '192.168.0.6');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Link
            style={styles.backButtonText}
            href="/page/Notificacao2">{'<'}
          </Link>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerText}>CONFIRMAÇÃO DA AULA</Text>
        <View style={styles.headerSpacer} />
      </View>



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
        <TouchableOpacity style={styles.recusarButton}>
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmarButton}>
          <Link style={styles.buttonText2}
          href= {'/page/Notifcacao_AulaConfirmada'}>Confirmar</Link>
        </TouchableOpacity>
      </View>
    </View>
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
  recusarButton: {
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
  confirmarButton: {
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

export default Notifcacao_AvaliacaoAula;
