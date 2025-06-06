import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendamentoAula6 = () => {
  const [address, setAddress] = useState('Carregando endereço...');
  const [metodoPagamentoSelecionado, setMetodoPagamentoSelecionado] = useState(null);
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime } = useLocalSearchParams();

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem('selectedAddress');
        if (savedAddress !== null) {
          setAddress(savedAddress);
        } else {
          setAddress('Endereço não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao recuperar o endereço:', error);
        setAddress('Erro ao carregar o endereço.');
      }
    };
    loadAddress();
  }, []);

  const handleAvancar = () => {
    const bookingDetails = {
      trainer_id,
      selectedDate,
      selectedTime,
      address,
      metodoPagamento: metodoPagamentoSelecionado,
    };

    if (metodoPagamentoSelecionado === 'cartao') {
      router.push({
        pathname: '/page/FormaDePagamento',
        params: bookingDetails,
      });
    } else if (metodoPagamentoSelecionado === 'pix') {
      router.push({
        pathname: '/page/AgendamentoAula7',
        params: bookingDetails,
      });
    } else {
      Alert.alert('Seleção Necessária', 'Por favor, selecione uma forma de pagamento para continuar.');
    }
  };

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/Home">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <Text style={styles.title}>Pagamento pelo aplicativo:</Text>

      <TouchableOpacity 
        style={[
          styles.paymentButton, 
          metodoPagamentoSelecionado === 'cartao' && styles.selectedButton
        ]}
        onPress={() => setMetodoPagamentoSelecionado('cartao')}
      >
        <Image source={require('../../../assets/cartaoCredito.png')} />
        <Text style={[
          styles.paymentButtonText,
          metodoPagamentoSelecionado === 'cartao' && styles.selectedText
        ]}>
          Cartão de Crédito
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.paymentButton, 
          metodoPagamentoSelecionado === 'pix' && styles.selectedButton
        ]}
        onPress={() => setMetodoPagamentoSelecionado('pix')}
      >
        <Image source={require('../../../assets/pix2.png')} />
        <Text style={[
          styles.paymentButtonText,
          metodoPagamentoSelecionado === 'pix' && styles.selectedText
        ]}>
          Pix
        </Text>
      </TouchableOpacity>
      
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.voltarButton}>
          <Link
            style={styles.buttonText}
            href={{
                pathname: "/page/Endereco1-1",
                params: { trainer_id, selectedDate, selectedTime }
            }}
          >
            Voltar
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.avancarButton,
            !metodoPagamentoSelecionado && styles.avancarButtonDisabled
          ]} 
          onPress={handleAvancar}
          disabled={!metodoPagamentoSelecionado}
        >
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
    width: '90%',
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
    color: '#FFF',
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