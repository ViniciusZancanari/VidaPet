import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const AgendamentoAula10 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.grafismo}>
        <Image
          source={require('../../assets/grafismo.png')}
        />
      </View>
      <View style={styles.checkIconContainer}>
        <Image
          source={require('../../assets/check.png')}
        />
      </View>
      <Text style={styles.title}>Solicitação enviada com sucesso!</Text>
      <Text style={styles.instructions}>
        Enviaremos um e-mail para você assim que o profissional escolhido confirmar o(s) agendamento(s). Obrigado!
      </Text>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.buttonText}>Chat - Tire dúvidas com o adestrador</Text>
      </TouchableOpacity>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.voltarButton}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pefilButton}>
          <Text>Perfil do adestrador</Text>
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

  checkIconContainer: {
    marginTop: 150,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    textAlign:'center'
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
    textAlign:'center'

  },
  chatButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 50,
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },

  voltarButton: {
    marginRight: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,

  },
  pefilButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    color: '#000',
    marginBottom:50
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },
  grafismo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    position: 'absolute',
    top: 70,
    left: 0
  }
});

export default AgendamentoAula10;