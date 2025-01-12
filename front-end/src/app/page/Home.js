import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants'; // Para capturar as informações do dispositivo

const Home = () => {
  const [trainer, setTrainer] = useState(null);
  const [ip, setIp] = useState('192.168.0.6'); // Defina seu IP fixo manualmente ou como variável de ambiente

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/trainer/9e98e699-0fc3-4570-8a1a-027475d850b9`);
        setTrainer(response.data);
      } catch (error) {
        console.error("Erro ao buscar o treinador:", error);
      }
    };

    fetchTrainer();
  }, [ip]); // O efeito depende do IP

  const renderHearts = (rating) => {
    const maxRating = 5; // Número máximo de corações
    let hearts = [];

    for (let i = 1; i <= maxRating; i++) {
      hearts.push(
        <Ionicons
          key={i}
          name="heart"
          size={16}
          color={i <= rating ? '#00BFFF' : '#ccc'} // Cor azul se for preenchido, cinza se não
        />
      );
    }
    return hearts;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.address}>{trainer ? trainer.address : 'R. Lorem Ipsum, 100'}</Text>
          <View style={styles.icons}>
            <Ionicons name="filter" size={24} color="black" style={styles.icon} />
            <Link href="/page/Notificacao2" style={styles.navItem}>
              <Ionicons name="notifications" size={24} color="black" style={styles.icon} />
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promoções incríveis!</Text>
          <Image source={require('../../../assets/BannersPromocoes.png')} style={styles.promotionImage} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alguns <Text style={styles.highlightText}>profissionais</Text> perto de você:</Text>

          {trainer ? (
            <TouchableOpacity style={styles.card} onPress={() => { }}>
              <Image source={require('../../../assets/perfil.png')} style={styles.cardImage} />
              <Link href="/page/PerfilAdestrador" style={styles.cardLink}>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardName}>{trainer.username || 'Nome não disponível'}</Text>
                    <View style={styles.premiumTag}>
                      <Text style={styles.premiumText}>Premium</Text>
                    </View>
                  </View>
                  <View style={styles.ratingRow}>
                    {/* Renderizando os corações com base no rating do backend */}
                    {renderHearts(trainer.rating)}
                  </View>
                  <Text style={styles.cardDetails}>
                    <Ionicons name="location" size={14} color="gray" /> {`${trainer.city}, SP • 10km`}
                  </Text>
                  <Text style={styles.cardPrice}>
                    <Ionicons name="cash-outline" size={14} color="green" /> R${trainer.hourly_rate}/hora
                  </Text>
                  <Text style={styles.cardMember}>Membro do app desde Fev/23</Text>
                </View>
              </Link>
            </TouchableOpacity>
          ) : (
            <Text>Carregando profissionais...</Text>
          )}
        </View>
      </ScrollView >

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navItem}>
          <Link href="/page/Home" style={styles.navLink}>
            <View style={styles.navContent}>
              <Ionicons name="home" size={24} color="black" />
              <Text style={styles.navText}>Home</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Link href="/page/Filtro" style={styles.navLink}>
            <View style={styles.navContent}>
              <Ionicons name="search" size={24} color="black" />
              <Text style={styles.navText}>Busca</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Link href="/page/Agenda" style={styles.navLink}>
            <View style={styles.navContent}>
              <Ionicons name="calendar" size={24} color="black" />
              <Text style={styles.navText}>Agenda</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Link href="/page/Perfil" style={styles.navLink}>
            <View style={styles.navContent}>
              <Ionicons name="person" size={24} color="black" />
              <Text style={styles.navText}>Perfil</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#6459D0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highlightText: {
    color: '#00BFFF',
  },
  promotionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
   card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    position: 'relative',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#FFA500',
    borderWidth: 2,
  },
  premiumTag: {
    backgroundColor: '#00BFFF',
    borderRadius: 15, // Arredondando mais as bordas
    paddingVertical: 2,
    paddingHorizontal: 8,
    position: 'absolute',
    right: -100,  // Ajuste para garantir que fique fora do card
    top: -10,    // Ajuste para ficar no topo da imagem
    elevation: 3, // Sombra para destacar a tag

  },
  premiumText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold', // Texto mais destacado
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cardDetails: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  cardPrice: {
    fontSize: 14,
    color: '#0d47a1',
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardMember: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
  },
  navLink: {
    alignItems: 'center',
  },
  navContent: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});

export default Home;