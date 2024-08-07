import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Endereco2 = () => {
  const [address, setAddress] = useState('');
  const [showAddressDetails, setShowAddressDetails] = useState(false);

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const handleAddressDetails = () => {
    setShowAddressDetails(!showAddressDetails);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>ENDEREÇOS</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Endereço e número:"
          onChangeText={handleAddressChange}
          value={address}
        /><TouchableOpacity style={styles.locationButton} onPress={handleAddressDetails}>
          <Icon name="my-location" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showAddressDetails && (
        <View style={styles.addressDetails}>
          <Text style={styles.addressText}>R. Lorem Ipsum - Sit Amet - São Paulo - SP</Text>
          <Text style={styles.addressText}>R. Thomas Muller, 22</Text>
          <Text style={styles.addressText}>Moema, São Paulo - SP - Apto 36</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#008CBA',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  locationButton: {
    backgroundColor: '#008CBA',
    padding: 12,
    borderRadius: 4,
    marginLeft: 16,
  },
  addressDetails: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginTop: 16,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Endereco2;