import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const messages = [
  {
    id: 1,
    text: 'Cum earum modi ea autem aliquam ut dolor voluptas. Vel architecto quaerat ut veniam omnis qui natus aspernatur sed fugit veniam in earum rerum qui provident Quis.',
    time: '10:21',
    sender: 'other',
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec lobortis nunc. Curabitur hendrerit finibus turpis ut scelerisque. Nunc malesuada pretium tellus, quis tincidunt erat.',
    time: '10:21',
    sender: 'user',
  },
  {
    id: 3,
    text: 'Cum earum modi ea autem aliquam ut dolor voluptas. Vel architecto quaerat ut veniam omnis qui natus aspernatur sed fugit veniam in earum rerum qui provident Quis.',
    time: '10:21',
    sender: 'other',
  },
  {
    id: 4,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec lobortis nunc. Curabitur hendrerit finibus turpis ut scelerisque. Nunc malesuada pretium tellus, quis tincidunt erat.',
    time: '10:21',
    sender: 'user',
  }
];

const ChatConversa = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Link
            style={styles.backButtonText}
            href="/page/Chat">{'<'}
          </Link>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <Image
          source={require('../../../assets/perfil.png')}
          style={styles.profilePic}
        />
        <Text style={styles.name}>Thiago Oliveira Freitas</Text>
        <Text style={styles.role}>Adestrador</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.date}>18 de Janeiro de 2024</Text>
      </View>
      {messages.map((message) => (
        <View
          key={message.id}
          style={[
            styles.messageContainer,
            message.sender === 'user' ? styles.userMessage : styles.otherMessage,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.time}>{message.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  backButtonText: {
    fontSize: 20,
    color: '#EF5C43',
  },
  headerSpacer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#315381',
    textAlign: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: 'gray',
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#4facfe',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  time: {
    color: 'gray',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default ChatConversa;
