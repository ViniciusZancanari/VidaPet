import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Filtro = () => {
  const [price, setPrice] = useState(105);
  const [distance, setDistance] = useState(55);
  const [selectedRating, setSelectedRating] = useState(3);

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Qual é o seu <Text style={styles.highlight}>pet?</Text></Text>

      <View style={styles.petContainer}>
        <TouchableOpacity style={styles.petOption}>
          <Image source={require('../../assets/gato.png')} style={styles.petImage} />
          <Text style={styles.petText}>Gato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.petOption}>
          <Image source={require('../../assets/cachorro.png')} style={styles.petImage} />
          <Text style={styles.petText}>Cachorro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Selecione a faixa de preço:</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={200}
          step={1}
          value={price}
          onValueChange={setPrice}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#FF69B4"
          thumbTintColor="#7B68EE"
        />
        <Text style={styles.value}>{`R$${price}`}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Qual a distância?</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={distance}
          onValueChange={setDistance}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#FF69B4"
          thumbTintColor="#7B68EE"
        />
        <Text style={styles.value}>{`${distance}km`}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Buscar por avaliação</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedRating(index + 1)}>
              <Ionicons
                name={index < selectedRating ? "heart" : "heart-outline"}
                size={30}
                color={index < selectedRating ? "#7B68EE" : "gray"}
              />
            </TouchableOpacity>

          ))}
        </View>
      </View>

      <Text style={styles.label}>Verificar disponibilidade</Text>
      <View style={styles.dateContainer}>
        <TextInput style={styles.input} placeholder="mm/dd/yyyy" placeholderTextColor="gray" />
        <TextInput style={styles.input} placeholder="Data final" placeholderTextColor="gray" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.limparButton}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aplicarButton}>
          <Text style={styles.buttonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4f84',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlight: {
    color: '#FFD700',
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderRadius: 20
  },
  petContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  petOption: {
    alignItems: 'center',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  petText: {
    color: 'white',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  value: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '48%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limparButton: {
      marginRight: 40,
      width:150,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 30,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#fff',
      marginBottom: 50,
      color: '#FFF',
  },
  aplicarButton: {
    backgroundColor: '#191970',
    width:200,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 50,
    marginRight:10,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Filtro;
