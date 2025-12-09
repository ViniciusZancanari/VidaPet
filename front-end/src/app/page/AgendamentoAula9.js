import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Imports para o fluxo de Browser
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const AgendamentoAula9 = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { token } = useAuth();
  
  // Parâmetros recebidos da tela anterior
  const training_service_id = params.trainingServiceId;
  const serviceValue = params.serviceValue;
  const trainer_id = params.trainer_id;
  const selectedDate = params.selectedDate;
  const selectedTime = params.selectedTime;
  const address = params.address;
  const metodoPagamento = params.metodoPagamento; // 'PIX' ou 'CARD'
  
  // Estados unificados para o fluxo de pagamento
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'generating', 'waiting', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // 
  // GRANDE MUDANÇA: Todas as lógicas de PIX (fetchUserData, polling, renderPaymentResult, copyToClipboard)
  // foram removidas, pois o browser cuidará de tudo.
  //

  /**
   * Função UNIFICADA para criar o pagamento e abrir o browser,
   * seja para PIX ou Cartão.
   */
  const handleScheduleAndPay = async () => {
    console.log(`Iniciando pagamento via Browser para: ${metodoPagamento}`);
    setPaymentStatus('generating');
    setErrorMessage('');

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.sub || decoded?.id || decoded?.userId;
      if (!userId) throw new Error('ID do usuário inválido no token');
    } catch (e) {
      Alert.alert('Erro', 'Token de autenticação inválido.');
      setPaymentStatus('idle');
      return;
    }

    // Usaremos o endpoint 'book-class' para ambos, como no código de referência
    const backendUrl = 'https://apipet.com.br/payment/book-class';
    const data = {
      client_id: userId,
      trainer_id: trainer_id,
      total_price: parseFloat(serviceValue),
      address: address,
      hourClass: selectedTime,
      availableDate: selectedDate,
      // AQUI ESTÁ A MUDANÇA: Usamos a variável para definir o tipo
      type_payment: metodoPagamento.toUpperCase(), // 'PIX' ou 'CARD'
    };

    try {
      console.log("--- FRONTEND: Enviando para a API ---");
      console.log("URL:", backendUrl);
      console.log("Body:", JSON.stringify(data, null, 2));

      const response = await axios.post(backendUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = response.data; // Axios aninha a resposta em .data
      console.log("--- FRONTEND: Resposta completa da API ---", JSON.stringify(result, null, 2));

      const checkoutUrl = result.init_point;

      if (!checkoutUrl) {
        throw new Error('URL de checkout (init_point) não recebida do backend.');
      }
      
      setPaymentStatus('waiting');
      
      const redirectUrl = Linking.createURL(''); // URL de retorno para o app
      console.log(`Aguardando redirecionamento para: ${redirectUrl}`);

      // Abre o navegador web (seja para PIX ou Cartão)
      const authResult = await WebBrowser.openAuthSessionAsync(checkoutUrl, redirectUrl);
      
      console.log("--- RESULTADO DA SESSÃO DO NAVEGADOR ---", JSON.stringify(authResult, null, 2));

      if (authResult.type === 'success') {
        console.log("Sessão retornou com SUCESSO. URL:", authResult.url);
        const { queryParams } = Linking.parse(authResult.url);
        
        const paymentStatusQuery = queryParams?.status || queryParams?.collection_status || queryParams?.payment_status || 'failure';
        
        if (paymentStatusQuery === 'approved' || paymentStatusQuery === 'success') {
            console.log('✅ Pagamento APROVADO! Navegando...');
            Alert.alert(
              'Pagamento Confirmado!', 
              'Seu pagamento foi aprovado com sucesso. Vamos prosseguir com o agendamento.',
              [{ text: 'OK', onPress: () => router.push('/page/AgendamentoAula10') }]
            );
        } else {
            console.log(`Pagamento falhou ou foi pendente: ${paymentStatusQuery}`);
            Alert.alert(
              'Pagamento Falhou', 
              `O status do pagamento é: ${paymentStatusQuery}. Tente novamente.`,
              [{ text: 'OK', onPress: () => setPaymentStatus('idle') }]
            );
        }
      } else {
        console.log(`Sessão retornou com tipo: '${authResult.type}'.`);
        Alert.alert('Pagamento Cancelado', 'Você fechou a janela de pagamento.');
        setPaymentStatus('idle');
      }

    } catch (error) {
      const apiErrorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      console.error('--- FRONTEND: Erro na chamada ---', apiErrorMessage);
      setErrorMessage(apiErrorMessage);
      setPaymentStatus('error');
      Alert.alert('Erro ao Gerar Pagamento', apiErrorMessage);
    }
  };
  

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text variant="headlineMedium" style={styles.title}>
            {metodoPagamento === 'PIX' ? '💰 Pagamento PIX' : '💳 Pagamento com Cartão'}
          </Text>
          
          <Card style={styles.agendamentoCard}>
            <LinearGradient colors={['#F27B61', '#E83378']} style={styles.cardGradient}>
              <Text variant="titleMedium" style={styles.agendamentoTitle}>
                📋 Resumo do Agendamento
              </Text>
              <View style={styles.agendamentoInfo}>
                <Text style={styles.agendamentoText}><Text style={styles.label}>💰 Valor: </Text>R$ {serviceValue}</Text>
                <Text style={styles.agendamentoText}><Text style={styles.label}>📅 Data: </Text>{selectedDate}</Text>
                <Text style={styles.agendamentoText}><Text style={styles.label}>⏰ Horário: </Text>{selectedTime}</Text>
                <Text style={styles.agendamentoText}><Text style={styles.label}>📍 Local: </Text>{address}</Text>
                <Text style={styles.agendamentoText}><Text style={styles.label}>💳 Método: </Text>{metodoPagamento}</Text>
              </View>
            </LinearGradient>
          </Card>

          {/* Card UNIFICADO para o pagamento */}
          <Card style={styles.formCard}>
            <LinearGradient colors={['#F47920', '#E83378']} style={styles.cardGradient}>
              <Text style={styles.formSectionTitle}>
                🔒 Pagamento Seguro
              </Text>
              <Text style={[styles.agendamentoText, {textAlign: 'center', marginBottom: 20}]}>
                Você será redirecionado para um ambiente seguro para concluir seu pagamento.
              </Text>
              
              {paymentStatus === 'idle' && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleScheduleAndPay}
                >
                  <Text style={styles.actionButtonText}>
                    {metodoPagamento === 'PIX' ? 'Pagar com PIX' : 'Pagar com Cartão'}
                  </Text>
                </TouchableOpacity>
              )}

              {(paymentStatus === 'generating' || paymentStatus === 'waiting') && (
                <View style={{paddingVertical: 20, alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={styles.loadingText}>
                    {paymentStatus === 'generating' ? 'Gerando link de pagamento...' : 'Aguardando no navegador...'}
                  </Text>
                </View>
              )}

              {paymentStatus === 'error' && (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.errorText}>
                    Erro: {errorMessage}
                  </Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setPaymentStatus('idle')}
                  >
                    <Text style={styles.actionButtonText}>Tentar Novamente</Text>
                  </TouchableOpacity>
                </View>
            )}
            </LinearGradient>
          </Card>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 16, fontSize: 18, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
  scrollContent: { padding: 16, paddingBottom: 32 },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#FFFFFF', fontSize: 24 },
  agendamentoCard: { marginBottom: 20, elevation: 4, borderRadius: 12, backgroundColor: 'transparent' },
  formCard: { marginBottom: 20, elevation: 4, borderRadius: 12, backgroundColor: 'transparent' },
  cardGradient: { flex: 1, borderRadius: 12, padding: 16 },
  agendamentoTitle: { fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12, textAlign: 'center', fontSize: 18 },
  agendamentoInfo: { padding: 8, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 8 },
  agendamentoText: { color: '#FFFFFF', fontSize: 16, marginBottom: 4 },
  label: { fontWeight: 'bold', color: '#FFFFFF' }, 
 formSectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 20, textAlign: "center", color: "#FFFFFF" },
  actionButton: { backgroundColor: '#191970', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, marginTop: 20, borderWidth: 3, borderColor: '#faac0f', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: {
    color: '#FFFFFF', 
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 8,
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 20, 
    fontWeight: 'bold'
  }
});

export default AgendamentoAula9;