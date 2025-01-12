import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router'; 
import axios from 'axios';
import Constants from 'expo-constants';
import { useAgendamento } from '../context/AgendamentoContext'; // Importando o contexto de agendamento

const AgendamentoAula7 = () => {
  const router = useRouter();
  //const [ip, setIp] = useState(Constants.manifest2?.extra?.localhost || '192.168.0.6');
/*
  useEffect(() => {
   

  const handleConfirmar = async () => {
    try {
      if (!selectedDate || !selectedTime || selectedDate === '' || selectedTime === '') {
        Alert.alert('Erro', 'Data ou horário não selecionados');
        return;
      }

      const isoDateTime = convertDateTimeToISO(selectedDate, selectedTime);
      console.log('ISO DateTime gerado:', isoDateTime); // Log da data ISO gerada

      const trainingServiceData = {
        client_id: "7a762d38-07e1-4ac8-b717-16a41cd523ec",
        trainer_id: "6194a177-923d-4c03-8504-2ef51df5992e",
        type_payment: "CARD",
        address: "Av Jose Cunha , 382",
        hourClass: selectedTime,
        availableDate: isoDateTime,
      };

      const response = await axios.post(`http://${ip}:3000/trainingService`, trainingServiceData);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Agendamento confirmado!');
        router.push('/page/AgendamentoAula8');
      } else {
        throw new Error('Erro ao confirmar o agendamento');
      }
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error.message);
      Alert.alert('Erro', error.message || 'Não foi possível confirmar o agendamento.');
    }
  };

  */

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
          <Text style={styles.instructions}>Thiago Oliveira Freitas</Text>
        </View>
        <Image source={require('../../../assets/data.png')} />
        <View style={styles.line}>
          <Text style={styles.subtitle}>Data/Horário:</Text>
          <Text style={styles.instructions}>01/11/2024 às 10 horas</Text>
        </View>
        <Image source={require('../../../assets/local.png')} />
        <View style={styles.line}>
          <Text style={styles.subtitle}>Local do Encontro:</Text>
          <Text style={styles.instructions}>
            Av. Lorem Ipsum, 135{'\n'} Aclimação - São Paulo/SP
          </Text>
          <View style={styles.line}>
          <Image source={require('../../../assets/valorTrainner.png')} />
          <Text style={styles.subtitle}>Valor do serviço:</Text>
          <Text style={styles.instructions}>
            R$ 50,00
          </Text>
        </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.dadosButton}>
            <Text style={styles.buttonText}>Alterar Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmarButton}>
            <Link style={styles.buttonText} href={'/page/AgendamentoAula8'}>Confirmar</Link>
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
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
    textAlign: 'center',
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
    color: '#FFF',
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  confirmarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderStyle: 'solid',
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
});

export default AgendamentoAula7;
