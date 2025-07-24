import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import Constants from 'expo-constants';

const AgendamentoAula1 = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [trainer, setTrainer] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const { trainer_id } = useLocalSearchParams();

  useEffect(() => {
    axios
      .get('https://apipet.com.br/trainingService/')
      .then((response) => {
        const data = response.data;
        const dates = {};
        data.forEach((item) => {
          const date = item.availableDate.split('T')[0];
          dates[date] = { marked: true, selectedColor: '#FF5733' };
        });
        setMarkedDates(dates);
      })
      .catch((error) => {
        console.error('Erro ao buscar as aulas agendadas:', error);
      });
  }, []);

  const handleDayPress = (day) => {
    const selected = day.dateString;
    const today = new Date().toISOString().split('T')[0];

    if (selected < today) {
      Alert.alert('Aviso', 'Não é possível agendar em uma data anterior à data de hoje.');
      return;
    }

    setSelectedDate(selected);
    setCalendarVisible(false);

    router.push({
      pathname: '/page/AgendamentoAula3',
      params: { 
        trainer_id: trainer_id.toString(),
        selectedDate: selected 
      },
    });
  };

  useEffect(() => {
    if (trainer_id) {
      axios
        .get(`https://apipet.com.br/trainer/${trainer_id}`)
        .then((response) => setTrainer(response.data))
        .catch((error) => console.error('Erro ao buscar o treinador:', error));
    }
  }, [trainer_id]);

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/Home">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <Text style={styles.subtitle}>
        Agende suas <Text style={styles.subtitle2}>aulas</Text>
      </Text>

      <View style={styles.image}>
        <Image source={require('../../../assets/perfil.png')} />
        <Image source={require('../../../assets/grafismo.png')} />
      </View>

      <Text style={styles.title}>{trainer ? trainer.username : 'Carregando nome...'}</Text>

      <Text style={styles.subtitle}>
        Você escolheu o plano <Text style={styles.subtitle2}>avulso</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setCalendarVisible(true)}>
        <Image source={require('../../../assets/data.png')} />
        <Text style={styles.buttonText}>Escolha uma data</Text>
      </TouchableOpacity>

      <Modal visible={calendarVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              theme={{
                selectedDayBackgroundColor: 'blue',
                todayTextColor: '#EF5C43',
                arrowColor: 'blue',
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#191970',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'yellow',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    marginTop: 40,
  },
});

export default AgendamentoAula1;