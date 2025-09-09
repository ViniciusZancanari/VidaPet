import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- REMOVIDO pois não é mais necessário
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Endereco = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime } = useLocalSearchParams();
  const { token } = useAuth();

  useEffect(() => {
    const fetchClientAddresses = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const clientId = decodedToken?.sub;

        if (!clientId) {
          throw new Error('ID do cliente não encontrado no token.');
        }

        const response = await axios.get(`https://apipet.com.br/client/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const clientData = response.data;
        
        if (clientData && clientData.address && clientData.address.trim() !== '') {
          const formattedAddress = {
            id: clientData.id,
            full_address: clientData.address,
          };
          setAddresses([formattedAddress]);
        } else {
          Alert.alert(
            "Nenhum Endereço",
            "Você ainda não possui um endereço cadastrado. Gostaria de adicionar um agora?",
            [
              { text: "Depois", style: "cancel" },
              { text: "Sim", onPress: () => router.push('/page/DadosUsuario') }
            ]
          );
        }

      } catch (error) {
        console.error('Erro ao buscar endereços do cliente:', error);
        Alert.alert('Erro', 'Não foi possível carregar os seus endereços.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientAddresses();
  }, [token, router]);

  // ==========================================================
  // FUNÇÃO CORRIGIDA
  // ==========================================================
  const handleAddressSelect = (selectedAddress) => {
    if (selectedAddress) {
      // Navega para a próxima tela incluindo o endereço nos parâmetros
      router.push({
        pathname: '/page/AgendamentoAula6',
        params: {
          trainer_id,
          selectedDate,
          selectedTime,
          // ADICIONADO: Enviando o endereço diretamente como parâmetro
          address: selectedAddress.full_address,
        }
      });
    }
  };

  const filteredAddresses = addresses.filter(address =>
    address.full_address.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#EF5C43" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>ENDEREÇOS</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por rua ou bairro..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <MaterialIcons name="search" size={24} color="#000" style={styles.searchIcon} />
      </View>

      <TouchableOpacity
        style={styles.addNewAddressButton}
        onPress={() => router.push('/page/DadosUsuario')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addNewAddressText}>Adicionar Novo Endereço</Text>
      </TouchableOpacity>

      <View style={styles.addressesContainer}>
        {filteredAddresses.length > 0 ? (
          filteredAddresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={styles.addressItem}
              onPress={() => handleAddressSelect(address)} // <-- Chama a função corrigida
            >
              <View style={styles.addressIcon}>
                <MaterialIcons name="location-on" size={24} color="#315381" />
              </View>
              <View style={styles.addressDetails}>
                <Text style={styles.addressText}>{address.full_address}</Text>
              </View>
              <View style={styles.addressOptions}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noAddressText}>Nenhum endereço encontrado.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#EF5C43',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#315381',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#000',
    backgroundColor: '#fff'
  },
  searchIcon: {
    marginLeft: 10,
  },
  addNewAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5C43',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  addNewAddressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressesContainer: {
    paddingHorizontal: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  addressIcon: {
    marginRight: 16,
  },
  addressDetails: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  addressOptions: {
    marginLeft: 16,
  },
  noAddressText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});

export default Endereco;