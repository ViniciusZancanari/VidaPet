import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const AgendamentoAula11 = () => {
    return (
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
            {/* X no canto superior direito */}
            <View style={styles.header}>
                <Link href="/page/Home">
                    <Text style={styles.closeButtonText}>X</Text>
                </Link>
            </View>

            {/* Título */}
            <View style={styles.titleContainer}>
                <Text style={styles.headerText}>Cartão de Crédito</Text>
            </View>

            {/* Cartão Visa */}
            <TouchableOpacity style={styles.cartoes}>
                <Image source={require('../../../assets/visa.png')} style={styles.cartaoImagem}/>
                <Link style={styles.cartaoLink} href="/page/AgendamentoAula7">
                    <View>
                        <Text style={styles.cartaoTitle}>Visa - Crédito</Text>
                        <Text style={styles.cartaoNumber}>•••• 0000</Text>
                    </View>
                </Link>
                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/editar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/lixeira.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* Cartão Mastercard */}
            <TouchableOpacity style={styles.cartoes}>
                <Image source={require('../../../assets/mastercard.png')} style={styles.cartaoImagem}/>
                <Link style={styles.cartaoLink} href="/page/AgendamentoAula7">
                    <View>
                        <Text style={styles.cartaoTitle}>Mastercard - Crédito</Text>
                        <Text style={styles.cartaoNumber}>•••• 0000</Text>
                    </View>
                </Link>
                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/editar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/lixeira.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* Botão adicionar cartão */}
            <TouchableOpacity style={styles.button}>
                <Link style={styles.buttonText} href="/page/AgendamentoAula12">
                    Cadastrar novo cartão
                </Link>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    titleContainer: {
        marginTop: 80, // espaço para o X
        marginBottom: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
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
    cartaoImagem: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    cartaoLink: {
        flex: 1,
        marginLeft: 10,
    },
    cartaoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#315381',
    },
    cartaoNumber: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
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
    button: {
        backgroundColor: '#191970',
        paddingVertical: 12,
        borderRadius: 30,
        marginTop: 20,
        alignSelf: 'center',
        paddingHorizontal: 60,
        borderWidth: 3,
        borderColor: '#faac0f',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default AgendamentoAula11;
