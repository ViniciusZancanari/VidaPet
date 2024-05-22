import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const AgendamentoAula1 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <Text style={styles.subtitle}>Agende suas <Text style={styles.subtitle2}>aulas</Text></Text>
      <View style={styles.image}>
        <Image
          source={require('../../assets/perfil.png')}
        />
        <Image
          source={require('../../assets/grafismo.png')}
        />
      </View>
        <Text style={styles.title}>Thiago Oliveira Freitas</Text>
      <Text style={styles.subtitle}>Você escolheu o plano <Text style={styles.subtitle2}>avulso</Text></Text>
        <TouchableOpacity style={styles.button}>
        <Image
          source={require('../../assets/data.png')}
        />
          <Text style={styles.buttonText}>  Escolha uma data</Text>
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
    marginTop: 150,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'yellow',
    textAlign: 'center',
    marginBottom: 20
  },

  button: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 320,
    flexDirection: 'row',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,

  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    flex: 1,
    flexDirection: 'row',
    top: 40,
    left: 0
  }
});

export default AgendamentoAula1;