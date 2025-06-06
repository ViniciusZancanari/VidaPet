import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Termo_Cancelamento = () => {
    const router = useRouter();
    // 1. RECEBER o ID do agendamento que será cancelado
    const { training_service_id } = useLocalSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    // 2. CRIAR A FUNÇÃO DE CANCELAMENTO
    const handleConfirmCancellation = async () => {
        if (!training_service_id) {
            Alert.alert("Erro", "ID do agendamento não encontrado.");
            return;
        }

        setIsLoading(true);

        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (!userDataString) throw new Error('Faça login novamente.');
            
            const token = JSON.parse(userDataString)?.token;
            if (!token) throw new Error('Token de autenticação inválido.');

            // Usando PATCH como exemplo
            const response = await axios.patch(
                `https://apipet.com.br/trainingService/CancelTrainingService/${training_service_id}`,
                {}, // Corpo vazio
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.status === 200) { // Sucesso geralmente é 200
                Alert.alert("Cancelamento Realizado", "A aula foi cancelada com sucesso.", [
                    { text: "OK", onPress: () => router.push('/page/Agenda') }
                ]);
            }
        } catch (error) {
            console.error("Erro ao cancelar aula:", error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível cancelar a aula. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>

            <Text style={styles.title}>Política de Cancelamento</Text>
            <Text style={styles.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget congue turpis, posuere fringilla nulla...
            </Text>
            <Text style={styles.questionText}>Deseja prosseguir com o cancelamento?</Text>

            <View style={styles.buttonContainer}>
                {/* BOTÃO SIM: Agora chama a função de cancelamento */}
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleConfirmCancellation}
                    disabled={isLoading}
                >
                    <LinearGradient
                        colors={isLoading ? ['#ccc', '#aaa'] : ['#E83378', '#F47920']}
                        style={styles.gradientButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Sim</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {/* BOTÃO NÃO: Apenas volta para a tela anterior (Agenda) */}
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/page/Agenda')}
                    disabled={isLoading}
                >
                    <LinearGradient
                        colors={isLoading ? ['#ccc', '#aaa'] : ['#E83378', '#F47920']}
                        style={styles.gradientButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Não</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 40, // Ajuste para melhor posicionamento
        right: 20,
        zIndex: 1,
    },
    title: {
        marginTop: 60, // Aumentado para dar espaço ao botão de fechar
        color: '#0d47a1',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    content: {
        color: 'black',
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
    },
    gradientButton: {
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Termo_Cancelamento;