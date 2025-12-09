import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext'; 

const AgendamentoAula8 = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    trainer_id,
    selectedDate,
    selectedTime,
    address,
    serviceValue,
    trainingServiceId,
    metodoPagamento,
  } = params;

  // Variáveis auxiliares para formatação
  const fixedServiceValue = parseFloat(serviceValue || '0');
  const addressDisplay = address || 'Endereço não especificado';
  const timeDisplay = selectedTime ? `${selectedTime.split(':')[0]} horas` : '---';
  const dateDisplay = selectedDate ? selectedDate.split('-').reverse().join('/') : '---';
  const paymentMethodDisplay = metodoPagamento === 'cartao' ? 'Cartão de Crédito' : (metodoPagamento === 'pix' ? 'PIX' : 'Dinheiro');

  // --- Estados ---
  const [clientId, setClientId] = useState(null);
  const { token } = useAuth();
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Decodificar Token
  useEffect(() => {
    setStatus('loading');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const clientIdFromToken = decodedToken.id || decodedToken.client_id || decodedToken.sub || decodedToken.userId;

        if (clientIdFromToken) {
          setClientId(clientIdFromToken);
          setStatus('idle');
          console.log('LOG: ClientID encontrado:', clientIdFromToken);
        } else {
          setErrorMessage('Não foi possível identificar o ID do usuário no token.');
          setStatus('error');
        }
      } catch (decodeError) {
        console.error('Erro ao decodificar token:', decodeError);
        setErrorMessage('Token inválido. Faça login novamente.');
        setStatus('error');
      }
    } else {
      setErrorMessage('Sua sessão não foi encontrada. Faça login novamente.');
      setStatus('error');
    }
  }, [token]);

  const handleClose = () => {
    router.push('/page/Home');
  };

  const handleAlterarDados = () => {
    router.push({
      pathname: '/page/AgendamentoAula4',
      params: {
        trainer_id,
        selectedDate,
        selectedTime,
      }
    });
  };

  // 4. Função principal de Pagamento Web
  const handleScheduleAndPay = async () => {
    if (!token || !clientId) {
      Alert.alert('Erro', 'Sessão inválida. Por favor, faça login novamente.');
      return;
    }

    // Validação básica antes de enviar
    if (!trainer_id || !selectedDate || !selectedTime) {
        Alert.alert('Erro', 'Dados do agendamento incompletos (Trainer, Data ou Hora faltando).');
        return;
    }

    setStatus('generating');
    setErrorMessage('');

    const cleanedToken = token ? token.replace('Bearer ', '').trim() : null;
    const backendUrl = 'https://apipet.com.br/payment/book-class';

    // CORREÇÃO DA DATA: Formatação ISO 8601 (igual à Aula 7)
    // Se a API espera: 2025-12-24T14:00:00Z
    const formattedDate = (selectedDate && selectedTime) 
        ? `${selectedDate}T${selectedTime}:00Z` 
        : selectedDate;

    // Construção do objeto DATA com verificação de nulos
    const data = {
      client_id: clientId,
      trainer_id: trainer_id,
      // Se fixedServiceValue for 0 ou NaN, envia 1.00 para não dar erro de valor zerado
      total_price: (!fixedServiceValue || fixedServiceValue <= 0) ? 1 : fixedServiceValue,
      address: address || "Endereço Online/A Combinar", // Fallback para não ir vazio
      hourClass: selectedTime,
      availableDate: formattedDate, 
      type_payment: "CARD", 
    };

    // LOG PARA DEBUG (Veja isso no console se der erro novamente)
    console.log('--- ENVIANDO PAYLOAD PARA API ---');
    console.log(JSON.stringify(data, null, 2));
    console.log('---------------------------------');

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanedToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('--- RESPOSTA API ---', result);

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Falha ao gerar o pagamento.');
      }

      const checkoutUrl = result.init_point; 
      
      if (!checkoutUrl) {
        throw new Error('URL de checkout não recebida do backend.');
      }

      setStatus('waiting');

      const redirectUrl = Linking.createURL('');
      const authResult = await WebBrowser.openAuthSessionAsync(checkoutUrl, redirectUrl);

      if (authResult.type === 'success') {
        const { queryParams } = Linking.parse(authResult.url);
        const paymentStatus = queryParams?.status || queryParams?.collection_status;

        // Se o status for sucesso ou aprovado
        if (paymentStatus === 'approved' || paymentStatus === 'success') {
            router.push({
                pathname: '/page/AgendamentoAula9',
                params: {
                    ...params,
                    paymentStatus: 'approved',
                    trainingServiceId: result.id || trainingServiceId 
                }
            });
        } else {
            // Pagamento pendente ou falhou
            Alert.alert('Pagamento não concluído', `Status: ${paymentStatus || 'desconhecido'}`);
            setStatus('idle');
        }
      } else {
        setStatus('idle');
      }

    } catch (error) {
      console.error('--- Erro Pagamento Catch ---', error);
      setErrorMessage(error.message || 'Erro ao processar pagamento.');
      setStatus('error');
    }
  };

  // --- RENDERIZAÇÃO ---

  if (status === 'loading' || status === 'generating' || status === 'waiting') {
    return (
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>
          {status === 'loading' && 'Verificando sessão...'}
          {status === 'generating' && 'Gerando Link de Pagamento...'}
          {status === 'waiting' && 'Aguardando Pagamento no Navegador...'}
        </Text>
      </LinearGradient>
    );
  }

  if (status === 'error') {
    return (
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <Text style={styles.title}>❌ Ops!</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableOpacity style={styles.confirmarButton} onPress={() => setStatus('idle')}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dadosButton} onPress={handleClose}>
          <Text style={styles.buttonText}>Voltar para o Início</Text>
        </TouchableOpacity>
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

        <Text style={styles.title}>Detalhes do Pagamento</Text>

        <View style={styles.line}>
          <Image source={require('../../../assets/data.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Data/Horário:</Text>
          <Text style={styles.instructions}>
            {dateDisplay} às {timeDisplay}
          </Text>
        </View>

        <View style={styles.line}>
          <Image source={require('../../../assets/local.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Local:</Text>
          <Text style={styles.instructions}>{addressDisplay}</Text>
        </View>

        <View style={styles.line}>
          <Image source={require('../../../assets/valorTrainner.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Valor Total:</Text>
          <Text style={styles.instructions}>R$ {fixedServiceValue.toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.subtitle}>Método:</Text>
          <Text style={styles.instructions}>{paymentMethodDisplay}</Text>
        </View>

        <Text style={styles.subtext}>
            Você será redirecionado para o navegador para concluir o pagamento seguro.
        </Text>

        <View style={styles.buttonsContainer}>
            <TouchableOpacity
            style={[styles.dadosButton, status !== 'idle' && styles.disabledButton]}
            onPress={handleAlterarDados}
            disabled={status !== 'idle'}
            >
            <Text style={styles.buttonText}>Alterar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.confirmarButton, status !== 'idle' && styles.disabledButton]}
            onPress={handleScheduleAndPay}
            disabled={status !== 'idle'}
            >
            <Text style={styles.buttonText}>Ir para o Pagamento</Text>
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
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 15,
    fontStyle: 'italic',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  dadosButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: '80%',
    alignItems: 'center',
  },
  confirmarButton: {
    backgroundColor: '#191970',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#faac0f',
    width: '80%',
    alignItems: 'center',
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
    marginTop: 20,
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default AgendamentoAula8;