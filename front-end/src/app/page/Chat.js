// Chat.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// Se você não estiver usando um ícone de 'react-native-vector-icons' para a seta,
// pode remover a importação de Icon, caso a tenha.
// import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';

const Chat = () => {
  const chatItemsData = [
    {
      id: '1',
      name: 'Thiago Oliveira Freitas',
      preview: 'Cum earum modi ea autem aliquam ut dolor voluptas. Vel archite...',
      date: '16/01/2024',
      unread: 1,
      avatarSource: require('../../../assets/perfil.png'), // Caminho para sua imagem local
    },
    {
      id: '2',
      name: 'Thiago Oliveira Freitas',
      preview: 'Cum earum modi ea autem aliquam ut dolor voluptas. Vel archite...',
      date: '16/01/2024',
      unread: 3,
      avatarSource: require('../../../assets/perfil.png'), // Caminho para sua imagem local
    },
    {
      id: '3',
      name: 'Thiago Oliveira Freitas',
      preview: 'Cum earum modi ea autem aliquam ut dolor voluptas. Vel archite...',
      date: '16/01/2024',
      unread: 6,
      avatarSource: require('../../../assets/perfil.png'), // Caminho para sua imagem local
    },
    {
      id: '4',
      name: 'Thiago Oliveira Freitas',
      preview: 'Cum earum modi ea autem aliquam ut dolor voluptas. Vel archite...',
      date: '16/01/2024',
      unread: 12,
      avatarSource: require('../../../assets/perfil.png'), // Caminho para sua imagem local
    },
  ];

  // Componente para renderizar cada item da lista
  const renderChatItem = ({ item }) => (
    <Link href="/page/Chat-Conversa" asChild>
      <TouchableOpacity style={styles.chatItemContainer}>
        <Image source={item.avatarSource} style={styles.avatar} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text style={styles.preview} numberOfLines={1} ellipsizeMode="tail">
              {item.preview}
            </Text>
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
        {/* Espaçador para ajudar a centralizar o título quando o botão de voltar está presente */}
        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={chatItemsData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF', // Cor de fundo da tela inteira
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para alinhar itens (botão, título, espaçador)
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Linha divisória do cabeçalho
    backgroundColor: 'white', // Fundo do cabeçalho
  },
  backButton: {
    // Ajuste o padding se necessário para aumentar a área de toque
    paddingRight: 10, // Espaço à direita do ícone dentro do botão
    zIndex: 1, // Garante que o botão de voltar esteja clicável
  },
  backArrowIcon: {
    fontSize: 28, // Tamanho do ícone de seta
    color: '#FF4136', // Cor da seta (vermelho)
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor do título
    // O título será naturalmente centralizado pelo justifyContent: 'space-between' no header
    // se o botão e o espaçador tiverem larguras "similares" ou se o título puder ocupar o espaço flexível.
  },
  listContentContainer: {
    paddingBottom: 16, // Espaço no final da lista
  },
  chatItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F8F8F8', // Cor de fundo do item
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED', // Linha divisória sutil entre itens
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Metade da largura/altura para um círculo perfeito
    marginRight: 12, // Espaço entre o avatar e o conteúdo de texto
  },
  contentContainer: { // Container para os blocos de texto e informações (data/badge)
    flex: 1, // Ocupa o espaço restante
    flexDirection: 'row',
    justifyContent: 'space-between', // Separa o bloco de nome/preview do bloco de data/badge
  },
  textContainer: { // Container para nome e preview
    flex: 1, // Permite que este container cresça e o texto quebre linha se necessário
    marginRight: 8, // Espaço antes do container de data/badge
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Cor do nome
    marginBottom: 4, // Espaço entre o nome e a prévia da mensagem
  },
  preview: {
    fontSize: 14,
    color: '#666', // Cor da prévia da mensagem
  },
  infoContainer: { // Container para data e badge
    alignItems: 'flex-end', // Alinha data e contador à direita e um sobre o outro
    // justifyContent: 'center', // Pode ser usado se quiser centralizar verticalmente data e badge
  },
  date: {
    fontSize: 12,
    color: '#888', // Cor da data
    marginBottom: 8, // Espaço entre a data e o contador de não lidas
  },
  badgeContainer: {
    backgroundColor: '#FF4136', // Cor do badge de não lidas (vermelho)
    borderRadius: 12, // Para torná-lo circular/ovalado
    paddingHorizontal: 8, // Espaçamento horizontal dentro do badge
    paddingVertical: 4,   // Espaçamento vertical dentro do badge
    minWidth: 24,         // Largura mínima para acomodar números de 1 ou 2 dígitos
    alignItems: 'center',   // Centraliza o texto do badge horizontalmente
    justifyContent: 'center', // Centraliza o texto do badge verticalmente
  },
  badgeText: {
    color: '#FFF', // Cor do texto dentro do badge
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Chat;