import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext'; // ajuste o caminho se necessário

const Agenda = () => {
  const router = useRouter();
  const { token } = useAuth();

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});
  const [totalClasses, setTotalClasses] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchClasses = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const decoded = jwtDecode(token);
      const userId = decoded?.sub;

      if (!userId) throw new Error('ID do cliente não encontrado.');

      const response = await axios.get('https://apipet.com.br/trainingService/');
      const clientClasses = response.data.filter(
        item => item.client_id === userId && item.status !== 'CANCELLED'
      );

      setClasses(clientClasses);
      setTotalClasses(clientClasses.length);

      const dates = {};
      clientClasses.forEach((item) => {
        const date = item.availableDate.split('T')[0];
        dates[date] = { marked: true, dotColor: '#4A55B1' };
      });
      setMarkedDates(dates);

    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchClasses();
    }, [fetchClasses])
  );

  const handleDayPress = (day) => {
    const updatedMarkedDates = { ...markedDates };

    Object.keys(markedDates).forEach(date => {
      if (updatedMarkedDates[date]) {
        updatedMarkedDates[date].selected = false;
      }
    });

    updatedMarkedDates[day.dateString] = {
      ...(updatedMarkedDates[day.dateString] || {}),
      selected: true,
      selectedColor: '#4A55B1',
    };

    setMarkedDates(updatedMarkedDates);
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/page/Home')}>
          <Ionicons name="arrow-back" size={24} color="#EF5C43" />
        </TouchableOpacity>
        <Text style={styles.headerText}>AGENDA</Text>
      </View>

      <Text style={styles.subtitle}>
        <Text style={styles.subtitleText}>Você tem </Text>
        <Text style={styles.highlightedText}>{totalClasses} aulas agendadas</Text>
      </Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#4A55B1',
            todayTextColor: '#EF5C43',
            arrowColor: '#4A55B1',
            dotColor: '#4A55B1',
          }}
        />
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Carregando aulas...</Text>
      ) : classes.length > 0 ? (
        classes.map((classItem) => (
          <View key={classItem.id} style={styles.classesContainer}>
            <Text style={styles.dateText}>
              {new Date(classItem.availableDate).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={styles.classInfo}>Horário: {classItem.hourClass}</Text>
            <Text style={styles.classInfo}>Profissional: {classItem.trainer?.username || 'Não informado'}</Text>
            <Text style={styles.classInfo}>Serviço: Adestramento de cachorro</Text>
            <Text style={styles.classInfo}>Valor: R${classItem.total_price}</Text>
            <Text style={styles.classInfo}>Local: {classItem.address}</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Link
                  href={{
                    pathname: "/page/Reagendar",
                    params: {
                      trainer_id: classItem.trainer_id,
                      training_service_id: classItem.id
                    }
                  }}
                  style={styles.actionButtonText}
                >
                  Reagendar
                </Link>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Link
                  href={{
                    pathname: "/page/Termo_Cancelamento",
                    params: { training_service_id: classItem.id }
                  }}
                  style={styles.actionButtonText}
                >
                  Cancelar aula
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhuma aula encontrada.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#315381',
    textAlign: 'center',
    flex: 1,
    marginRight: 44,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitleText: {
    color: '#333',
  },
  highlightedText: {
    color: '#4A55B1',
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
    padding: 10,
    elevation: 2,
  },
  classesContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A55B1',
    marginBottom: 10,
  },
  classInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#191970',
    borderColor: '#FAA511',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
});

export default Agenda;
