import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// --- PASSO 1: IMPORTAR AS FUNÇÕES DO SDK ---
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

// --- PASSO 2: INICIALIZAR O SDK COM SUA PUBLIC KEY ---
initMercadoPago('APP_USR-51bd8c40-7ffa-4ffd-aee5-aa465c479758', { locale: 'pt-BR' });


// As funções de validação de documento ainda são úteis
const isValidCPF = (cpf) => {
    // ... (código da função inalterado)
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    cpf = cpf.split('').map(el => +el);
    const rest = (count) => (cpf.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11 % 10;
    return rest(10) === cpf[9] && rest(11) === cpf[10];
};

const isValidCNPJ = (cnpj) => {
    // ... (código da função inalterado)
    if (typeof cnpj !== 'string') return false;
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;
    const validate = (digits) => {
        let index = digits.length - 7;
        let sum = 0;
        let pos = digits.length - 1;
        while (pos >= 0) {
            sum += digits[pos] * (index-- > 0 ? index : 9);
            pos--;
        }
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return result;
    };
    const a = cnpj.split('').map(el => +el);
    const b = a.slice(0, 12);
    const dv1 = validate(b);
    if (dv1 !== a[12]) return false;
    b.push(dv1);
    const dv2 = validate(b);
    return dv2 === a[13];
};


const AgendamentoAula12 = () => {
    const router = useRouter();
    const { trainer_id, selectedDate, selectedTime, address, serviceValue } = useLocalSearchParams();

    // --- ESTADOS SIMPLIFICADOS ---
    // Removemos os estados de cardNumber, expiryDate, cvv, installments
    const [fetchedTrainerName, setFetchedTrainerName] = useState('Carregando...');
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Estados que ainda precisamos para o payload do back-end
    const [email, setEmail] = useState('');
    const [holderName, setHolderName] = useState('');
    const [documentType, setDocumentType] = useState('CPF');
    const [documentNumber, setDocumentNumber] = useState('');
    const [nickname, setNickname] = useState('');

    // useEffects para buscar dados do usuário e treinador permanecem os mesmos
    useEffect(() => { /* ... (código do useEffect inalterado) ... */ }, [trainer_id]);
    useEffect(() => { /* ... (código do useEffect inalterado) ... */ }, []);

    // --- PASSO 3: LÓGICA DE PAGAMENTO SIMPLIFICADA ---
    // Esta função será chamada pelo Brick QUANDO o token já tiver sido criado com sucesso.
    const handlePaymentWithBrick = async (paymentData) => {
        const { token, installments, payment_method_id, issuer_id } = paymentData;

        // Validação dos campos que ainda são manuais
        if (!email || !holderName || !documentNumber) {
            Alert.alert('Erro de Validação', 'Por favor, preencha seu E-mail, Nome do Titular e Documento.');
            return;
        }
        if (documentType === 'CPF' && !isValidCPF(documentNumber)) {
            Alert.alert('Erro de Validação', 'O CPF informado é inválido.');
            return;
        }
        if (documentType === 'CNPJ' && !isValidCNPJ(documentNumber)) {
            Alert.alert('Erro de Validação', 'O CNPJ informado é inválido.');
            return;
        }

        setIsProcessing(true);
        let trainingServiceId = null;

        try {
            console.log('Criando o serviço de treinamento como pendente...');
            const authToken = await AsyncStorage.getItem('userToken');
            const decodedToken = jwtDecode(authToken);
            const clientId = decodedToken.sub;
            const formattedTime = selectedTime.includes(':') ? selectedTime : `${selectedTime}:00`;
            const isoDate = `${selectedDate}T${formattedTime}`;

            const serviceResponse = await axios.post('https://apipet.com.br/trainingService', {
                client_id: clientId, trainer_id: trainer_id, type_payment: 'CARD', address: address,
                hourClass: formattedTime, availableDate: isoDate, total_price: Number(serviceValue) || 50, status: "PENDING"
            });
            trainingServiceId = serviceResponse.data.id;
            console.log('✅ ID do Training Service gerado:', trainingServiceId);
            
            // Monta o payload final para o seu back-end
            const finalPayload = {
                token: token,
                installments: installments,
                payment_method_id: payment_method_id,
                issuer_id: issuer_id,
                payer: {
                    email: email,
                    identification: { type: documentType, number: documentNumber.replace(/\D/g, '') }
                },
                training_service_id: trainingServiceId
            };
            
            console.log('Enviando dados para processar o pagamento:', finalPayload);
            const paymentResponse = await axios.post(
                'https://apipet.com.br/payment/process',
                finalPayload,
                { headers: { 'Authorization': `Bearer ${authToken}` } }
            );

            if (paymentResponse.status === 201 || paymentResponse.status === 200) {
                console.log('Pagamento aprovado! Atualizando status do serviço para CONFIRMED.');
                await axios.patch(`https://apipet.com.br/trainingService/${trainingServiceId}`, { status: 'CONFIRMED' });
                Alert.alert('Sucesso!', 'Pagamento aprovado e agendamento confirmado!',
                    [{ text: 'OK', onPress: () => router.push('/page/Home') }]
                );
            }

        } catch (error) {
            console.error("Ocorreu um erro no processo:", error.response?.data || error.message);
            const finalMessage = error.response?.data?.message || 'O pagamento foi recusado. Verifique os dados ou tente outro cartão.';
            Alert.alert('Falha na Operação', finalMessage);
        } finally {
            setIsProcessing(false);
        }
    };


    if (loadingUserData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff4f84' }}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        );
    }
    
    // Configurações para o Brick
    const initializationConfig = {
        amount: Number(serviceValue) || 50,
        payer: {
            email: email, // Pré-preenche o e-mail no formulário do brick
        },
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/page/Home')}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Finalizar Pagamento</Text>

                {/* CAMPOS QUE AINDA PRECISAMOS COLETAR MANUALMENTE */}
                <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#FFF" keyboardType="email-address" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Nome do Titular (como no cartão)" placeholderTextColor="#FFF" value={holderName} onChangeText={setHolderName} />
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={documentType} onValueChange={(itemValue) => setDocumentType(itemValue)} style={styles.picker} dropdownIconColor="#FFF">
                        <Picker.Item label="CPF" value="CPF" />
                        <Picker.Item label="CNPJ" value="CNPJ" />
                    </Picker>
                </View>
                <TextInput style={styles.input} placeholder={documentType === 'CPF' ? 'Número do CPF' : 'Número do CNPJ'} placeholderTextColor="#FFF" keyboardType="numeric" value={documentNumber} onChangeText={setDocumentNumber} />
                
                {/* --- PASSO 4: ADICIONAR O COMPONENTE CardPayment ---
                  Este componente vai renderizar todos os campos do cartão, parcelas e o botão de pagar.
                */}
                <View style={styles.brickContainer}>
                    {isProcessing && <ActivityIndicator size="large" color="#191970" style={styles.brickLoading} />}
                    <CardPayment
                        initialization={initializationConfig}
                        onSubmit={handlePaymentWithBrick}
                        onReady={() => setIsProcessing(false)} // Esconde o loading quando o brick estiver pronto
                        onError={(error) => Alert.alert("Erro", "Não foi possível carregar o formulário de pagamento.")}
                    />
                </View>

                {/* O botão de voltar ainda é útil */}
                <TouchableOpacity style={styles.voltarButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// --- ESTILOS ATUALIZADOS ---
const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#ff4f84', padding: 20, alignItems: 'center', width: '100%' },
    header: { position: 'absolute', top: 40, right: 20, zIndex: 1 },
    closeButtonText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
    title: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: 'transparent', borderColor: '#FFF', borderBottomWidth: 1, color: 'white', paddingHorizontal: 10, paddingVertical: 12, marginVertical: 10, width: '90%', fontSize: 16 },
    pickerContainer: { width: '90%', borderColor: '#FFF', borderBottomWidth: 1, marginVertical: 10, justifyContent: 'center' },
    picker: { color: '#FFF', backgroundColor: 'transparent' },
    brickContainer: {
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        minHeight: 300, // Altura mínima para o brick carregar
        justifyContent: 'center'
    },
    brickLoading: {
        position: 'absolute',
        alignSelf: 'center'
    },
    voltarButton: { 
        paddingVertical: 12, 
        paddingHorizontal: 35, 
        borderRadius: 30, 
        backgroundColor: 'transparent', 
        borderWidth: 1.5, 
        borderColor: '#fff',
        marginTop: 20, // Espaçamento
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

export default AgendamentoAula12;