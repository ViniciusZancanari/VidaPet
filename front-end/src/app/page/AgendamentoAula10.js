import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// 1. Importar o hook para receber parâmetros
import { Link, useLocalSearchParams } from 'expo-router';

const AgendamentoAula10 = () => {
  // 2. Receber os dados do agendamento da tela anterior
  const params = useLocalSearchParams();

  useEffect(() => {
    // Log para confirmar que os dados do agendamento final chegaram
    console.log("Dados recebidos na tela de sucesso (AgendamentoAula10):", params);
  }, [params]);

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/Home">
          <Text style={styles.closeButtonText}>X</Text>
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

      {/* 3. TORNAR O LINK DO CHAT DINÂMICO */}
      <TouchableOpacity style={styles.chatButton}>
        <Link 
          style={styles.buttonText} 
          href={{
            pathname: "/page/Chat-Conversa",
            // Envia o ID do adestrador para abrir a conversa correta
            params: { trainerId: params.trainer_id } 
          }}
        >
          Chat - Tire dúvidas com o adestrador
        </Link>
      </TouchableOpacity>

      <View style={styles.buttons}>
        {/* 4. (OPCIONAL) Manter o contexto de dados no botão Voltar */}
        <TouchableOpacity style={styles.voltarButton}>
          <Link 
            style={styles.buttonText} 
            href={{
              pathname: "/page/AgendamentoAula9",
              // Devolve todos os parâmetros caso o usuário volte
              params: params 
            }}
          >
            Voltar
          </Link>
        </TouchableOpacity>

        {/* 5. TORNAR O LINK DO PERFIL DINÂMICO */}
        <TouchableOpacity style={styles.pefilButton}>
          <Link 
            href={{
              pathname: "/page/PerfilAdestrador",
              // Envia o ID para carregar o perfil do adestrador correto
              params: { trainer_id: params.trainer_id }
            }}
          >
            Perfil do adestrador
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
    borderStyle: 'solid',
    borderColor: '#faac0f',
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
    marginBottom: 50,
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

export default AgendamentoAula10;