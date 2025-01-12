import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import axios from 'axios';

const AgendamentoAula3 = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [trainer, setTrainer] = useState(null);
  const [trainingDate, setTrainingDate] = useState(null);
  const ip = Constants.manifest2?.extra?.localhost || '192.168.0.6';
  const router = useRouter();

  // Pega o agendamentoId e selectedDate dos parâmetros de navegação
  const { params } = router;
  const agendamentoId = params?.agendamentoId || "9e98e699-0fc3-4570-8a1a-027475d850b9"; // Exemplo de ID

  // Função para continuar e enviar o horário para o backend
  const handleContinue = () => {
    if (!selectedTime) {
      Alert.alert('Erro', 'Por favor, selecione um horário antes de continuar.');
      return;
    }

    const postData = {
      client_id: "0804fac1-880f-4394-b818-368580659f43", // Exemplo de ID do cliente
      trainer_id: "6194a177-923d-4c03-8504-2ef51df5992e", // ID do treinador
      total_price: 50,
      address: "Av Jose Cunha , 382",
      availableDate:"2024-10-01T22:15:31.199Z", // Usando a data selecionada no campo `availableDate`
      type_payment: "CARD",
      availableDate: "T15:30:00.000Z",
      hourClass: selectedTime,
    };
/*
    axios.post(`http://${ip}:3000/trainingService`, postData)
      .then(response => {
        console.log('Horário atualizado com sucesso:', response.data);
        Alert.alert('Sucesso', 'Horário atualizado com sucesso!');
        router.push('/page/AgendamentoAula7');
      })
      .catch(error => {
        console.error('Erro ao atualizar o horário:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar o horário.');
      });
      */
  };


  // Carrega os dados do treinador
  useEffect(() => {
    axios.get(`http://${ip}:3000/trainer/9e98e699-0fc3-4570-8a1a-027475d850b9`)
      .then(response => setTrainer(response.data))
      .catch(error => console.error('Erro ao buscar o treinador:', error));
  }, [ip]);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00'
  ];

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/PerfilAdestrador">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <Text style={styles.subtitle}>
        Você selecionou  às {selectedTime || '---'}
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
          <Link style={styles.buttonText} href="/page/AgendamentoAula1">Voltar</Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avancarButton}>
          <Link style={styles.buttonText} href=" /page/AgendamentoAula7">Avançar</Link>
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
    marginTop: 40,
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
    marginTop: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50,
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'yellow',
    textAlign: 'center',
    marginBottom: 20,
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
    color: '#FFF',
  },
  avancarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f',
  },
  buttonText: {
    color: '#FFF',
  },
});

export default AgendamentoAula3;
