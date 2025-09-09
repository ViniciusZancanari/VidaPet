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
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
// IMPORTS ADICIONADOS para a nova lógica de autenticação
import { useAuth } from '../context/AuthContext'; 
import { jwtDecode } from 'jwt-decode';

const Endereco1 = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime } = useLocalSearchParams();
  // OBTENDO O TOKEN do contexto de autenticação
  const { token } = useAuth(); 

  // ==========================================================
  // LÓGICA DE BUSCA ATUALIZADA (igual ao seu exemplo)
  // ==========================================================
  useEffect(() => {
    const fetchClientAddress = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const clientId = decodedToken?.sub; // 'sub' é o ID do usuário no token

        if (!clientId) {
          throw new Error('ID do cliente não encontrado no token.');
        }

        // Faz a chamada para a API com o token de autorização
        const response = await axios.get(`https://apipet.com.br/client/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const clientData = response.data;

        if (clientData && clientData.address && clientData.address.trim() !== '') {
          // Formata o endereço para o estado, usando a chave 'address'
          const formattedAddress = {
            id: clientData.id,
            address: clientData.address, 
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
        console.error('Erro ao buscar o endereço do cliente:', error);
        Alert.alert('Erro', 'Não foi possível carregar o seu endereço.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientAddress();
  }, [token, router]); // Dependência do token para re-executar se o login mudar

  // A função handleAddressSelect continua correta, enviando o endereço como parâmetro
  const handleAddressSelect = (id) => {
    const selectedAddress = addresses.find(addr => addr.id === id);
    if (!selectedAddress) return;

    setSelectedId(id);

    
  };

  const filteredAddresses = addresses.filter(address =>
    address.address.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#EF5C43" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>ENDEREÇOS</Text>
      </View>
      
      {/* O resto do seu JSX continua o mesmo... */}
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar endereço..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <MaterialIcons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.currentLocation} onPress={() => addresses[0] && handleAddressSelect(addresses[0].id)}>
        <MaterialIcons name="my-location" size={24} color="#315381" style={styles.locationIcon} />
        <View>
          <Text style={styles.currentLocationTitle}>Usar meu endereço cadastrado</Text>
          <Text style={styles.currentLocationAddress}>
            {addresses[0]?.address || 'Nenhum endereço cadastrado'}
          </Text>
        </View>
      </TouchableOpacity>

      {filteredAddresses.length > 0 && addresses[0] && (
        <View style={styles.addressesContainer}>
          {filteredAddresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.addressItem,
                selectedId === address.id && styles.addressItemSelected
              ]}
              onPress={() => handleAddressSelect(address.id)}
            >
              <View style={styles.addressIcon}>
                <MaterialIcons name="location-on" size={24} color="#315381" />
              </View>
              <View style={styles.addressDetails}>
                <Text style={styles.addressText}>{address.address}</Text>
              </View>
              <View style={styles.addressOptions}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={styles.addNewAddressButton} 
        onPress={() => router.push('/page/DadosUsuario')}
      >
        <Text style={styles.addNewAddressText}>
          Cadastrar ou Alterar Endereço
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Seus estilos (styles) permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF5C43',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#315381',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
  },
  locationIcon: {
    marginRight: 12,
  },
  currentLocationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#315381',
  },
  currentLocationAddress: {
    fontSize: 14,
    color: '#666',
  },
  addressesContainer: {
    flex: 1,
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
  addressItemSelected: {
    borderColor: '#EF5C43',
    backgroundColor: '#FFF8F6',
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
    color: '#333',
  },
  addressOptions: {
    marginLeft: 16,
  },
  noAddressText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  addNewAddressButton: {
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#191970',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#faac0f',
    marginTop: 'auto',
  },
  addNewAddressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Endereco1;