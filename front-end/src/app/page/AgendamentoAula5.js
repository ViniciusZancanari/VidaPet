import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const AgendamentoAula5 = () => {
  const [trainer, setTrainer] = useState(null);
  const [address, setAddress] = useState('');
  const { trainer_id, selectedDate, selectedTime } = useLocalSearchParams();

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '---';
    return `${timeString.split(':')[0]}h`;
  };

  useEffect(() => {
    if (trainer_id) {
      axios.get(`https://apipet.com.br/trainer/${trainer_id}`)
        .then(response => {
          setTrainer(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar o treinador:', error);
        });
    }
  }, [trainer_id]);

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/page/PerfilAdestrador">
          <Text style={styles.closeButtonText}>X</Text>
        </Link>
      </View>

      <View style={styles.centeredContent}>
        <Text style={styles.dateText}>
          Você selecionou o dia <Text style={styles.highlightText}>
            {formatDate(selectedDate)} às {formatTime(selectedTime)}
          </Text>
        </Text>

        <View style={styles.trainerContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/perfil.png')} style={styles.profileImage} />
            <Image source={require('../../../assets/grafismo.png')} style={styles.decorImage} />
          </View>
          <Text style={styles.trainerName}>{trainer ? trainer.username : 'Carregando...'}</Text>
        </View>

        <View style={styles.meetingSection}>
          <Text style={styles.sectionTitle}>Local de encontro:</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.addressInput}
              placeholder="Digite um endereço:"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />
            <View style={styles.inputUnderline} />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton}>
            <Link
              href={{
                pathname: '/page/AgendamentoAula4',
                params: { 
                  trainer_id: trainer_id.toString(),
                  selectedDate,
                  selectedTime 
                }
              }}
              style={styles.buttonText}
            >
              Voltar
            </Link>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, !address && styles.nextButtonDisabled]}
            disabled={!address}
          >
            <Link
              href={{
                pathname: '/page/AgendamentoAula7',
                params: {
                  trainer_id: trainer_id.toString(),
                  selectedDate,
                  selectedTime,
                  meetingAddress: address
                }
              }}
              style={styles.buttonText}
            >
              Avançar
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
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
  centeredContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  trainerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  decorImage: {
    width: 30,
    height: 80,
    marginLeft: -10,
  },
  trainerName: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  meetingSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  addressInput: {
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
  },
  inputUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: '#F27B61',
    width: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#191970',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#faac0f',
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendamentoAula5;