import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const AgendamentoAula4 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <Text style={styles.subtitle}>Você selecionnou o dia<Text style={styles.subtitle2}>17/08/23 às 15h</Text></Text>
      <View style={styles.image}>
        <Image
          source={require('../../assets/perfil.png')}
        />
        <Image
          source={require('../../assets/grafismo.png')}
        />
      </View>

      <Text style={styles.title}>Thiago Oliveira Freitas</Text>
      <Text style={styles.subtitle}>Local de encontro:</Text>
      
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Utilizar o endereço cadastrado</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ou</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Marcar local de encontro</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.rowButton}>
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
    color: '#FFF',
    textAlign: 'center',
    marginBottom:20
    
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom:50
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
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    marginBottom: 20
  },

  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },

  voltarButton:{
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    color: '#FFF'
  },

  avancarButton:{
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
  image: {
    width: 100, 
    height: 100,
    flex: 1,
    flexDirection: 'row',
    top: 40,
    left: 0
  }
});

export default AgendamentoAula4;