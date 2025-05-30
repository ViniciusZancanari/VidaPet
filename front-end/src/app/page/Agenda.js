import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Agenda = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState('');
    const [classes, setClasses] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [totalClasses, setTotalClasses] = useState(0);
    const [clientId, setClientId] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            setIsLoading(true);
            try {
                const userData = await AsyncStorage.getItem('userData');
                const parsedUser = JSON.parse(userData);
                const id = parsedUser?.id;

                if (!id) {
                    console.error('ID do cliente não encontrado.');
                    setIsLoading(false);
                    return;
                }

                setClientId(id);

                const response = await fetch('https://apipet.com.br/trainingService/');
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = await response.json();
                setClasses(data);

                const clientClasses = data.filter(item => item.client_id === id);
                setTotalClasses(clientClasses.length);

                // Marca os dias com agendamentos
                const dates = {};
                clientClasses.forEach((item) => {
                    const date = item.availableDate.split('T')[0];
                    dates[date] = {
                        marked: true,
                        dotColor: '#4A55B1',
                        selected: false,
                    };
                });
                setMarkedDates(dates);

            } catch (error) {
                console.error('Error fetching classes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleDayPress = (day) => {
        // Atualiza apenas o dia selecionado sem apagar os marcados
        const updatedMarkedDates = { ...markedDates };

        // Primeiro, remove qualquer seleção anterior
        Object.keys(updatedMarkedDates).forEach(date => {
            updatedMarkedDates[date] = {
                ...updatedMarkedDates[date],
                selected: false,
            };
        });

        // Se o dia clicado já tinha marcação, mantém a bolinha e marca como selecionado
        if (updatedMarkedDates[day.dateString]) {
            updatedMarkedDates[day.dateString] = {
                ...updatedMarkedDates[day.dateString],
                selected: true,
                selectedColor: '#4A55B1',
            };
        } else {
            // Se não tinha marcação, só marca como selecionado normal
            updatedMarkedDates[day.dateString] = {
                selected: true,
                selectedColor: '#4A55B1',
            };
        }

        setMarkedDates(updatedMarkedDates);
        setSelectedDate(day.dateString);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Link href="/page/Home">
                    <Ionicons name="arrow-back" size={24} color="#EF5C43" />
                    </Link>
                </TouchableOpacity>
                <Text style={styles.headerText}>AGENDA</Text>
            </View>

            <Text style={styles.subtitle}>
                <Text style={styles.subtitleText}>Você tem </Text>
                <Text style={styles.highlightedText}>{totalClasses} aulas agendadas neste mês</Text>
            </Text>

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={markedDates}
                    theme={{
                        selectedDayBackgroundColor: '#4A55B1',
                        todayTextColor: '#EF5C43',
                        arrowColor: '#4A55B1',
                        dotColor: '#4A55B1',
                    }}
                />
            </View>

            {isLoading ? (
                <Text style={styles.loadingText}>Carregando aulas...</Text>
            ) : classes.length > 0 ? (
                classes
                    .filter(classItem => classItem.client_id === clientId)
                    .map((classItem) => (
                        <View key={classItem.id} style={styles.classesContainer}>
                            <Text style={styles.dateText}>
                                {new Date(classItem.availableDate).toLocaleDateString('pt-BR')}
                            </Text>

                            <Text style={styles.classInfo}>Horário: {classItem.hourClass}</Text>
                            <Text style={styles.classInfo}>Profissional: {classItem.trainer.username}</Text>
                            <Text style={styles.classInfo}>Serviço: Adestramento de cachorro</Text>
                            <Text style={styles.classInfo}>Valor: R${classItem.total_price}</Text>
                            <Text style={styles.classInfo}>Local: {classItem.address}</Text>

                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionButtonText}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Link href="/page/Reagendar" style={styles.actionButtonText}>
                                        Reagendar
                                    </Link>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Link href="/page/Termo_Cancelamento" style={styles.actionButtonText}>
                                        Cancelar aula
                                    </Link>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
            ) : (
                <Text style={styles.noDataText}>Nenhuma aula encontrada.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#315381',
        textAlign: 'center',
        flex: 1,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    subtitleText: {
        color: '#333',
    },
    highlightedText: {
        color: '#4A55B1',
        fontWeight: 'bold',
    },
    calendarContainer: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#EFEFEF',
        padding: 10,
    },
    classesContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A55B1',
        marginBottom: 10,
    },
    classInfo: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#191970',
        borderColor: '#FAA511',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        color: '#555',
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        color: '#555',
    },
});

export default Agenda;
