import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants'; // Para acessar informações do dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = () => {
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const response = await axios.get(`https://apipet.com.br/client/${user.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Link href="/page/Home" style={styles.navItem}>
              <Icon name="arrow-back" size={24} color="#ff1744" />
            </Link>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../../../assets/perfil.png')}
                style={styles.profileImage}
              />
            </View>

            {/* Exibe o nome do usuário dinamicamente */}
            <Text style={styles.headerText}>
              {user ? user.username : 'Carregando...'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionItem}>
            <Icon name="person-outline" size={24} color="#ff1744" />
            <View style={styles.sectionText}>
              <Link style={styles.sectionTitle} href="/page/DadosUsuario">
                Dados do Usuário
              </Link>
              <Text style={styles.sectionSubtitle}>Visualize e edite suas informações</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <Icon name="location-outline" size={24} color="#ff1744" />
            <View style={styles.sectionText}>
              <Link style={styles.sectionTitle} href="/page/Endereco1">
                Endereços
              </Link>
              <Text style={styles.sectionSubtitle}>Meus locais de encontro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <Icon name="card-outline" size={24} color="#ff1744" />
            <View style={styles.sectionText}>
              <Link style={styles.sectionTitle} href="/page/FormasDePagamento">
                Pagamentos
              </Link>
              <Text style={styles.sectionSubtitle}>Gerencie as suas formas de pagamento</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <Icon name="notifications-outline" size={24} color="#ff1744" />
            <View style={styles.sectionText}>
              <Link style={styles.sectionTitle} href="/page/Notificacao">
                Notificações
              </Link>
              <Text style={styles.sectionSubtitle}>Confira todas as suas notificações</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <Icon name="chatbubble-outline" size={24} color="#ff1744" />
            <View style={styles.sectionText}>
              <Link style={styles.sectionTitle} href="/page/Chat">
                Chat
              </Link>
              <Text style={styles.sectionSubtitle}>Acesse as suas conversas aqui</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.navBar}>
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#315381',
    textAlign: 'center',
  },
  profileImageContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  section: {
    padding: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  sectionText: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#1C4175',
  },
  notificationBadge: {
    backgroundColor: '#ff1744',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginLeft: 'auto',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    color: '#888',
    marginTop: 5,
  },
});

export default Perfil;
