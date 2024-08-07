import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const AgendamentoAula12 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cartão de crédito</Text>
            <View style={styles.iconsContainer}>
                <Image source={require('../../../assets/visa.png')} style={styles.icon} />
                <Image source={require('../../../assets/mastercard.png')} style={styles.icon} />
            </View>
            <TextInput style={styles.input} placeholder="Número de cartão" placeholderTextColor="#FFF" />
            <View style={styles.row}>
                <TextInput style={[styles.input, styles.halfInput]} placeholder="Validade" placeholderTextColor="#FFF" />
                <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" placeholderTextColor="#FFF" />
            </View>
            <TextInput style={styles.input} placeholder="Nome do titular" placeholderTextColor="#FFF" />
            <TextInput style={styles.input} placeholder="Número de cartão" placeholderTextColor="#FFF" />
            <TextInput style={styles.input} placeholder="Apelido do cartão (opcional)" placeholderTextColor="#FFF" />

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.voltarButton}>
                    <Link 
                        style={styles.buttonText}
                        href="/page/AgendamentoAula11">Voltar
                    </Link>

                </TouchableOpacity>

                <TouchableOpacity style={styles.salvarButton}>
                    <Link
                        style={styles.buttonText}
                        href="/page/AgendamentoAula11">Salvar
                    </Link>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff4f84',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 50,
        height: 30,
        marginHorizontal: 10,
    },
    input: {
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
        paddingHorizontal: 10,
        marginVertical: 5,
        width: '100%',
        height: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    halfInput: {
        width: '48%',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    voltarButton: {
        marginRight: 20,
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 50,
        color: '#FFF',

    },

    salvarButton: {
        backgroundColor: '#191970',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginBottom: 50,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#faac0f'

    },

    buttonText: {
        color: '#fff',
        fontSize: 16,

    },
});

export default AgendamentoAula12;
