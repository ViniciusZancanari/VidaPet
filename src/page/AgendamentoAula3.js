import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AgendamentoAula3 = () => {
  const [selectedDate, setSelectedDate] = useState('17/08/2023');
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    // Handle navigation or other actions
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
  };

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <Text style={styles.subtitle}>Você selecionnou o dia<Text style={styles.subtitle2}>17/08/23 às 15h</Text></Text>
      <View style={styles.image}>
        <Image
          source={require('../../assets/perfil.png')}
        />
        <Image
          source={require('../../assets/grafismo.png')}
        />
      </View>

      <Text style={styles.title}>Thiago Oliveira Freitas</Text>
      <Text style={styles.subtitle}>Você escolheu o plano <Text style={styles.subtitle2}>avulso</Text></Text>


      <TouchableOpacity style={styles.button} onPress={() => handleDateChange('17/08/2023')}>
        <Text style={styles.buttonText}>{selectedDate}</Text>
      </TouchableOpacity>

      <View style={styles.timeGrid}>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('08:00')}>
          <Text style={styles.timeButtonText}>08:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('09:00')}>
          <Text style={styles.timeButtonText}>09:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('10:00')}>
          <Text style={styles.timeButtonText}>10:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('11:00')}>
          <Text style={styles.timeButtonText}>11:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('12:00')}>
          <Text style={styles.timeButtonText}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('13:00')}>
          <Text style={styles.timeButtonText}>13:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('14:00')}>
          <Text style={styles.timeButtonText}>14:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('15:00')}>
          <Text style={styles.timeButtonText}>15:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('16:00')}>
          <Text style={styles.timeButtonText}>16:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('17:00')}>
          <Text style={styles.timeButtonText}>17:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('18:00')}>
          <Text style={styles.timeButtonText}>18:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleTimeChange('19:00')}>
          <Text style={styles.timeButtonText}>19:00</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.voltarButton}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avancarButton}>
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

  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    flex: 1,
    flexDirection: 'row',
    top: 40,
    left: 0,
    marginBottom:150
  },

  title: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom:20
    
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom:50
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'yellow',
    textAlign: 'center',
    marginBottom: 20
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateButtonText: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
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
  timeButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },
  continueButton: {
    backgroundColor: '#FFC107', // Gold color
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },
  button: {
    width:300,
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems:'center',
    marginBottom:20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },

  voltarButton: {
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    color: '#FFF'
  },

  avancarButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f'

  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default AgendamentoAula3;