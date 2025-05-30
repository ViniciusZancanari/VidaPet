import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const AgendamentoAula3 = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { trainer_id, selectedDate: routeSelectedDate } = useLocalSearchParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [localSelectedDate, setLocalSelectedDate] = useState(routeSelectedDate);

  // Função para formatar a data no padrão dd/mm/aaaa
  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (routeSelectedDate) {
      setLocalSelectedDate(routeSelectedDate);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [routeSelectedDate]);

  useEffect(() => {
    if (trainer_id) {
      axios
        .get(`https://apipet.com.br/trainer/${trainer_id}`)
        .then((response) => setTrainer(response.data))
        .catch((error) => console.error('Erro ao buscar o treinador:', error));
    }
  }, [trainer_id]);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
  ];

  const handleContinue = () => {
    if (!selectedTime) {
      Alert.alert('Erro', 'Por favor, selecione um horário antes de continuar.');
      return;
    }

    if (!trainer_id || !localSelectedDate) {
      Alert.alert('Erro', 'Informações faltando. Por favor, inicie o processo novamente.');
      return;
    }

    router.push({
      pathname: '/page/AgendamentoAula4',
      params: {
        trainer_id: trainer_id.toString(),
        selectedDate: localSelectedDate,
        selectedTime: selectedTime,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!localSelectedDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhuma data foi selecionada.</Text>
        <Link href="/page/AgendamentoAula1" style={styles.backLink}>
          <Text style={styles.backLinkText}>Voltar para selecionar data</Text>
        </Link>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/PerfilAdestrador">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <Text style={styles.subtitle}>
        Você selecionou a data <Text style={styles.subtitle2}>{formatDate(localSelectedDate) || '---'}</Text>{' '}
        e o horário <Text style={styles.subtitle2}>{selectedTime || '---'}</Text>.
      </Text>

      <View style={styles.image}>
        <Image source={require('../../../assets/perfil.png')} />
        <Image source={require('../../../assets/grafismo.png')} />
      </View>

      <Text style={styles.title}>{trainer ? trainer.username : 'Carregando nome...'}</Text>

      <View style={styles.timeGrid}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeButton, selectedTime === time && styles.timeButtonSelected]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[styles.timeButtonText, selectedTime === time && styles.timeButtonTextSelected]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.voltarButton}>
          <Link style={styles.buttonText} href={{
            pathname: '/page/AgendamentoAula1',
            params: { trainer_id: trainer_id.toString() }
          }}>
            Voltar
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avancarButton} onPress={handleContinue}>
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
  image: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    },
  title: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 100,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50,
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'yellow',
    textAlign: 'center',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeButton: {
    width: 70,
    height: 32,
    margin: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#0000FF',
    borderColor: '#0000FF',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  timeButtonTextSelected: {
    color: '#FFF',
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
    marginBottom: 50,
  },
  voltarButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  avancarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#faac0f',
  },
  buttonText: {
    color: '#FFF',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AgendamentoAula3;