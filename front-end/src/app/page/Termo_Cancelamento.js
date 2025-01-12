import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Termo_Cancelamento = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Botão de fechar no canto superior direito */}
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>

            <Text style={styles.title}>Política de Cancelamento</Text>
            <Text style={styles.content}>
                {/* Adicione o texto dos termos de uso e política de privacidade aqui */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget congue turpis, posuere fringilla nulla...
            </Text>
            <Text style={styles.questionText}>Deseja prosseguir com o cancelamento?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={['#E83378', '#F47920']}
                        style={styles.gradientButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Link style={styles.buttonText} href="/page/Agenda">
                            Sim
                        </Link>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={['#E83378', '#F47920']}
                        style={styles.gradientButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Link style={styles.buttonText} href="/page/Agenda">
                            Não
                        </Link>
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
        top: 20,
        right: 20,
        zIndex: 1,
    },
    title: {
        marginTop:50,
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
        paddingVertical: 10,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Termo_Cancelamento;
