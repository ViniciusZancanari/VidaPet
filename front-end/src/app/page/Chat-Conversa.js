import React, { useState, useEffect, useCallback } from 'react'; // Adicione useCallback
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const ChatConversa = () => {
  const router = useRouter();
  const { conversationId, receiverId, receiverName, receiverAvatar } = useLocalSearchParams();
  const { token } = useAuth();
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser({ id: decoded.sub, type: decoded.type });
    }
  }, [token]);
  
  // ===================== INÍCIO DA MODIFICAÇÃO 1 =====================
  // Usamos useCallback para poder chamar esta função de outros lugares
  // sem recriá-la desnecessariamente.
  const fetchMessages = useCallback(async () => {
    if (!token || !receiverId) return;

    try {
      const response = await axios.get(
        `https://apipet.com.br/chat/messages/${receiverId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (Array.isArray(response.data)) {
        const sortedMessages = response.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setMessages(sortedMessages);
        setError(null);
      } else {
        console.warn("A API não retornou uma lista (array) de mensagens:", response.data);
        setMessages([]);
      }

    } catch (err) {
      console.error("Erro ao buscar mensagens:", err.response?.data || err.message);
      setError("Não foi possível carregar o histórico de mensagens.");
    } finally {
      setLoading(false);
    }
  }, [token, receiverId]); // Dependências do useCallback
  
  useEffect(() => {
    fetchMessages(); // Chama a função na primeira vez que o componente carrega
    
    // Continua buscando a cada 5 segundos para receber mensagens de outros
    const intervalId = setInterval(fetchMessages, 5000); 
    
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [fetchMessages]); // A dependência agora é a própria função
  // ===================== FIM DA MODIFICAÇÃO 1 =====================

  const handleSend = async () => {
    if (newMessage.trim() === '' || !token) return;
    const payload = { receiverId, content: newMessage };

    // Limpa o campo de texto antes de enviar para uma sensação de mais rapidez
    const sentMessage = newMessage;
    setNewMessage('');

    try {
      await axios.post('https://apipet.com.br/chat/messages', payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // ===================== INÍCIO DA MODIFICAÇÃO 2 =====================
      // Após enviar a mensagem com sucesso, busca a lista atualizada
      // imediatamente, sem esperar os 5 segundos do intervalo.
      await fetchMessages();
      // ===================== FIM DA MODIFICAÇÃO 2 =====================

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
      alert("Não foi possível enviar a mensagem.");
      // Se der erro, devolve o texto para o usuário não perdê-lo
      setNewMessage(sentMessage);
    }
  };

  const renderMessageItem = ({ item }) => {
    // Verifica se a mensagem foi enviada pelo usuário atual
    const isMyMessage = item.senderId === currentUser?.id;
    
    // A lógica de renderização original estava errada. Ela deve comparar o ID do remetente
    // com o ID do usuário atual, e não o "senderType".
    if (isMyMessage) {
      return (
        <View style={[styles.messageContainer, styles.myMessage]}>
          <Text style={styles.myMessageText}>{item.content}</Text>
          <View style={styles.timeAndReadContainer}>
            <Text style={styles.myTimeText}>
              {new Date(item.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Ionicons name="checkmark-done" size={16} color="#E0E0E0" style={{marginLeft: 4}} />
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.messageContainer, styles.otherMessage]}>
        <Text style={styles.otherMessageText}>{item.content}</Text>
        <Text style={styles.otherTimeText}>
          {new Date(item.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };
  
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} size="large" color="#EF5C43" />;
    }

    if (error) {
      return (
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.centeredMessageText}>{error}</Text>
        </View>
      );
    }

    if (messages.length === 0) {
        return (
            <View style={styles.centeredMessageContainer}>
                <Text style={styles.centeredMessageText}>Nenhuma mensagem ainda. Envie a primeira!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.messagesList}
            contentContainerStyle={{ paddingVertical: 10 }}
            inverted
        />
    );
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={28} color="#EF5C43" />
            </TouchableOpacity>
            <Image
                source={receiverAvatar ? { uri: receiverAvatar } : require('../../../assets/perfil.png')}
                style={styles.profilePic}
            />
            <View style={styles.headerTextContainer}>
                <Text style={styles.name} numberOfLines={1}>{receiverName}</Text>
                <Text style={styles.role}>Adestrador</Text>
            </View>
        </View>

        {renderContent()}

        <View style={styles.inputArea}>
            <TextInput
                style={styles.textInput}
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Ionicons name="send" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    header: {
      paddingTop:35,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      backgroundColor: '#FFF'
    },
    backButton: {
      marginRight: 10,
    },
    profilePic: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      marginRight: 12,
    },
    headerTextContainer: {
      flex: 1,
    },
    name: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#333',
    },
    role: {
      fontSize: 14,
      color: 'gray',
    },
    messagesList: {
      flex: 1,
      paddingHorizontal: 10,
    },
    messageContainer: {
      marginVertical: 5,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 20,
      maxWidth: '80%',
    },
    // Correção de nome para melhor semântica
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#5487DB',
    },
    otherMessage: {
      backgroundColor: '#EBEBEB',
      alignSelf: 'flex-start',
    },
    myMessageText: {
      color: '#fff',
      fontSize: 15,
    },
    otherMessageText: {
        color: '#000',
        fontSize: 15,
    },
    myTimeText: {
        color: '#E0E0E0',
        fontSize: 11,
        alignSelf: 'flex-end',
    },
    otherTimeText: {
        color: 'gray',
        fontSize: 11,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    timeAndReadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    inputArea: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      backgroundColor: '#FFF'
    },
    textInput: {
      flex: 1,
      minHeight: 40,
      maxHeight: 120,
      backgroundColor: '#F1F1F1',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
      fontSize: 16
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#EF5C43',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    centeredMessageText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    }
});   

export default ChatConversa;