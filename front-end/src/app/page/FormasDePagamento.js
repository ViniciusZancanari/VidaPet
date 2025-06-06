import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';



const FormasDePagamento = () => {

    const router = useRouter();


    return (
        <View style={styles.container}>
            {/* 1. JSX do Header simplificado para 3 elementos */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/page/Perfil')}>
                    <Icon name="arrow-back" size={24} color="#ff1744" />
                </TouchableOpacity>

                <Text style={styles.headerText}>FORMAS DE PAGAMENTO</Text>

                {/* Espaçador para garantir que o título fique centralizado */}
                <View style={styles.headerSpacer} />
            </View>

            <TouchableOpacity style={styles.cartoes} >
                <Image
                    source={require('../../../assets/visa.png')}
                />
                <View style={styles.cartao}>
                    <Text>Visa - Crédito</Text>
                    <Text>00000000</Text>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/editar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/lixeira.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cartoes} >
                <Image
                    source={require('../../../assets/mastercard.png')}
                />
                <View style={styles.cartao}>
                    <Text>Mastercard - Crédito</Text>
                    <Text>00000000</Text>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/editar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../../assets/lixeira.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Link
                    style={styles.buttonText}
                    href={'/page/AgendamentoAula11'}
                >Adicionar Cartão
                </Link>
            </TouchableOpacity>
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
        alignItems: 'center', // Alinha todos os itens na vertical
        marginBottom: 20,
        paddingVertical: 10, // Usamos padding vertical
        paddingHorizontal: 20, // e horizontal
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        // 2. MUDANÇA: Usamos 'space-between' para o alinhamento
        justifyContent: 'space-between',
    },
    backButton: {
        // 3. MUDANÇA: Removemos 'position: absolute'
        padding: 10,
    },
    backButtonText: {
        fontSize: 24, // Aumentado para melhor visualização e área de toque
        fontWeight: 'bold',
        color: '#EF5C43',
    },
    // 4. MUDANÇA: O espaçador agora tem uma largura fixa para balancear o layout
    headerSpacer: {
        width: 44, // Largura aproximada do backButton (ícone + padding)
    },
    headerText: {
        fontSize: 18, // Ajustado para melhor caber entre os botões
        fontWeight: 'bold',
        color: '#315381',
        textAlign: 'center',
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

export default FormasDePagamento;