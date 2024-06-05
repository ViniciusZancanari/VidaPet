import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationItem = ({ title, time }) => {
    return (
        <View style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>{title}</Text>
            <Text style={styles.notificationTime}>{time}</Text>
        </View>
    );
};

const Notificacao = () => {
    const [notifications] = useState([
        {
            title: 'Lorem ipsum dolor sit amet',
            time: '3h',
        },
        {
            title: 'Donec finibus, nisi nec finibus mattis, lectus mauris gravida ex, nec pretium risus ex eget erat. Pra...',
            time: '3h',
        },
        {
            title: 'Lorem ipsum dolor sit amet',
            time: '3h',
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerText}>NOTIFICAÇÕES</Text>
                <View style={styles.headerSpacer} />
            </View>
            {notifications.map((notification, index) => (
                <NotificationItem key={index} title={notification.title} time={notification.time} />
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

export default Notificacao;
