import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../components/ProgressBar';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendamentoAula9 = () => {
  const [countdown, setCountdown] = useState(480);
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const PIX_CODE = "00020126360014BR.GOV.BCB.PIX0114+5561987654321520400005303986540410.005802BR5913Fulano de Tal6008BRASILIA62070503***6304A3A2";

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { id } = JSON.parse(userData);
          setClientId(id);
        }
      } catch (error) {
        console.error('Error fetching client ID:', error);
      }
    };

    fetchClientId();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCopyPixCode = async () => {
    await Clipboard.setStringAsync(PIX_CODE);
    Alert.alert('Sucesso', 'Código PIX copiado!');
  };

  const handleCreateTrainingService = async () => {
    try {
      setIsLoading(true);
      
      if (!clientId || !params.trainer_id || !params.selectedDate || !params.selectedTime || !params.meetingAddress) {
        throw new Error('Missing required fields');
      }

      const formattedTime = params.selectedTime.includes(':') ? params.selectedTime : `${params.selectedTime}:00`;
      const isoDate = `${params.selectedDate}T${formattedTime}:00Z`;

      const payload = {
        client_id: clientId,
        trainer_id: params.trainer_id,
        type_payment: "CARD",
        address: params.meetingAddress,
        hourClass: formattedTime,
        availableDate: isoDate,
        total_price: params.serviceValue ? Number(params.serviceValue) : 50,
        status: "PENDING"
      };

      const response = await axios.post(
        'https://164.152.36.73:3000/trainingService', 
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        router.push({
          pathname: '/page/AgendamentoAula10',
          params: { 
            trainingServiceId: response.data.id,
            ...response.data
          }
        });
      }
    } catch (error) {
      console.error('Error:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
      
      Alert.alert(
        'Erro', 
        error.response?.data?.message || error.message || 'Erro ao criar agendamento'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const progress = ((480 - countdown) / 480) * 100;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <View style={styles.header}>
          <Link href="/page/PerfilAdestrador">
            <Text style={styles.closeButtonText}>X</Text>
          </Link>
        </View>

        <View style={styles.grafismo}>
          <Image source={require('../../../assets/grafismo.png')} />
        </View>

        <View style={styles.content}>
          <View style={styles.pixIconContainer}>
            <Text style={styles.title}>Confirme Seu Pedido:</Text>
            <Image 
              source={require('../../../assets/segurando o celular com pix.png')} 
              style={styles.pixImage}
            />
          </View>

          <Text style={styles.subtitle}>Pedido aguardando pagamento</Text>
          
          <Text style={styles.instructions}>
            Copie o código abaixo e use a opção "Pix Copia e Cola" no aplicativo do seu banco para realizar o pagamento:
          </Text>

          <View style={styles.pixCodeWrapper}>
            <View style={styles.pixCodeContainer}>
              <Text style={styles.pixCodeText}>{PIX_CODE}</Text>
            </View>
            <TouchableOpacity onPress={handleCopyPixCode} style={styles.copyIcon}>
              <Image 
                source={require('../../../assets/copy-icon.png')} 
                style={styles.copyIconImage}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.timerText}>
            Tempo restante para pagar: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </Text>

          <ProgressBar progress={progress} style={styles.progressBar} />

          <TouchableOpacity 
            style={[styles.button, (isLoading || !clientId) && styles.buttonDisabled]}
            onPress={handleCreateTrainingService}
            disabled={isLoading || !clientId}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Processando...' : 'Continuar'}
            </Text>
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
    minHeight: '100%',
    width: '100%',
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  grafismo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 70,
    left: 0,
  },
  pixIconContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  pixImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  pixCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  pixCodeContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  pixCodeText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  copyIcon: {
    marginLeft: 10,
    padding: 10,
  },
  copyIconImage: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  timerText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  progressBar: {
    width: '80%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#faac0f',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendamentoAula9;