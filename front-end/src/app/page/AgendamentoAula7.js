import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const AgendamentoAula7 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.grafismo}>
        <Image
          source={require('../../../assets/grafismo.png')}
        />
      </View>
      <View style={styles.pixIconContainer}>
        <Text style={styles.title}>Confirme o Pedido:</Text>
        <Image
          source={require('../../../assets/profissional.png')}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.subtitle}>Profissional:</Text>
        <Text style={styles.instructions}>
          Thiago Oliveira Freitas
        </Text>
      </View>
      <Image
        source={require('../../../assets/data.png')}
      />
      <View style={styles.line}>
        <Text style={styles.subtitle}>Data/Horário:</Text>
        <Text style={styles.instructions}>
          17/08/23 às 15h
        </Text>
      </View>
      <Image
        source={require('../../../assets/local.png')}
      />
      <View style={styles.line}>
        <Text style={styles.subtitle}>Local do Encontro:</Text>
        <Text style={styles.instructions}>
          Av. Lorem Ipsum, 135{'\n'} Aclimação - São Paulo/SP
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.dadosButton}>
          <Link
            style={styles.buttonText}
            href="/page/AgendamentoAula1">Alterar Dados
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmarButton}>
          <Link
            style={styles.buttonText}
            href="/page/AgendamentoAula8">Confirmar
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

  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
    textAlign: 'center',
  },
  dadosButton: {
    marginRight: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    color: '#FFF',

  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    marginBottom: 20
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

export default AgendamentoAula7;