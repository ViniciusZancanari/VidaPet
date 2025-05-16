import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Endereco1 = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchClientAddress = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const { id } = JSON.parse(userData);
                    const response = await axios.get(`https://164.152.36.73:3000/client/${id}/address`);
                    
                    if (response.data && response.data.length > 0) {
                        setAddresses(response.data.map(address => ({
                            id: address.id,
                            address: address.street,
                            city: `${address.city}, ${address.state}`,
                            apt: address.complement || '',
                            selected: false
                        })));
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar endereço:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClientAddress();
    }, []);

    const handleAddressSelect = (id) => {
        setAddresses((prevAddresses) =>
            prevAddresses.map((address) =>
                address.id === id
                    ? { ...address, selected: !address.selected }
                    : { ...address, selected: false }
            )
        );
    };

    const filteredAddresses = addresses.filter(address =>
        address.address.toLowerCase().includes(searchText.toLowerCase()) ||
        address.city.toLowerCase().includes(searchText.toLowerCase())
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
                    <Link
                        style={styles.backButtonText}
                        href="/page/Perfil">{'<'}
                    </Link>
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
            <TouchableOpacity style={styles.currentLocation}>
                <MaterialIcons name="my-location" size={24} color="#000" />
                <Text style={styles.currentLocationText}>
                    Usar minha localização atual
                </Text>
                <Text style={styles.currentLocationAddress}>
                    {addresses.length > 0 ? addresses[0].address : 'Nenhum endereço cadastrado'}
                </Text>
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
                                <MaterialIcons
                                    name={address.selected ? 'check-circle' : 'redo'}
                                    size={24}
                                    color={address.selected ? '#007bff' : '#000'}
                                />
                            </View>
                            <View style={styles.addressDetails}>
                                <Text style={styles.addressText}>
                                    {address.address}
                                </Text>
                                <Text style={styles.addressCity}>
                                    {address.city}
                                </Text>
                                <Text style={styles.addressApt}>{address.apt}</Text>
                            </View>
                            <View style={styles.addressOptions}>
                                <MaterialIcons name="more-vert" size={24} color="#000" />
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
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    currentLocationText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    currentLocationAddress: {
        marginLeft: 8,
        fontSize: 14,
        color: '#777',
    },
    addressesContainer: {
        padding: 16,
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
    addressCity: {
        fontSize: 14,
        color: '#777',
    },
    addressApt: {
        fontSize: 14,
        color: '#777',
    },
    addressOptions: {
        marginLeft: 16,
    },
});

export default Endereco1;