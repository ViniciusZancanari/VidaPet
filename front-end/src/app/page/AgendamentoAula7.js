import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const AgendamentoAula7 = () => {
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime, address, metodoPagamento } = useLocalSearchParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const fixedServiceValue = 50;

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

  const handleClose = () => {
    router.push('/page/Home');
  };

  const handleAlterarDados = () => {
    router.push({
      pathname: '/page/AgendamentoAula4',
      params: {
        trainer_id: trainer_id?.toString() ?? '',
        selectedDate,
        selectedTime,
      }
    });
  };

  const handleConfirmar = () => {
    const paramsToForward = {
      trainer_id: trainer_id?.toString() ?? '',
      selectedDate,
      selectedTime,
      address,
      serviceValue: fixedServiceValue,
      metodoPagamento,
    };

    if (metodoPagamento === 'cartao') {
      router.push({
        pathname: '/page/AgendamentoAula12',
        params: paramsToForward,
      });
    } else {
      router.push({
        pathname: '/page/AgendamentoAula8',
        params: paramsToForward,
      });
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grafismo}>
          <Image source={require('../../../assets/grafismo.png')} />
        </View>

        <Text style={styles.title}>Confirme o Pedido:</Text>

        {/* --- Bloco Profissional --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/profissional.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Profissional:</Text>
          <Text style={styles.instructions}>{trainer?.username || 'Nome não disponível'}</Text>
        </View>

        {/* --- Bloco Data/Horário --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/data.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Data/Horário:</Text>
          <Text style={styles.instructions}>
            {formatDate(selectedDate)} às {formatTime(selectedTime)}
          </Text>
        </View>

        {/* --- Bloco Local --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/local.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Local do Encontro:</Text>
          <Text style={styles.instructions}>{address || 'Endereço não especificado'}</Text>
        </View>

        {/* --- Bloco Valor --- */}
        <View style={styles.line}>
          <Image source={require('../../../assets/valorTrainner.png')} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Valor do serviço:</Text>
          <Text style={styles.instructions}>R$ {fixedServiceValue.toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.dadosButton} onPress={handleAlterarDados}>
            <Text style={styles.buttonText}>Alterar Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmarButton} onPress={handleConfirmar}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120, // Adicionado para dar espaço ao conteúdo
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
  iconStyle: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20, // Reduzido o espaçamento
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
    marginTop: 20, // Adicionado para dar espaço
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  confirmarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
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
    resizeMode: 'contain',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AgendamentoAula7;