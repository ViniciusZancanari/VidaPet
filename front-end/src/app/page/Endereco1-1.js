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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Endereco1 = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const { trainer_id, selectedDate, selectedTime } = useLocalSearchParams();

  useEffect(() => {
    const fetchClientAddress = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { id } = JSON.parse(userData);
          const response = await axios.get(`https://apipet.com.br/client/${id}`);
          const client = response.data;

          if (client) {
            const fullAddress = client.address || 'Endereço não informado';
            setAddresses([
              {
                id: client.id,
                address: fullAddress,
                city: '',
                apt: '',
                selected: false,
              }
            ]);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientAddress();
  }, []);

  const handleAddressSelect = async (id) => {
    const selectedAddress = addresses.find(addr => addr.id === id);

    if (selectedAddress) {
      try {
        await AsyncStorage.setItem('selectedAddress', selectedAddress.address);
        
        router.push({
          pathname: '/page/AgendamentoAula6',
          params: {
            trainer_id,
            selectedDate,
            selectedTime
          }
        });

      } catch (error) {
        console.error('Erro ao salvar o endereço:', error);
        Alert.alert('Erro', 'Não foi possível salvar o endereço selecionado.');
      }
    }
  };

  const filteredAddresses = addresses.filter(address =>
    address.address.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EF5C43" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Link style={styles.backButtonText} href={{
            pathname: "/page/AgendamentoAula4",
            params: { trainer_id, selectedDate, selectedTime }
          }}>{'<'}</Link>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerText}>ENDEREÇOS</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Endereço e número:"
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
          <Text style={styles.currentLocationTitle}>Usar minha localização atual</Text>
          <Text style={styles.currentLocationAddress}>
            {addresses[0]?.address || 'Endereço não informado'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.addressesContainer}>
        {filteredAddresses.length > 0 ? (
          filteredAddresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={styles.addressItem}
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
          ))
        ) : (
          <Text style={styles.noAddressText}>Nenhum endereço encontrado</Text>
        )}
      </View>
    </View>
  );
};

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  currentLocationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#315381',
    marginBottom: 2,
  },
  currentLocationAddress: {
    fontSize: 13,
    color: '#999',
  },
  addressesContainer: {
    padding: 16,
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
    shadowColor: '#EF5C43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
  },
  addressOptions: {
    marginLeft: 16,
  },
  noAddressText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
});

export default Endereco1;