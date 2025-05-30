import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const AgendamentoAula7 = () => {
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime, meetingAddress } = useLocalSearchParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchTrainerData = async () => {
      try {
        const response = await axios.get(`https://apipet.com.br/trainer/${trainer_id}`);
        setTrainer(response.data);
      } catch (error) {
        console.error('Erro ao buscar o treinador:', error);
      } finally {
        setLoading(false);
      }
    };

    if (trainer_id) {
      fetchTrainerData();
    }
  }, [trainer_id]);

  if (loading) {
    return (
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </LinearGradient>
    );
  }

  return (
    <ScrollView>
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <View style={styles.header}>
          <Link href="/page/PerfilAdestrador">
            <Text style={styles.closeButtonText}>X</Text>
          </Link>
        </View>

        <View style={styles.grafismo}>
          <Image source={require('../../../assets/grafismo.png')} />
        </View>
        
        <View style={styles.pixIconContainer}>
          <Text style={styles.title}>Confirme o Pedido:</Text>
          <Image source={require('../../../assets/profissional.png')} />
        </View>
        
        <View style={styles.line}>
          <Text style={styles.subtitle}>Profissional:</Text>
          <Text style={styles.instructions}>{trainer?.username || 'Nome não disponível'}</Text>
        </View>
        
        <Image source={require('../../../assets/data.png')} />
        <View style={styles.line}>
          <Text style={styles.subtitle}>Data/Horário:</Text>
          <Text style={styles.instructions}>
            {formatDate(selectedDate)} às {formatTime(selectedTime)}
          </Text>
        </View>
        
        <Image source={require('../../../assets/local.png')} />
        <View style={styles.line}>
          <Text style={styles.subtitle}>Local do Encontro:</Text>
          <Text style={styles.instructions}>
            {meetingAddress || 'Endereço não especificado'}
          </Text>
        </View>
        
        <View style={styles.line}>
          <Image source={require('../../../assets/valorTrainner.png')} />
          <Text style={styles.subtitle}>Valor do serviço:</Text>
          <Text style={styles.instructions}>
            R$ {trainer?.hourly_rate ? trainer.hourly_rate.toFixed(2) : '00,00'}
          </Text>
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.dadosButton}>
            <Text style={styles.buttonText}>Alterar Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmarButton}>
            <Link 
              href={{
                pathname: '/page/AgendamentoAula8',
                params: { 
                  trainer_id: trainer_id.toString(),
                  selectedDate,
                  selectedTime,
                  meetingAddress,
                  serviceValue: trainer?.hourly_rate 
                }
              }} 
              style={styles.buttonText}
            >
              Confirmar
            </Link>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
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
    minHeight: '100%',
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
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50,
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
    marginBottom: 30,
    color: '#FFF',
  },
  dadosButton: {
    marginRight: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    width: '100%',
  },
  confirmarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: '#faac0f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  grafismo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 70,
    left: 0,
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AgendamentoAula7;