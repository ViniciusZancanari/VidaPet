import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';

const AgendamentoAula8 = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleContinue = () => {
    if (!params.trainer_id || !params.selectedDate || !params.selectedTime || !params.meetingAddress) {
      Alert.alert('Erro', 'Informações faltando. Por favor, volte e tente novamente.');
      return;
    }

    router.push({
      pathname: '/page/AgendamentoAula9',
      params: {
        trainer_id: params.trainer_id,
        selectedDate: params.selectedDate,
        selectedTime: params.selectedTime,
        meetingAddress: params.meetingAddress,
        serviceValue: params.serviceValue
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <View style={styles.header}>
          <Link href="/page/Home">
            <Text style={styles.closeButtonText}>X</Text>
          </Link>
        </View>

        <View style={styles.grafismo}>
          <Image source={require('../../../assets/grafismo.png')} />
        </View>

        <View style={styles.content}>
          <View style={styles.pixIconContainer}>
            <Text style={styles.title}>Confirme o Pedido:</Text>
            <Image 
              source={require('../../../assets/pix.png')} 
              style={styles.pixImage}
            />
          </View>
          
          <Text style={styles.title}>Pagamento por Pix:</Text>
          
          <View style={styles.stepContainer}>
            <Text style={styles.subtitle}>Passo 1</Text>
            <Text style={styles.instructions}>Copie o código que geramos pra você</Text>
          </View>
          
          <View style={styles.stepContainer}>
            <Text style={styles.subtitle}>Passo 2</Text>
            <Text style={styles.instructions}>
              Abra o app do seu banco e utilize a opção "Pix Copia e Cola"
            </Text>
          </View>
          
          <View style={styles.stepContainer}>
            <Text style={styles.subtitle}>Passo 3</Text>
            <View style={styles.line}>
              <Text style={styles.instructions}>
                Cole o código e faça o pagamento.{'\n'}O pagamento será confirmado na hora!
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.chatButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Certo, vamos prosseguir!</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: '100%',
    width: '100%',
    paddingBottom: 40,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 150,
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  pixIconContainer: {
    marginBottom: 30,
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
  stepContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
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
    marginBottom: 15,
    color: '#FFF',
    lineHeight: 22,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    paddingBottom: 20,
    width: '80%',
  },
  chatButton: {
    backgroundColor: '#191970',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    borderWidth: 3,
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
  pixImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default AgendamentoAula8;