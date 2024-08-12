import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';


const Chat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.title}>CONVERSAS</Text>
        <View style={styles.placeholder}></View>
      </View>
      <ScrollView>
        {Array.from({ length: 3 }).map((_, index) => (
          <Link key={index} href="/page/Chat-Conversa" style={styles.cardLink}>
            <View style={[styles.card, { backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }]}>
              <Image source={require('../../../assets/perfil.png')} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>Thiago Oliveira Freitas</Text>
                <Text style={styles.cardMessage}>
                  Cum earum modi ea autem aliquam ut dolor voluptas. Vel archite...
                </Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardDate}>16/01/2024</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{index + 1}</Text>
                </View>
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  placeholder: {
    width: 24,
  },
  cardLink: {
    textDecorationLine: 'none', // Remove underline from Link
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between', // Align items at the ends
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    marginRight: 20, // Add margin to the right to avoid touching the right edge
    
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  cardMessage: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  cardDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Chat;
