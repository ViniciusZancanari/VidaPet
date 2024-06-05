import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.address}>R. Lorem Ipsum, 100</Text>
          <View style={styles.icons}>
            <Ionicons name="search" size={24} color="black" style={styles.icon} />
            <Ionicons name="ios-notifications" size={24} color="black" style={styles.icon} />
          </View>
        </View>
      
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promoções incríveis!</Text>
          <Image source={require('../../assets/BannersPromocoes.png')}
            style={styles.promotionImage}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alguns profissionais perto de você:</Text>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={require('../../assets/perfil.png')}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>Thiago Oliveira Freitas</Text>
                <Text style={styles.cardDetails}>São Paulo, SP • 10km</Text>
                <Text style={styles.cardPrice}>R$50/hora</Text>
                <Text style={styles.cardMember}>Membro do app desde Fev/23</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="black" />
          <Text style={styles.navText}>Busca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="black" />
          <Text style={styles.navText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  icons: {
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
    margin: 20,
    borderRadius: 5,
  },
  hireButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color:'#6459D0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    borderRadius: 10,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 14,
    color: 'gray',
  },
  cardPrice: {
    fontSize: 14,
    color: '#0d47a1',
    fontWeight: 'bold',
  },
  cardMember: {
    fontSize: 12,
    color: 'gray',
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
  navText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});

export default Home;
