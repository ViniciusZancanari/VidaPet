import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import axios from 'axios';
import { Link } from 'expo-router';


const Reagendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [trainer, setTrainer] = useState(null);
    const ip = Constants.manifest2?.extra?.localhost || '192.168.0.6';

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {
        if (!selectedTime) {
            Alert.alert('Erro', 'Por favor, selecione um horário antes de continuar.');
            return;
        }

        const postData = {
            client_id: "0804fac1-880f-4394-b818-368580659f43",
            trainer_id: "6194a177-923d-4c03-8504-2ef51df5992e",
            total_price: 50,
            address: "Av Jose Cunha , 382",
            availableDate: `${selectedDate}T${selectedTime}:00.000Z`,
            type_payment: "CARD",
            hourClass: selectedTime,
        };

        // Aqui envia para o backend (descomente quando configurar o backend)
        /*
        axios.post(`http://${ip}:3000/trainingService`, postData)
            .then(response => {
                Alert.alert('Sucesso', 'Horário agendado com sucesso!');
            })
            .catch(error => {
                Alert.alert('Erro', 'Ocorreu um erro ao agendar o horário.');
            });
        */
    };

    useEffect(() => {
        axios.get(`http://${ip}:3000/trainer/9e98e699-0fc3-4570-8a1a-027475d850b9`)
            .then(response => setTrainer(response.data))
            .catch(error => console.error('Erro ao buscar o treinador:', error));
    }, [ip]);

    const timeSlots = [
        '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00'
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                    <Link href="/page/Agenda" style={styles.confirmButtonText}>
                        <Ionicons name="arrow-back" size={24} color="#EF5C43" />
                    </Link>  
                    </TouchableOpacity>
                    <Text style={styles.headerText}>AGENDA</Text>
                </View>

                <Text style={styles.subtitle}>
                    Aula com <Text style={styles.highlightedText}>{trainer ? trainer.username : 'Carregando...'}</Text>
                </Text>

                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            [selectedDate]: { selected: true, marked: true, selectedColor: '#4A55B1' },
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
                    {timeSlots.map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[styles.timeButton, selectedTime === time && styles.timeButtonSelected]}
                            onPress={() => handleTimeSelect(time)}
                        >
                            <Text style={[styles.timeButtonText, selectedTime === time && styles.timeButtonTextSelected]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Link href="/page/Agenda" style={styles.confirmButtonText}>
                        Confirmar
                    </Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        color: '#333',
        textAlign: 'center',
    },
    highlightedText: {
        color: '#4A55B1',
        fontWeight: 'bold',
    },
    calendarContainer: {
        borderRadius: 10,
        backgroundColor: '#EFEFEF',
        padding: 10,
        marginBottom: 20,
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
        marginBottom: 20,
    },
    timeButton: {
        width: 80,
        height: 40,
        margin: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#4A55B1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeButtonSelected: {
        backgroundColor: '#4A55B1',
        borderColor: '#4A55B1',
    },
    timeButtonText: {
        fontSize: 14,
        color: '#4A55B1',
    },
    timeButtonTextSelected: {
        color: '#FFF',
    },
    confirmButton: {
        backgroundColor: '#191970',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#FAA511',
        borderWidth: 1,
    },
    confirmButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Reagendar;
