import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('TOKEN ARMAZENADO:', token); // <-- DEBUG

        if (!token) {
          setError('Você precisa estar logado para ver suas conversas.');
          return;
        }

        const response = await fetch('https://apipet.com.br/chat/conversations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const responseBody = await response.text();
          console.warn('Resposta não OK:', response.status, responseBody); // <-- DEBUG extra
          throw new Error('Falha ao buscar as conversas. Tente novamente mais tarde.');
        }

        const data = await response.json();
        const adaptedData = data.map(item => ({
          id: item.id,
          name: item.userName,
          preview: item.lastMessage,
          date: new Date(item.lastMessageDate).toLocaleDateString('pt-BR'),
          unread: item.unreadMessages,
          avatarSource: item.avatarUrl ? { uri: item.avatarUrl } : require('../../../assets/perfil.png'),
        }));
        
        setConversations(adaptedData);
      } catch (e) {
        console.error('Erro ao buscar conversas:', e); // <-- LOG adicional
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const renderChatItem = ({ item }) => (
    <Link href="/page/Chat-Conversa" asChild>
      <TouchableOpacity style={styles.chatItemContainer}>
        <Image source={item.avatarSource} style={styles.avatar} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.preview} numberOfLines={1}>{item.preview}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.date}>{item.date}</Text>
            {item.unread > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF4136" />
          <Text>Carregando conversas...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      );
    }

    if (conversations.length === 0) {
      return (
        <View style={styles.centered}>
          <Text>Nenhuma conversa encontrada.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={conversations}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Link href="/page/Perfil" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backArrowIcon}>{'<'}</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>CONVERSAS</Text>
        <View style={{ width: 30 }} />
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  backButton: { paddingRight: 10, zIndex: 1 },
  backArrowIcon: { fontSize: 28, color: '#FF4136', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  listContentContainer: { paddingBottom: 16 },
  chatItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: { flex: 1, marginRight: 8 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  preview: { fontSize: 14, color: '#666' },
  infoContainer: { alignItems: 'flex-end' },
  date: { fontSize: 12, color: '#888', marginBottom: 8 },
  badgeContainer: {
    backgroundColor: '#FF4136',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', paddingHorizontal: 20 },
});

export default Chat;
