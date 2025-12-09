import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

const AgendamentoAula7 = () => {
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime, address, metodoPagamento } = useLocalSearchParams();
  const { token } = useAuth();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [clientId, setClientId] = useState(null);
  const fixedServiceValue = 1;

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '---';
    return `${timeString.split(':')[0]} horas`;
  };

  useEffect(() => {
    setLoading(true);
    
    const processToken = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Token decodificado:', decodedToken);
          const clientIdFromToken = decodedToken.id || decodedToken.client_id || decodedToken.sub || decodedToken.userId;
          
          if (clientIdFromToken) {
            setClientId(clientIdFromToken);
            console.log('Client ID encontrado:', clientIdFromToken);
          } else {
            console.log('Estrutura do token:', decodedToken);
            Alert.alert('Erro', 'Não foi possível identificar o ID do usuário no token.');
          }
        } catch (decodeError) {
          console.error('Erro ao decodificar token:', decodeError);
          Alert.alert('Erro', 'Token inválido. Faça login novamente.');
        }
      } else {
        console.log('Aguardando token do AuthContext...');
      }
    };

    const fetchTrainerData = async () => {
      if (!trainer_id) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://apipet.com.br/trainer/${trainer_id}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Erro ao buscar dados do trainer');
        }
        
        setTrainer(result);
      } catch (error) {
        console.error('Erro ao buscar dados do trainer:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do profissional.');
      } finally {
        setLoading(false);
      }
    };

    processToken();
    fetchTrainerData();
  }, [trainer_id, token]);

  const handleClose = () => {
    router.push('/page/Home');
  };

  const handleAlterarDados = () => {
    router.push({
      pathname: '/page/AgendamentoAula4',
      params: {
        trainer_id: trainer_id?.toString() ?? '',
        selectedDate,
        selectedTime,
      }
    });
  };

  const handleConfirmar = async () => {
    if (!clientId || !token) { 
      Alert.alert('Erro', 'ID do cliente não encontrado ou sessão expirada. Faça login novamente.');
      return;
    }

    setConfirmLoading(true);

    try {
      const formattedDate = `${selectedDate}T${selectedTime}:00Z`;
      const paymentMethodMap = {
        'cartao': 'CARD',
        'pix': 'PIX',
        'dinheiro': 'CASH'
      };
      
      const trainingServiceData = {
        client_id: clientId,
        trainer_id: trainer_id?.toString() ?? '',
        type_payment: paymentMethodMap[metodoPagamento] || 'CARD',
        address: address || '',
        hourClass: selectedTime,
        availableDate: formattedDate,
        total_price: fixedServiceValue, 
      };

      console.log('--- FRONTEND: Enviando para a API ---');
      console.log('URL:', 'https://apipet.com.br/payment/book-class');
      console.log('Body:', JSON.stringify(trainingServiceData, null, 2));
      console.log('Token sendo enviado:', token ? 'Token presente' : 'Token ausente');

      const response = await fetch('https://apipet.com.br/payment/book-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(trainingServiceData),
      });

      const result = await response.json();

      console.log('--- FRONTEND: Resposta completa da API ---', JSON.stringify(result, null, 2));

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Falha ao criar o agendamento.');
      }

      if (result && result.id) {
        const trainingServiceId = result.id;
        const paramsToForward = {
          trainer_id: trainer_id?.toString() ?? '',
          selectedDate,
          selectedTime,
          address,
          serviceValue: fixedServiceValue,
          metodoPagamento,
          trainingServiceId: trainingServiceId.toString(),
        };

        if (metodoPagamento === 'cartao') {
          router.push({
            pathname: '/page/AgendamentoAula12',
            params: paramsToForward,
          });
        } else {
          router.push({
            pathname: '/page/AgendamentoAula8',
            params: paramsToForward,
          });
        }
      } else {
        throw new Error('ID do serviço não retornado pela API');
      }
    } catch (error) {
      console.error('--- FRONTEND: Erro na chamada fetch ---', error);
      
      if (error.message.includes('Invalid token') || error.message.includes('401')) {
        Alert.alert(
          'Token Inválido',
          'Sua sessão expirou ou o token é inválido. Faça login novamente.',
          [{ text: 'OK', onPress: () => router.push('/login') }]
        );
      } else {
        Alert.alert(
          'Erro',
          error.message || 'Não foi possível confirmar o agendamento. Tente novamente.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grafismo}>
          <Image source={require('../../../assets/grafismo.png')} style={styles.grafismoImage} />
        </View>

        <Text style={styles.title}>Confirme o Pedido:</Text>

        {/* --- Bloco Profissional --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/profissional.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Profissional:</Text>
          <Text style={styles.instructions}>{trainer?.username || 'Nome não disponível'}</Text>
        </View>

        {/* --- Bloco Data/Horário --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/data.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Data/Horário:</Text>
          <Text style={styles.instructions}>
            {formatDate(selectedDate)} às {formatTime(selectedTime)}
          </Text>
        </View>

        {/* --- Bloco Local --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/local.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Local do Encontro:</Text>
          <Text style={styles.instructions}>{address || 'Endereço não especificado'}</Text>
        </View>

        {/* --- Bloco Valor --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/valorTrainner.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Valor do serviço:</Text>
          <Text style={styles.instructions}>R$ {fixedServiceValue.toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.dadosButton, confirmLoading && styles.disabledButton]}
            onPress={handleAlterarDados}
            disabled={confirmLoading}
          >
            <Text style={styles.buttonText}>Alterar Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.confirmarButton, confirmLoading && styles.disabledButton]}
            onPress={handleConfirmar}
            disabled={confirmLoading}
          >
            {confirmLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Confirmar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
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
  iconStyle: {
    marginBottom: 10,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF',
    marginTop: 5,
  },
  dadosButton: {
    marginRight: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  confirmarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#faac0f',
  },
  disabledButton: {
    opacity: 0.6,
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
  grafismoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AgendamentoAula7;