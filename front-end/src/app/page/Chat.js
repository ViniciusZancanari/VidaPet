// src/app/page/Chat.js

import React, { useState, useEffect, useCallback } from 'react'; // 1. Importe o useCallback
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
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // ===================== INÍCIO DA MODIFICAÇÃO =====================

  // 2. A função de busca é envolvida por useCallback
  const fetchConversations = useCallback(async () => {
    try {
      if (!token) {
        setError('Você precisa estar logado para ver suas conversas.');
        setLoading(false);
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
        throw new Error('Falha ao buscar as conversas.');
      }

      const data = await response.json();
      
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      
      const adaptedData = data.map(item => {
        const participant = item.otherUser || {}; 
        const lastMessage = item.lastMessage || {};

        return {
          id: item.id,
          receiverId: participant.id,
          name: participant.username || 'Nome não encontrado',
          preview: lastMessage.content || 'Nenhuma mensagem',
          date: item.lastMessage?.created_at ? new Date(item.lastMessage.created_at).toLocaleDateString('pt-BR') : '',
          unread: item.unreadMessages || 0,
          avatar: participant.avatar,
        };
      });
      
      setConversations(adaptedData);
    } catch (e) {
      console.error('Erro detalhado ao buscar conversas:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [token]); // A função depende do token

  // 3. O useEffect agora usa setInterval para repetir a busca
  useEffect(() => {
    if (token) {
      fetchConversations(); // Busca inicial
      
      // Define um intervalo para buscar novas conversas a cada 7 segundos
      const intervalId = setInterval(fetchConversations, 7000);

      // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
      return () => clearInterval(intervalId);
    } else {
        // Se o usuário não estiver logado, garante que o loading pare.
        setLoading(false);
        setConversations([]);
    }
  }, [token, fetchConversations]); // Reage a mudanças no token ou na função de busca

  // ===================== FIM DA MODIFICAÇÃO =====================

  const renderChatItem = ({ item }) => (
    <Link 
      href={{ 
        pathname: "/page/Chat-Conversa", 
        params: { 
          conversationId: item.id,
          receiverId: item.receiverId,
          receiverName: item.name,
          receiverAvatar: item.avatar,
        } 
      }} 
      asChild
    >
      <TouchableOpacity style={styles.chatItemContainer}>
        <Image 
            source={item.avatar ? { uri: item.avatar } : require('../../../assets/perfil.png')} 
            style={styles.avatar} 
        />
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

// ... Seus estilos continuam os mesmos
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