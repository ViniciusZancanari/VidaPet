import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationItem = ({ title, time }) => {
    return (
        <View style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>{title}</Text>
            <Text style={styles.notificationTime}>{time}</Text>
        </View>
    );
};

const Endereco3 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerText}>ENDEREÇOS</Text>
                <View style={styles.headerSpacer} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Confirmar</Text>
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
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 10,
    },
    backButtonText: {
        fontSize: 20,
        color: '#EF5C43',
    },
    headerSpacer: {
        flex: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#315381',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#191970',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 50,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#faac0f',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Endereco3;
