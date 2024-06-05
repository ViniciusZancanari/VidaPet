import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Perfil = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#ff1744" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={styles.profileImageContainer}>
            <Image
               source={require('../../assets/perfil.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.headerText} >Nome do Usuário</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="person-outline" size={24} color="#ff1744" />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>Dados do Usuário</Text>
            <Text style={styles.sectionSubtitle}>Visualize e edite suas informações</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="location-outline" size={24} color="#ff1744" />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>Endereços</Text>
            <Text style={styles.sectionSubtitle}>Meus locais de encontro</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="card-outline" size={24} color="#ff1744" />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>Pagamentos</Text>
            <Text style={styles.sectionSubtitle}>Gerencie as suas formas de pagamento</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="notifications-outline" size={24} color="#ff1744" />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>Notificações</Text>
            <Text style={styles.sectionSubtitle}>Confira todas as suas notificações</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="chatbubble-outline" size={24} color="#ff1744" />
          <View style={styles.sectionText}>
            <Text style={styles.sectionTitle}>Chat</Text>
            <Text style={styles.sectionSubtitle}>Acesse as suas conversas aqui</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Configurações</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#888" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="search-outline" size={24} color="#888" />
          <Text style={styles.navText}>Busca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-outline" size={24} color="#888" />
          <Text style={styles.navText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={24} color="#888" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
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

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#666',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
  },
});

export default Perfil;
