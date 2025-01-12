import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const Agenda = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState('');
    const [classes, setClasses] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [totalClasses, setTotalClasses] = useState(0);

    const clientId = '9b8b0296-758d-489c-847e-043336b65f35'; // Substitua pelo ID do cliente

    // Fetch data from backend
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                console.log('Fetching data from backend...');
                const response = await fetch('http://172.29.0.1:3000/trainingService/');
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Data fetched successfully:', data);
                setClasses(data);

                // Filtrar as aulas do cliente específico
                const clientClasses = data.filter(item => item.client_id === clientId);
                setTotalClasses(clientClasses.length);

                // Marcar datas no calendário
                const dates = {};
                clientClasses.forEach((item) => {
                    const date = item.availableDate.split('T')[0];
                    dates[date] = { marked: true, selectedColor: '#4A55B1' };
                });
                setMarkedDates(dates);
            } catch (error) {
                console.error('Error fetching classes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, [clientId]);

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#EF5C43" />
                </TouchableOpacity>
                <Text style={styles.headerText}>AGENDA</Text>
            </View>

            {/* Informações de agenda */}
            <Text style={styles.subtitle}>
                <Text style={styles.subtitleText}>Você tem </Text>
                <Text style={styles.highlightedText}>{totalClasses} aulas agendadas neste mês</Text>
            </Text>

            {/* Calendário fixo */}
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                        ...markedDates,
                        [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
                    }}
                    theme={{
                        selectedDayBackgroundColor: '#4A55B1',
                        todayTextColor: '#EF5C43',
                        arrowColor: '#4A55B1',
                    }}
                />
            </View>

            {/* Lista de aulas */}
            {isLoading ? (
                <Text style={styles.loadingText}>Carregando aulas...</Text>
            ) : classes.length > 0 ? (
                classes
                    .filter(classItem => classItem.client_id === clientId) // Apenas aulas do cliente
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
