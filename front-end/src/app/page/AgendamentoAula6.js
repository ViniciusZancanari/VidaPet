import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const AgendamentoAula6 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      {/* X no canto superior para voltar à página PerfilAdestrador */}
      <View style={styles.header}>
        <Link href="/page/Home">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <Text style={styles.title}>Pagamento pelo aplicativo:</Text>
      
      <TouchableOpacity style={styles.cartaoButton}>
        <View style={styles.iconButton1}>
          <Image source={require('../../../assets/cartaoCredito.png')} />
          <Link
            style={styles.cartaoButtonText}
            href="/page/AgendamentoAula11">Cartão de Crédio
          </Link>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.pixButton}>
        <View style={styles.iconButton2}>
          <Image source={require('../../../assets/pix2.png')} />
          <Link
            style={styles.cartaoButtonText}
            href="/page/AgendamentoAula7">Pix
          </Link>
        </View>
      </TouchableOpacity>
      
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.voltarButton}>
          <Link
            style={styles.buttonText}
            href="/page/AgendamentoAula5">Voltar
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.avancarButton}>
          <Link
            style={styles.buttonText}
            href="/page/AgendamentoAula7">Avançar
          </Link>
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
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50,
  },
  iconButton1: {
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
  iconButton2: {
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
    color: '#FFCB05',
  },
  cartaoButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 14,
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
    borderColor: '#faac0f',
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
    left: 0,
  },
});

export default AgendamentoAula6;
