import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const AgendamentoAula11 = () => {

    return (
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
            <Text style={styles.header}>Cartão de Crédito</Text>
            <TouchableOpacity style={styles.cartoes} >
                <Image
                    source={require('../../assets/visa.png')}
                />
                <View style={styles.cartao}>
                    <Text>Visa - Crédito</Text>
                    <Text>00000000</Text>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/editar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/lixeira.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cartoes} >
                <Image
                    source={require('../../assets/mastercard.png')}
                />
                <View style={styles.cartao}>
                    <Text>Mastercard - Crédito</Text>
                    <Text>00000000</Text>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/editar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/lixeira.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Adicionar Cartão</Text>
            </TouchableOpacity>
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems:'baseline'
    },

    cartoes: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cartao: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888'

    },
    button: {
        backgroundColor: '#191970',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 30,
        marginBottom: 50,
        marginTop: 20,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#faac0f',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    cardActions: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },

});

export default AgendamentoAula11;
