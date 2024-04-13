import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const AgendamentoAula6 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <Text style={styles.title}>Pagamento pelo aplicativo:</Text>
      <TouchableOpacity style={styles.cartaoButton}>
        <View style={styles.iconButton1}>
          <Image source={require('../../assets/cartaoCredito.png')} />
          <Text style={styles.cartaoButtonText}>Cartão de Crédio</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pixButton}>
        <View style={styles.iconButton2}>
          <Image source={require('../../assets/pix2.png')} />
          <Text style={styles.cartaoButtonText}>Pix</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.voltarButton}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avancarButton}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>

      </View>
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

  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50
  },
  iconButton1:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    color: '#FFF',
  },
  iconButton2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    paddingVertical: 20,
    paddingHorizontal: 110,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFCB05',
    marginBottom: 50,
    color:'#FFCB05',
  },
  cartaoButtonText:{
    color: '#fff',
    fontSize: 16,
    marginLeft:14,

  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  voltarButton: {
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    color: '#FFF',

  },

  avancarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f'

  },

  buttonText: {
    color: '#fff',
    fontSize: 16,

  },
  grafismo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    position: 'absolute',
    top: 70,
    left: 0
  }
});

export default AgendamentoAula6;