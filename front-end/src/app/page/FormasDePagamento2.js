import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const FormasDePagamento2 = () => {
    const [transacoes, setTransacoes] = useState([]);

    const cartoes = [
        { id: '1', bandeira: 'Visa', tipo: 'Crédito', numero: '0000', imagem: require('../../../assets/visa.png') },
        { id: '2', bandeira: 'Mastercard', tipo: 'Crédito', numero: '0000', imagem: require('../../../assets/mastercard.png') },
    ];

    // Função para criar um link de pagamento
    const handleCreatePayment = async () => {
        try {
            const preference = {
                items: [
                    {
                        title: 'Serviço Exemplo',
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: 50.0, // Valor do pagamento
                    },
                ],
            };

            const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer TEST-1234567890abcdef1234567890abcdef`,
                },
                body: JSON.stringify(preference),
            });

            const data = await response.json();
            const paymentLink = data.init_point;

            // Abre o link de pagamento no navegador ou dentro do app
            Linking.openURL(paymentLink);
        } catch (error) {
            console.error('Erro ao criar o pagamento:', error);
        }
    };

    // Função para buscar transações recentes
    const fetchTransactions = async () => {
        try {
            const response = await fetch(
                'https://api.mercadopago.com/v1/payments/search',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer TEST-1234567890abcdef1234567890abcdef`,
                    },
                }
            );

            const data = await response.json();
            if (data.results && Array.isArray(data.results)) {
                const formattedData = data.results.map(transaction => ({
                    ...transaction,
                    statusText: getStatusText(transaction.status),
                    statusColor: getStatusColor(transaction.status),
                }));
                setTransacoes(formattedData);
            }
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Confirmado';
            case 'pending':
                return 'Pendente';
            case 'rejected':
                return 'Cancelado';
            default:
                return 'Desconhecido';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return '#4CAF50'; // Verde
            case 'pending':
                return '#FFC107'; // Amarelo
            case 'rejected':
                return '#F44336'; // Vermelho
            default:
                return '#9E9E9E'; // Cinza
        }
    };

    // Chama a função para buscar transações ao carregar o componente
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Link
                        style={styles.backButtonText}
                        href="/page/Perfil">{'<'}
                    </Link>
                </TouchableOpacity>
                <Text style={styles.headerText}>PAGAMENTOS</Text>
            </View>

            <Text style={styles.sectionTitle}>Formas de pagamento</Text>
            {cartoes.map(cartao => (
                <View key={cartao.id} style={styles.cartoes}>
                    <Image source={cartao.imagem} style={styles.cartaoImagem} />
                    <View style={styles.cartaoInfo}>
                        <Text style={styles.cartaoTexto}>{`${cartao.bandeira} - ${cartao.tipo}`}</Text>
                        <Text style={styles.cartaoTexto}>•••• {cartao.numero}</Text>
                    </View>
                    <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Image source={require('../../../assets/editar.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Image source={require('../../../assets/lixeira.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={handleCreatePayment}>
                <Text style={styles.addButtonText}>Adicionar cartão</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Histórico de transações</Text>
            <FlatList
                data={transacoes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.transacao}>
                        <Text style={styles.transacaoNome}>{item.description}</Text>
                        <Text style={styles.transacaoDetalhes}>{item.payment_method_id}</Text>
                        <Text style={styles.transacaoDetalhes}>{new Date(item.date_created).toLocaleString()}</Text>
                        <Text style={styles.transacaoValor}>R${item.transaction_amount.toFixed(2)}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                            <Text style={styles.statusText}>{`Status: ${item.statusText}`}</Text>
                        </View>
                    </View>
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 20,
        color: '#EF5C43',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#315381',
        flex: 1,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#315381',
        marginBottom: 10,
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
        elevation: 3,
    },
    cartaoImagem: {
        width: 40,
        height: 40,
    },
    cartaoInfo: {
        flex: 1,
        marginLeft: 15,
    },
    cartaoTexto: {
        fontSize: 14,
        color: '#555',
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
    addButton: {
        backgroundColor: '#191970',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        borderColor: '#faac0f',
        borderWidth: 2,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    transacao: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    transacaoNome: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#315381',
    },
    transacaoDetalhes: {
        fontSize: 12,
        color: '#555',
    },
    transacaoValor: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#EF5C43',
        marginTop: 5,
    },
    statusBadge: {
        marginTop: 10,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default FormasDePagamento2;
