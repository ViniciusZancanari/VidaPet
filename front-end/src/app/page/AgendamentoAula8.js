import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const AgendamentoAula8 = () => {
  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      {/* X no canto superior para voltar à página PerfilAdestrador */}
      <View style={styles.header}>
        <Link href="/page/PerfilAdestrador">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <View style={styles.grafismo}>
        <Image
          source={require('../../../assets/grafismo.png')}
        />
      </View>

      <View style={styles.pixIconContainer}>
        <Text style={styles.title}>Confirme o Pedido:</Text>
        <Image
          source={require('../../../assets/pix.png')}
        />
      </View>
      <Text style={styles.title}>Pagamento por Pix:</Text>
      
      <Text style={styles.subtitle}>Passo 1</Text>
      <Text style={styles.instructions}>Copie o código que geramos pra você</Text>
      
      <Text style={styles.subtitle}>Passo 2</Text>
      <Text style={styles.instructions}>
        Abra o app do seu banco e utilize a opção "Pix Copia e Cola"
      </Text>
      
      <Text style={styles.subtitle}>Passo 3</Text>
      <View style={styles.line}>
        <Text style={styles.instructions}>
          Cole o código e faça o pagamento.{'\n'}O pagamento será confirmado na hora!
        </Text>
      </View>

      <TouchableOpacity style={styles.chatButton}>
        <Link
          style={styles.buttonText}
          href="/page/AgendamentoAula9"
        >
          Certo, vamos prosseguir!
        </Link>
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
  pixIconContainer: {
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
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffcb05',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    marginBottom: 20,
  },
  chatButton: {
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

export default AgendamentoAula8;
