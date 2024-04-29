import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../components/ProgressBar';

const AgendamentoAula9 = () => {
  const [countdown, setCountdown] = useState(480); // 8 hours in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  // Calcula a porcentagem do tempo restante
  const progress = ((480 - countdown) / 480) * 100;

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.grafismo}>
        <Image source={require('../../assets/grafismo.png')} />
      </View>
      <View style={styles.pixIconContainer}>
        <Text style={styles.title}>Confirme o Pedido:</Text>
        <Image source={require('../../assets/segurando o celular com pix.png')} />
      </View>
      <Text style={styles.title}>Pedido aguardando pagamento</Text>
      <Text style={styles.instructions}>Pedido aguardando pagamento Copie o código abaixo e escolha a opção “Pix Copia e Cola” no app do seu banco para fazer o pagamento:</Text>
      <Text style={styles.instructions}>
        Tempo para você pagar: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')} min
      </Text>
      <Text style={styles.instructions}>O tempo para você pagar expira em:</Text>
      <TextInput style={styles.pixNumber} />
      <ProgressBar progress={progress} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Copie o código</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  pixIconContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  pixNumber:{
    borderWidth:1,
    borderColor:'#f7aaa7',
    width:200,
    height:30,
    marginBottom:10,
    borderRadius:10
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 50,
    marginTop: 20,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grafismo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 70,
    left: 0,
  },
});

export default AgendamentoAula9;
