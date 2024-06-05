import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PerfilAdestrador = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.address}>R. Lorem Ipsum, 100</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="ios-search" size={24} color="black" style={styles.icon} />
          <Ionicons name="ios-notifications" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      
      <TouchableOpacity style={styles.hireButton}>
        <Text style={styles.hireButtonText}>Quero contratar</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://example.com/trainer.jpg' }} // Coloque a URL da imagem do adestrador aqui
          style={styles.profileImage}
        />
        <Text style={styles.name}>Thiago Oliveira Freitas</Text>
        <Text style={styles.reviews}>2 avaliações</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="ios-location" size={16} color="gray" />
          <Text style={styles.location}>São Paulo, SP • 10km</Text>
        </View>
        <Text style={styles.price}>R$50/hora</Text>
      </View>

      <Text style={styles.sectionTitle}>Sobre o <Text style={styles.highlight}>profissional:</Text></Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet. Et magnam voluptatem et autem internos quo ipsum consequuntur vel corrupti excepturi.
      </Text>

      <Text style={styles.sectionTitle}>Confira algumas <Text style={styles.highlight}>fotos:</Text></Text>
      <Image
        source={{ uri: 'https://example.com/photo.jpg' }} // Coloque a URL da imagem aqui
        style={styles.photo}
      />

      <Text style={styles.sectionTitle}>Assista ao <Text style={styles.highlight}>vídeo:</Text></Text>
      <Image
        source={{ uri: 'https://example.com/video.jpg' }} // Coloque a URL da imagem do vídeo aqui
        style={styles.video}
      />

      <Text style={styles.sectionTitle}>Avaliações de <Text style={styles.highlight}>usuários:</Text></Text>
      <View style={styles.review}>
        <Image
          source={{ uri: 'https://example.com/user1.jpg' }} // Coloque a URL da imagem do usuário aqui
          style={styles.reviewImage}
        />
        <View style={styles.reviewContent}>
          <Text style={styles.reviewName}>Fernanda Lopes</Text>
          <Text style={styles.reviewDate}>02/04/2024</Text>
          <Text style={styles.reviewText}>Cum earum modi ea autem aliquam ut dolor voluptates.</Text>
        </View>
      </View>
      <View style={styles.review}>
        <Image
          source={{ uri: 'https://example.com/user2.jpg' }} // Coloque a URL da imagem do usuário aqui
          style={styles.reviewImage}
        />
        <View style={styles.reviewContent}>
          <Text style={styles.reviewName}>Tiago Santiago</Text>
          <Text style={styles.reviewDate}>02/04/2024</Text>
          <Text style={styles.reviewText}>Cum earum modi ea autem aliquam ut dolor voluptates.</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quero <Text style={styles.highlight}>contratar!</Text></Text>
      <Text style={styles.sectionSubtitle}>Selecione a opção desejada:</Text>
      <View style={styles.optionContainer}>
        <LinearGradient colors={['#00BFFF', '#1E90FF']} style={styles.option}>
          <Text style={styles.optionText}>Avulso • R$50,00/aula</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF69B4', '#FF1493']} style={styles.option}>
          <Text style={styles.optionText}>Mensal • 1x por semana - R$48,00/aula</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF69B4', '#FF1493']} style={styles.option}>
          <Text style={styles.optionText}>Mensal • 2x por semana - R$46,00/aula</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF69B4', '#FF1493']} style={styles.option}>
          <Text style={styles.optionText}>Semestral • 1x por semana - R$46,00/aula</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF69B4', '#FF1493']} style={styles.option}>
          <Text style={styles.optionText}>Semestral • 2x por semana - R$44,00/aula</Text>
        </LinearGradient>
      </View>

      <TouchableOpacity style={styles.hireButton}>
        <Text style={styles.hireButtonText}>Quero contratar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  hireButton: {
    backgroundColor: '#0d47a1',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  hireButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviews: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: '#0d47a1',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  highlight: {
    color: '#00BFFF',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  reviewImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: 'gray',
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
});

export default PerfilAdestrador;
