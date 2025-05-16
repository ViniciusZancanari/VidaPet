import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const AgendamentoAula4 = () => {
  const [trainer, setTrainer] = useState(null);
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
      axios.get(`https://164.152.36.73:3000/trainer/${trainer_id}`)
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

        <Text style={styles.sectionTitle}>Local de encontro:</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Link 
              href={{
                pathname: '/page/Endereco1-1',
                params: { 
                  trainer_id: trainer_id.toString(),
                  selectedDate,
                  selectedTime 
                }
              }} 
              style={styles.optionButtonText}
            >
              Utilizar o endereço cadastrado
            </Link>
          </TouchableOpacity>
          
          <Text style={styles.orText}>ou</Text>

          <TouchableOpacity style={styles.optionButton}>
            <Link 
              href={{
                pathname: '/page/AgendamentoAula5',
                params: { 
                  trainer_id: trainer_id.toString(),
                  selectedDate,
                  selectedTime 
                }
              }} 
              style={styles.optionButtonText}
            >
              Marcar local de encontro
            </Link>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        <TouchableOpacity style={styles.backButton}>
          <Link 
            href={{
              pathname: '/page/AgendamentoAula3',
              params: { 
                trainer_id: trainer_id.toString(),
                selectedDate 
              }
            }} 
            style={styles.backButtonText}
          >
            Voltar
          </Link>
        </TouchableOpacity>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#191970',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4169E1',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#FFF',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFA07A',
    width: '100%',
    marginVertical: 25,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendamentoAula4;