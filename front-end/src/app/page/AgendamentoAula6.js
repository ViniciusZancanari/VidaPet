import React, { useState } from 'react'; // REMOVIDO: useEffect e ActivityIndicator
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
// REMOVIDO: import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendamentoAula6 = () => {
  // REMOVIDO: const [address, setAddress] = useState(null);
  // REMOVIDO: const [loadingAddress, setLoadingAddress] = useState(true);
  const [metodoPagamentoSelecionado, setMetodoPagamentoSelecionado] = useState(null);
  const router = useRouter();

  // MODIFICADO: Agora recebemos o 'address' diretamente dos parâmetros
  const { trainer_id, selectedDate, selectedTime, address } = useLocalSearchParams();

  // REMOVIDO: O bloco inteiro do useEffect que carregava o endereço do AsyncStorage foi removido.

  const handleAvancar = () => {
    if (!metodoPagamentoSelecionado) {
      Alert.alert('Seleção Necessária', 'Por favor, selecione uma forma de pagamento para continuar.');
      return;
    }
    
    // O objeto 'bookingDetails' agora usa o 'address' vindo diretamente dos parâmetros.
    const bookingDetails = {
      trainer_id,
      selectedDate,
      selectedTime,
      address, // <-- Vindo direto do useLocalSearchParams
      metodoPagamento: metodoPagamentoSelecionado,
    };

    router.push({ pathname: '/page/AgendamentoAula7', params: bookingDetails });
  };

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      {/* O resto do seu código JSX continua o mesmo... */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/page/Home')}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Pagamento pelo aplicativo:</Text>
      <View style={{ width: '90%' }}>
        {/* MODIFICADO: Removemos o ActivityIndicator e exibimos o endereço diretamente */}
        <Text style={{ color: '#fff', marginBottom: 20, textAlign: 'center' }}>
          Endereço selecionado: {address || 'Endereço não fornecido'}
        </Text>

        <TouchableOpacity
          style={[styles.paymentButton, metodoPagamentoSelecionado === 'cartao' && styles.selectedButton]}
          onPress={() => setMetodoPagamentoSelecionado('cartao')}
        >
          <Image source={require('../../../assets/cartaoCredito.png')} />
          <Text style={[styles.paymentButtonText, metodoPagamentoSelecionado === 'cartao' && styles.selectedText]}>
            Cartão de Crédito
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, metodoPagamentoSelecionado === 'pix' && styles.selectedButton]}
          onPress={() => setMetodoPagamentoSelecionado('pix')}
        >
          <Image source={require('../../../assets/pix2.png')} />
          <Text style={[styles.paymentButtonText, metodoPagamentoSelecionado === 'pix' && styles.selectedText]}>
            Pix
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.voltarButton}
          onPress={() =>
            router.push({
              pathname: '/page/AgendamentoAula5',
              params: { trainer_id, selectedDate, selectedTime },
            })
          }
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.avancarButton, !metodoPagamentoSelecionado && styles.avancarButtonDisabled]}
          onPress={handleAvancar}
          // MODIFICADO: A verificação de 'loadingAddress' foi removida do 'disabled'
          disabled={!metodoPagamentoSelecionado}
        >
          <Text style={[styles.buttonText, !metodoPagamentoSelecionado && { color: '#ddd' }]}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Seus estilos (styles) continuam os mesmos...
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
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#fff',
    marginBottom: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 14,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#FFCB05',
    borderColor: '#FFCB05',
  },
  selectedText: {
    color: '#191970',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  voltarButton: {
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  avancarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#faac0f',
  },
  avancarButtonDisabled: {
    backgroundColor: '#a9a9a9',
    borderColor: '#696969',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendamentoAula6;