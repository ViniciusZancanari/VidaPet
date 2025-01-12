import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const AgendamentoAula5 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      {/* X no canto superior para voltar à página PerfilAdestrador */}
      <View style={styles.header}>
        <Link href="/page/PerfilAdestrador">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <Text style={styles.subtitle}>Você selecionnou o dia<Text style={styles.subtitle2}>17/08/23 às 15h</Text></Text>
      <View style={styles.image}>
        <Image
          source={require('../../../assets/perfil.png')}
        />
        <Image
          source={require('../../../assets/grafismo.png')}
        />
      </View>

      <Text style={styles.title}>Thiago Oliveira Freitas</Text>
      <Text style={styles.subtitle}>Local de encontro:</Text>

      <View style={styles.line}>
        <TextInput placeholder='Digite um endereço:' />
      </View>

      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.voltarButton}>
          <Link
            style={styles.buttonText}
            href="/page/AgendamentoAula4">Voltar
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avancarButton}>
          <Link
            style={styles.buttonText}
            href="/page/AgendamentoAula6">Avançar
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
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50,
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'yellow',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  marcarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    color: '#fff',
    marginBottom: 50,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    marginBottom: 20,
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    flex: 1,
    flexDirection: 'row',
    top: 40,
    left: 0,
  },
});

export default AgendamentoAula5;
