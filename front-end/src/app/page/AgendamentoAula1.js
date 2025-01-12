import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { NetworkInfo } from 'react-native-network-info'; // Para pegar o IP da máquina

const AgendamentoAula1 = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [trainer, setTrainer] = useState(null); // Estado para armazenar os dados do treinador
  const [ip, setIp] = useState('172.29.0.1'); // Estado para armazenar o IP da máquina
  const [selectedDate, setSelectedDate] = useState(''); // Estado local para a data selecionada
  const [markedDates, setMarkedDates] = useState({}); // Datas marcadas no calendário
  const router = useRouter();

  // Função para obter o IP da máquina
  useEffect(() => {
    NetworkInfo.getIPV4Address().then(ipAddress => {
      setIp(ipAddress); // Armazena o IP no estado
      console.log('IP da máquina:', ipAddress);
    });
  }, []);

  // Função chamada ao buscar aulas agendadas
  useEffect(() => {
    if (ip) {
      axios.get(`http://${ip}:3000/trainingService/`)
        .then(response => {
          const data = response.data;
          const dates = {};

          data.forEach(item => {
            const date = item.availableDate.split('T')[0];
            dates[date] = { marked: true, selectedColor: '#FF5733' };
          });

          setMarkedDates(dates);
        })
        .catch(error => {
          console.error('Erro ao buscar as aulas agendadas:', error);
        });
    }
  }, [ip]);

  // Função chamada quando o usuário seleciona uma data no calendário
  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);

    if (markedDates[selectedDate]) {
      Alert.alert('Aviso', 'Já existe um evento agendado para essa data.');
      return;
    }

    console.log('Data selecionada:', selectedDate);

    // Preparar os dados para o POST, incluindo a data selecionada
    const postData = {
      client_id: "0804fac1-880f-4394-b818-368580659f43", // Exemplo de ID do cliente
      trainer_id: "6194a177-923d-4c03-8504-2ef51df5992e", // ID do treinador
      total_price: 50,
      address: "Av Jose Cunha , 382",
      hourClass: "14:30", // Horário de exemplo
      availableDate: selectedDate + "T15:30:00.000Z", // Usando a data selecionada no campo `availableDate`
      type_payment: "CARD",
    };

    // Fazer o POST para o backend
    axios.post(`http://${ip}:3000/trainingService`, postData)
      .then(response => {
        console.log('Dados enviados com sucesso:', response.data);
        Alert.alert('Sucesso', 'A data foi enviada com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
      });

    // Fechar o calendário
    setCalendarVisible(false);

    // Navega para a próxima página
    router.push('/page/AgendamentoAula3');
  };

  // Faz a requisição para buscar os dados do treinador usando o IP dinâmico
  useEffect(() => {
    if (ip) { // Faz a requisição somente se o IP já foi obtido
      axios.get(`http://${ip}:3000/trainer/6194a177-923d-4c03-8504-2ef51df5992e`) // URL da API com IP dinâmico
        .then(response => {
          setTrainer(response.data); // Armazena os dados retornados no estado
        })
        .catch(error => {
          console.error('Erro ao buscar o treinador:', error);
        });
    }
  }, [ip]);

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      {/* X no canto superior para voltar à página inicial */}
      <View style={styles.header}>
        <Link href="/page/PerfilAdestrador">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      {/* Exibe o nome do treinador dinamicamente */}
      <Text style={styles.subtitle}>Agende suas <Text style={styles.subtitle2}>aulas</Text></Text>
      <View style={styles.image}>
        <Image source={require('../../../assets/perfil.png')} />
        <Image source={require('../../../assets/grafismo.png')} />
      </View>

      {/* Exibe o nome do treinador se disponível */}
      <Text style={styles.title}>{trainer ? trainer.username : 'Carregando nome...'}</Text>

      {/* Exibe o plano selecionado */}
      <Text style={styles.subtitle}>Você escolheu o plano <Text style={styles.subtitle2}>avulso</Text></Text>

      {/* Botão para escolher uma data */}
      <TouchableOpacity style={styles.button} onPress={() => setCalendarVisible(true)}>
        <Image source={require('../../../assets/data.png')} />
        <Text style={styles.buttonText}>Escolha uma data</Text>
      </TouchableOpacity>

      {/* Modal do calendário */}
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
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
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
