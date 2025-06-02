import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, Platform } from 'react-native';
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

  const SAO_PAULO_OFFSET_HOURS = 3;

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    let initialLoadingDone = false;
    if (routeSelectedDate) {
      setLocalSelectedDate(routeSelectedDate);
      if (!trainer_id) {
        setLoading(false);
        initialLoadingDone = true;
      }
    } else {
       if (!trainer_id) {
        setLoading(false);
        initialLoadingDone = true;
       }
    }
    if (loading && !trainer_id && initialLoadingDone) {
        setLoading(false);
    }
  }, [routeSelectedDate, trainer_id]);

  useEffect(() => {
    let isActive = true;
    if (trainer_id) {
      if (isActive) setLoading(true);
      axios
        .get(`https://apipet.com.br/trainer/${trainer_id}`)
        .then((response) => {
          if (isActive) {
            setTrainer(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (isActive) {
            console.error('Erro ao buscar o treinador:', error);
            setLoading(false);
          }
        });
    } else {
      if(loading && !routeSelectedDate) setLoading(false);
    }
    return () => {
      isActive = false;
    };
  }, [trainer_id, routeSelectedDate]);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
  ];

  const isTimeSlotDisabled = (dateString, timeString) => {
    if (!dateString || !timeString) return true;
    const [year, month, day] = dateString.split('-').map(Number);
    const [hour, minute] = timeString.split(':').map(Number);
    const slotDateTimeUTC = new Date(Date.UTC(year, month - 1, day, hour + SAO_PAULO_OFFSET_HOURS, minute, 0, 0));
    const now = new Date();
    const nowMinutePrecisionUTC = new Date();
    nowMinutePrecisionUTC.setUTCHours(now.getUTCHours(), now.getUTCMinutes(), 0, 0);
    return slotDateTimeUTC.getTime() < nowMinutePrecisionUTC.getTime();
  };

  const handleContinue = () => {
    if (!selectedTime) {
      Alert.alert('Atenção', 'Por favor, selecione um horário antes de continuar.');
      return;
    }
    if (!trainer_id || !localSelectedDate) {
      Alert.alert('Erro', 'Informações faltando. Por favor, inicie o processo novamente.');
      return;
    }
    const [year, month, day] = localSelectedDate.split('-').map(Number);
    const [hour, minute] = selectedTime.split(':').map(Number);
    const selectedSlotUTC = new Date(Date.UTC(year, month - 1, day, hour + SAO_PAULO_OFFSET_HOURS, minute, 0, 0));
    const now = new Date();
    const nowMinutePrecisionUTC = new Date();
    nowMinutePrecisionUTC.setUTCHours(now.getUTCHours(), now.getUTCMinutes(), 0, 0);

    if (selectedSlotUTC.getTime() < nowMinutePrecisionUTC.getTime()) {
      Alert.alert('Horário Inválido', 'O horário selecionado já passou. Por favor, escolha outro horário.');
      setSelectedTime(null);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E83378" />
      </View>
    );
  }

  if (!localSelectedDate) {
    return (
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.errorText}>Nenhuma data foi selecionada.</Text>
          <Link href={trainer_id ? `/page/AgendamentoAula2?trainer_id=${trainer_id}` : "/page/AgendamentoAula1"} style={styles.backLink}>
            <Text style={styles.backLinkText}>Voltar para selecionar data</Text>
          </Link>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/page/Home')}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Data: <Text style={styles.subtitleHighlight}>{formatDate(localSelectedDate)}</Text>
      </Text>
      {selectedTime && (
         <Text style={styles.subtitle}>
            Horário selecionado: <Text style={styles.subtitleHighlight}>{selectedTime}</Text>
        </Text>
      )}

      <View style={styles.profileContainer}>
        <Image
          source={trainer && trainer.profileImageUrl ? { uri: trainer.profileImageUrl } : require('../../../assets/perfil.png')}
          style={styles.profileImage}
        />
        <Text style={styles.title}>{trainer ? trainer.username : (trainer_id ? 'Carregando...' : 'Treinador não especificado')}</Text>
      </View>
      
      <Text style={styles.instructionText}>Selecione um horário:</Text>

      <View style={styles.timeGrid}>
        {timeSlots.map((time) => {
          const isDisabled = isTimeSlotDisabled(localSelectedDate, time);
          return (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.timeButtonSelected,
                isDisabled && styles.timeButtonDisabled 
              ]}
              onPress={() => {
                if (!isDisabled) {
                  setSelectedTime(time);
                }
              }}
              disabled={isDisabled}
            >
              <Text style={[
                styles.timeButtonText, 
                selectedTime === time && styles.timeButtonTextSelected,
                isDisabled && styles.timeButtonTextDisabled
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity 
            style={styles.voltarButton}
            onPress={() => router.push({ pathname: `/page/AgendamentoAula1`, params: { trainer_id: trainer_id?.toString() }})}
        >
          <Text style={styles.buttonText}>Voltar</Text>
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
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 20,
    width: '100%',
  },
  loadingContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  centeredMessageContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1, 
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40, 
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: { 
    alignItems: 'center',
    marginBottom: 15, 
    marginTop: 50, 
  },
  profileImage: { 
     width: 80, 
     height: 80, 
     borderRadius: 40, 
     marginBottom: 10,
     borderWidth: 2,
     borderColor: '#fff',
     backgroundColor: '#ccc', 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: { 
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitleHighlight: { 
    fontWeight: 'bold',
    color: 'yellow', 
  },
  instructionText: { 
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // --- ALTERAÇÃO PARA AUMENTAR O ESPAÇAMENTO ---
    marginBottom: 80, // Aumentado de 20 para 80 (ou outro valor de sua preferência)
    // --- FIM DA ALTERAÇÃO ---
    maxWidth: 350, 
  },
  timeButton: {
    width: 75, 
    height: 40, 
    margin: 6, 
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#003399', 
    borderColor: '#003399',
  },
  timeButtonDisabled: { 
    backgroundColor: 'rgba(200, 200, 200, 0.3)', 
    borderColor: 'rgba(255, 255, 255, 0.4)',   
  },
  timeButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  timeButtonTextSelected: {
    color: '#FFF', 
  },
  timeButtonTextDisabled: { 
    color: 'rgba(255, 255, 255, 0.5)', 
  },
  navigationButtons: { 
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: '90%', 
    position: 'absolute', 
    bottom: 30,          
  },
  voltarButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  avancarButton: {
    backgroundColor: '#102E4A', 
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFD700', 
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red', 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, 
  },
  backLink: { 
    marginTop: 15,
    padding: 10,
  },
  backLinkText: { 
    fontSize: 16,
    color: 'blue', 
    textDecorationLine: 'underline',
  },
});

export default AgendamentoAula3;