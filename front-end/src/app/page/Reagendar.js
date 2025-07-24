import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reagendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [trainer, setTrainer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { trainer_id, training_service_id } = useLocalSearchParams();

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setSelectedTime('');
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const isTimeDisabled = (time) => {
        if (!selectedDate) return true;

        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        if (selectedDate > todayStr) return false; // Data futura
        if (selectedDate < todayStr) return true;  // Data passada

        // Se for hoje, compara o horário
        const [hour, minute] = time.split(':').map(Number);
        const selectedTimeDate = new Date();
        selectedTimeDate.setHours(hour, minute, 0, 0);

        return selectedTimeDate.getTime() <= now.getTime();
    };

    const handleConfirmReschedule = async () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Seleção necessária', 'Por favor, selecione uma nova data e um novo horário.');
            return;
        }

        setIsLoading(true);

        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (!userDataString) throw new Error('Dados de autenticação não encontrados. Faça login novamente.');
            
            const userData = JSON.parse(userDataString);
            const token = userData?.token;

            if (!token) throw new Error('Token de autenticação inválido. Faça login novamente.');

            const newIsoDate = `${selectedDate}T${selectedTime}:00.000Z`;
            const payload = {
                newAvailableDate: newIsoDate,
                newHourClass: selectedTime,
            };

            const response = await axios.put(
                `https://apipet.com.br/trainingService/reschedule/${training_service_id}`,
                payload,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.status === 200) {
                Alert.alert('Sucesso!', 'Sua aula foi reagendada.', [
                    { text: 'OK', onPress: () => router.push('/page/Agenda') },
                ]);
            }
        } catch (error) {
            console.error('Erro ao reagendar:', error.response?.data || error.message);
            Alert.alert('Erro', error.message || 'Não foi possível reagendar a aula.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (trainer_id) {
            axios.get(`https://apipet.com.br/trainer/${trainer_id}`)
                .then(response => setTrainer(response.data))
                .catch(error => console.error('Erro ao buscar o treinador:', error));
        }
    }, [trainer_id]);

    const timeSlots = [
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#EF5C43" />
                </TouchableOpacity>
                <Text style={styles.headerText}>REAGENDAR AULA</Text>
            </View>

            <Text style={styles.subtitle}>
                Selecione um novo dia e horário para a aula com{' '}
                <Text style={styles.highlightedText}>{trainer ? trainer.username : '...'}</Text>
            </Text>

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={handleDayPress}
                    minDate={getMinDate()}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: '#4A55B1' }
                    }}
                    theme={{
                        selectedDayBackgroundColor: '#4A55B1',
                        todayTextColor: '#EF5C43',
                        arrowColor: '#4A55B1',
                    }}
                />
            </View>

            <Text style={styles.timeText}>Escolha um horário:</Text>
            <View style={styles.timeGrid}>
                {timeSlots.map((time) => {
                    const disabled = isTimeDisabled(time);
                    return (
                        <TouchableOpacity
                            key={time}
                            style={[
                                styles.timeButton,
                                selectedTime === time && styles.timeButtonSelected,
                                disabled && styles.timeButtonDisabled
                            ]}
                            onPress={() => !disabled && handleTimeSelect(time)}
                            disabled={disabled}
                        >
                            <Text style={[
                                styles.timeButtonText,
                                selectedTime === time && styles.timeButtonTextSelected,
                                disabled && styles.timeButtonTextDisabled
                            ]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity 
                style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]} 
                onPress={handleConfirmReschedule}
                disabled={isLoading}
            >
                <Text style={styles.confirmButtonText}>
                    {isLoading ? 'Reagendando...' : 'Confirmar Reagendamento'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#315381',
        textAlign: 'center',
        flex: 1,
        marginRight: 44,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
        lineHeight: 24,
    },
    highlightedText: {
        color: '#4A55B1',
        fontWeight: 'bold',
    },
    calendarContainer: {
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        padding: 5,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 30,
    },
    timeButton: {
        width: 80,
        height: 40,
        margin: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#4A55B1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeButtonSelected: {
        backgroundColor: '#4A55B1',
    },
    timeButtonDisabled: {
        backgroundColor: '#E0E0E0',
        borderColor: '#B0B0B0',
    },
    timeButtonText: {
        fontSize: 14,
        color: '#4A55B1',
    },
    timeButtonTextSelected: {
        color: '#FFF',
    },
    timeButtonTextDisabled: {
        color: '#A0A0A0',
    },
    confirmButton: {
        backgroundColor: '#191970',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        borderColor: '#FAA511',
        borderWidth: 2,
    },
    confirmButtonDisabled: {
        backgroundColor: '#a9a9a9',
        borderColor: '#696969'
    },
    confirmButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Reagendar;
