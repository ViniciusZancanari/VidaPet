import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from 'expo-router';

const AgendamentoAula10 = () => {
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("Dados recebidos na tela de sucesso (AgendamentoAula10):", params);
  }, [params]);

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/Home" style={styles.closeButtonText}>
          X
        </Link>
      </View>

      <View style={styles.grafismo}>
        <Image source={require('../../../assets/grafismo.png')} />
      </View>

      <View style={styles.checkIconContainer}>
        <Image source={require('../../../assets/check.png')} />
      </View>

      <Text style={styles.title}>Solicitação enviada com sucesso!</Text>

      <Text style={styles.instructions}>
        Enviaremos um e-mail para você assim que o profissional escolhido confirmar o(s) agendamento(s). Obrigado!
      </Text>

      <Link
        href={{
          pathname: "/page/Chat-Conversa",
          params: { trainerId: params.trainer_id },
        }}
        style={styles.chatButton}
      >
        <Text style={styles.buttonText}>Chat - Tire dúvidas com o adestrador</Text>
      </Link>

      <View style={styles.buttons}>
        <Link
          href={{
            pathname: "/page/AgendamentoAula9",
            params: params,
          }}
          style={[styles.voltarButton, styles.buttonTextBlack]}
        >
          Voltar
        </Link>

        <Link
          href={{
            pathname: "/page/PerfilAdestrador",
            params: { trainer_id: params.trainer_id },
          }}
          style={[styles.perfilButton, styles.buttonTextBlack]}
        >
          Perfil do adestrador
        </Link>
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
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
  },
  chatButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: '#faac0f',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  perfilButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextBlack: {
    color: '#000',
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

export default AgendamentoAula10;
