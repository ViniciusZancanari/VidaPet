import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';


const NotificationItem = ({ title, time }) => {
    return (
        <View style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>{title}</Text>
            <Text style={styles.notificationTime}>{time}</Text>
        </View>
    );
};

const Notificacao2 = () => {
    const [notifications] = useState([
        {
            title: 'Sua aula está confirmada!',
            time: 'Você tem uma aula marcada para o dia [dia X] às [hora Y] com o profissional [Profissional Z]',
        },
        {
            title: 'Como foi a sua aula de adestramento',
            time: 'A sua aula com a Profissional foi concluída! Avalie agora e nos ajude a melhorar a sua experiência'
        },

    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Link
                        style={styles.backButtonText}
                        href="/page/Perfil">{'<'}
                    </Link>
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerText}>NOTIFICAÇÕES</Text>
                <View style={styles.headerSpacer} />
            </View>
            {notifications.map((notification, index) => (
                <TouchableOpacity key={index}>
                    <Link href={'/page/Notificacao_AvaliacaoAulaNPS'}>
                        <NotificationItem title={notification.title} time={notification.time} />
                    </Link>
                </TouchableOpacity>
            ))}
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
    notificationContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationTitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    notificationTime: {
        fontSize: 14,
        color: '#666',
    },
});

export default Notificacao2;
