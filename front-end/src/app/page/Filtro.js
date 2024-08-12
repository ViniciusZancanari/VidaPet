import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const Filtro = () => {
  const [price, setPrice] = useState(105);
  const [distance, setDistance] = useState(55);
  const [selectedRating, setSelectedRating] = useState(3);
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <ScrollView>
      <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
        <TouchableOpacity style={styles.closeButton}>
          <Link href="/page/Home">
            <Ionicons name="close" size={24} color="white" />
          </Link>
        </TouchableOpacity>

        <Text style={styles.title}>Qual é o seu <Text style={styles.highlight}>pet?</Text></Text>

        <View style={styles.petContainer}>
          <TouchableOpacity
            style={[styles.petOption, selectedPet === 'cat' && styles.selectedPet]}
            onPress={() => handlePetSelection('cat')}
          >
            <Image source={require('../../../assets/gato.png')} style={styles.petImage} />
            <Text style={styles.petText}>Gato</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.petOption, selectedPet === 'dog' && styles.selectedPet]}
            onPress={() => handlePetSelection('dog')}
          >
            <Image source={require('../../../assets/cachorro.png')} style={styles.petImage} />
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

        <View style={styles.card}>
          <Text style={styles.label}>Verificar disponibilidade</Text>
          <View style={styles.dateContainer}>
            <TextInput style={styles.input} placeholder="mm/dd/yyyy" placeholderTextColor="gray" />
            <TextInput style={styles.input} placeholder="Data final" placeholderTextColor="gray" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.limparButton}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aplicarButton}>
            <Link href="/page/Home"
              style={styles.buttonText}
            >Aplicar
            </Link>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  petContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  petOption: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
  },
  selectedPet: {
    borderWidth: 2,
    borderColor: '#FFD700',
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
  card: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 18,
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
    marginTop: 10,
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
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '48%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E83378',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limparButton: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 50,
    alignItems: 'center',
  },
  aplicarButton: {
    backgroundColor: '#191970',
    width: 200,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: '#faac0f',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Filtro;
