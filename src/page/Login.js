import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

const Login = () => {
    const [isSelected, setSelection] = useState(false);
    const [isSMSSelected, setSMSSelection] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo1.png')}
            />
                <TextInput style={styles.input} placeholder="Login:" placeholderTextColor="#FFF" />
                <TextInput style={styles.input} placeholder="Senha:" placeholderTextColor="#FFF" />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
                <Text style={styles.buttonText2}>Ainda não possui conta?</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Fazer login com o Google</Text>
                </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d47a1',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 0,
    },
    form:{
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    radioText: {
        color: 'white',
        marginLeft: 5,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    label: {
        marginLeft: 8,
        color: 'white',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
       
        
    },
    buttonText: {
        color:'#000',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonText2: {
        color:'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Login;
