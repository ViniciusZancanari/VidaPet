import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const VerificarEmail = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.grafismo}>
      <Image 
      source={require('../../assets/grafismo.png')}
      />
      </View>
      <Text style={styles.title}>Confirme o pedido:</Text>
      <View style={styles.emailIconContainer}>
        <Image
          source={require('../../assets/email.png')}
        />
      </View>
      <Text style={styles.instructions}>
        Verifiquea seu e-mail e acesse-o para confirmação de seu cadastro em nosso sistema.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>OK</Text>
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

  emailIconContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 200,

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
    top: 100,
    left: 0,
  }
});

export default VerificarEmail;