import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientAddress, setClientAddress] = useState('');
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainerRes = await axios.get(`https://apipet.com.br/trainer`);
        setTrainers(trainerRes.data);

        if (!token) {
          setClientAddress('');
          return;
        }

        const decoded = jwtDecode(token);
        const id = decoded?.sub;

        if (!id) {
          setClientAddress('');
          return;
        }

        const clientRes = await axios.get(`https://apipet.com.br/client/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fullAddress = clientRes.data?.address || '';
        setClientAddress(fullAddress);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const renderHearts = (rating) => {
    const maxRating = 5;
    return Array.from({ length: maxRating }, (_, i) => (
      <Ionicons
        key={i}
        name="heart"
        size={16}
        color={i < rating ? '#00BFFF' : '#ccc'}
      />
    ));
  };

  const handleTrainerPress = async (trainerId) => {
    try {
      await AsyncStorage.setItem('selectedTrainerId', String(trainerId));
      router.push('/page/PerfilAdestrador');
    } catch (error) {
      console.error("Erro ao salvar o ID do treinador:", error);
      Alert.alert("Erro", "Não foi possível selecionar o treinador.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.address} numberOfLines={2} ellipsizeMode="tail">
            {clientAddress || 'Endereço não cadastrado'}
          </Text>
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

          {loading ? (
            <ActivityIndicator size="large" color="#00BFFF" />
          ) : trainers.length > 0 ? (
            trainers.map((trainer) => (
              <View key={trainer.id} style={styles.cardContainer}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleTrainerPress(trainer.id)}
                >
                  {(trainer.isPremium === true || trainer.isPremium === 'true') && (
                    <View style={styles.premiumTag}>
                      <View style={styles.premiumDot} />
                      <Text style={styles.premiumText}>Premium</Text>
                    </View>
                  )}
                  <Image source={require('../../../assets/perfil.png')} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardName}>{trainer.username || 'Nome não disponível'}</Text>
                    </View>
                    <View style={styles.ratingRow}>
                      {renderHearts(trainer.rating || 0)}
                    </View>
                    <Text style={styles.cardDetails} numberOfLines={2} ellipsizeMode="tail">
                      <Ionicons name="location" size={14} color="gray" /> {`${trainer.address || 'Endereço não disponível'}`}
                    </Text>
                    <Text style={styles.cardPrice}>
                      <Ionicons name="cash-outline" size={14} color="green" /> R${trainer.hourly_rate || '00'}/hora
                    </Text>
                    <Text style={styles.cardMember}>Membro do app desde {trainer.member_since || 'Fev/23'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Nenhum treinador encontrado.</Text>
          )}
        </View>
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    maxWidth: 200,
    flexWrap: 'wrap',
    flexShrink: 1,
    marginTop:24
  },
  icons: { flexDirection: 'row' },
  icon: { marginLeft: 15 },
  section: { marginVertical: 10, paddingHorizontal: 20 },
  sectionTitle: {
    color: '#6459D0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  highlightText: { color: '#00BFFF' },
  promotionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    elevation: 2,
    position: 'relative',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#FFA500',
    borderWidth: 2
  },
  cardContent: {
    marginLeft: 10,
    flex: 1
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  premiumTag: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#D1FAE5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 10,
  },
  premiumDot: {
    width: 6,
    height: 6,
    backgroundColor: '#10B981',
    borderRadius: 3,
    marginRight: 5,
  },
  premiumText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  cardDetails: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    flexShrink: 1,
    overflow: 'hidden',
    maxWidth: 250
  },
  cardPrice: {
    fontSize: 14,
    color: '#0d47a1',
    fontWeight: 'bold',
    marginTop: 5
  },
  cardMember: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white'
  },
  navItem: {
    alignItems: 'center'
  },
  navLink: {
    alignItems: 'center'
  },
  navContent: {
    alignItems: 'center'
  },
  navText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5
  }
});

export default Home;