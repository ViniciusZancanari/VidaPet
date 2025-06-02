import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importar useRouter e remover Link

const AgendamentoAula12 = () => {
    const router = useRouter(); // Inicializar o router

    const handleClose = () => {
        router.push('/page/Home'); // Ou a rota de PerfilAdestrador se for diferente
    };

    const handleGoBack = () => {
        router.push('/page/AgendamentoAula11');
    };

    const handleSave = () => {
        // Lógica para salvar os dados do cartão aqui
        // Depois de salvar (ou se a navegação for incondicional):
        router.push('/page/AgendamentoAula11'); // Ou para onde quer que o botão "Salvar" deva levar
    };

    return (
        <View style={styles.container}>
            {/* X no canto superior para voltar à página Home (ou PerfilAdestrador) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Cartão de crédito</Text>
            
            <View style={styles.iconsContainer}>
                <Image source={require('../../../assets/visa.png')} style={styles.icon} />
                <Image source={require('../../../assets/mastercard.png')} style={styles.icon} />
            </View>

            <TextInput style={styles.input} placeholder="Número de cartão" placeholderTextColor="#FFF" keyboardType="numeric" />
            
            <View style={styles.row}>
                <TextInput style={[styles.input, styles.halfInput]} placeholder="Validade (MM/AA)" placeholderTextColor="#FFF" keyboardType="numeric" />
                <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" placeholderTextColor="#FFF" keyboardType="numeric" secureTextEntry />
            </View>

            <TextInput style={styles.input} placeholder="Nome do titular" placeholderTextColor="#FFF" />
            {/* O campo abaixo "Número de cartão" parece ser um duplicado, removi ou pode ser ajustado se for para outro propósito */}
            {/* <TextInput style={styles.input} placeholder="Número de cartão" placeholderTextColor="#FFF" /> */}
            <TextInput style={styles.input} placeholder="Apelido do cartão (opcional)" placeholderTextColor="#FFF" />

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.voltarButton} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.salvarButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff4f84', // Cor de fundo original
        padding: 20,
        // borderRadius: 10, // Removido pois geralmente não se aplica ao container principal da tela
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Garante que o container ocupe toda a largura
        minHeight: '100%', // Garante que o container ocupe toda a altura
    },
    header: {
        position: 'absolute',
        top: 40, // Ajustar conforme necessário para status bar e notch
        right: 20,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        color: 'white',
        fontSize: 22, // Aumentei um pouco para destaque
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
        resizeMode: 'contain', // Para garantir que a imagem caiba sem distorcer
    },
    input: {
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        borderBottomWidth: 1, // Mudança para apenas linha inferior para um visual mais clean
        // borderWidth: 1, // Removido
        // borderRadius: 5, // Removido para combinar com borderBottomWidth
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 12, // Ajuste para melhor toque
        marginVertical: 10, // Aumentei o espaçamento vertical
        width: '90%', // Um pouco menos que 100% para centralizar melhor visualmente
        height: 45, // Aumentei um pouco a altura
        fontSize: 16, // Tamanho da fonte do input
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%', // Alinhado com a largura dos outros inputs
        marginBottom: 10, // Espaço antes do próximo input
    },
    halfInput: {
        width: '48%', // Mantido
        marginVertical: 0, // Removido marginVertical aqui pois o 'row' já tem marginBottom
    },
    buttons: {
        flexDirection: 'row',
        // justifyContent: 'space-between', // Alterado para space-around ou center se preferir
        justifyContent: 'space-around',
        width: '90%', // Alinhado com a largura dos inputs
        marginTop: 30, // Aumentei o espaço antes dos botões
        // marginBottom: 50, // Removido, pois o container já centraliza
    },
    voltarButton: {
        // marginRight: 20, // Removido pois space-around vai cuidar do espaçamento
        paddingVertical: 12, // Aumentei o padding
        paddingHorizontal: 35, // Aumentei o padding
        borderRadius: 30,
        backgroundColor: 'transparent',
        borderWidth: 1.5, // Aumentei a espessura da borda
        borderColor: '#fff',
        // marginBottom: 50, // Removido
        // color: '#FFF', // Cor é para o Text, não para o TouchableOpacity
    },
    salvarButton: {
        backgroundColor: '#191970',
        paddingVertical: 12, // Aumentei o padding
        paddingHorizontal: 45, // Aumentei o padding
        borderRadius: 30,
        // marginBottom: 50, // Removido
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#faac0f',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', // Adicionado para dar mais destaque
        textAlign: 'center',
    },
});

export default AgendamentoAula12;