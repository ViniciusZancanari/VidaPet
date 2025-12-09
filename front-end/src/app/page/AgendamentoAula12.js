import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, ActivityIndicator 
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MERCADOPAGO_PUBLIC_KEY = "APP_USR-51bd8c40-7ffa-4ffd-aee5-aa465c479758"; 
const API_URL = "https://apipet.com.br/payment/process"; 

export default function AgendamentoAula12({ trainingServiceId, serviceValue }) {
  const { userToken } = useAuth(); // pega token JWT
  const [loading, setLoading] = useState(false);
  const [logMessage, setLogMessage] = useState("");
  const [client, setClient] = useState(null);
  const [trainerId, setTrainerId] = useState(null);

  // Cartão
  const [cardNumber, setCardNumber] = useState("5031 4332 1540 6351");
  const [cardholderName, setCardholderName] = useState("APRO");
  const [expirationMonth, setExpirationMonth] = useState("11");
  const [expirationYear, setExpirationYear] = useState("2030");
  const [cvv, setCvv] = useState("123");
  const [documentNumber, setDocumentNumber] = useState("12345678909");
  const [installments, setInstallments] = useState("1");

  const amount = serviceValue || "1.00"; // valor do serviço

  const updateLog = (message) => {
    console.log(message);
    setLogMessage(message);
  };

  // Buscar cliente e treinador selecionado
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userToken) {
          setClient(null);
          return;
        }

        // Decodifica token para pegar ID do cliente
        const decoded = jwtDecode(userToken);
        const clientId = decoded?.sub;

        if (!clientId) {
          setClient(null);
          return;
        }

        // Busca cliente na API
        const clientRes = await axios.get(`https://apipet.com.br/client/${clientId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setClient(clientRes.data);

        // Recupera o trainerId salvo no AsyncStorage
        const storedTrainerId = await AsyncStorage.getItem("selectedTrainerId");
        if (storedTrainerId) {
          setTrainerId(storedTrainerId);
        }
      } catch (error) {
        console.error("Erro ao buscar cliente/treinador:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados de cliente/treinador.");
      }
    };

    fetchData();
  }, [userToken]);

  const handlePayment = async () => {
    if (!userToken || !client || !trainerId) {
      Alert.alert("Erro", "Você precisa estar logado e ter selecionado um treinador para pagar.");
      return;
    }

    setLoading(true);
    updateLog("🚀 Iniciando processo de pagamento...");

    try {
      // 1. Criar token do cartão
      const cardData = {
        card_number: cardNumber.replace(/\D/g, ""),
        cardholder: { name: cardholderName },
        expiration_month: Number(expirationMonth),
        expiration_year: Number(expirationYear),
        security_code: cvv,
      };

      const tokenResponse = await fetch(
        `https://api.mercadopago.com/v1/card_tokens?public_key=${MERCADOPAGO_PUBLIC_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cardData),
        }
      );

      const tokenData = await tokenResponse.json();
      if (tokenData.error) {
        updateLog(`❌ Falha ao gerar token - ${JSON.stringify(tokenData)}`);
        Alert.alert("Erro", "Não foi possível gerar o token do cartão.");
        setLoading(false);
        return;
      }

      const cardToken = tokenData.id;

      // 2. Obter payment_method_id
      const bin = cardNumber.replace(/\D/g, "").slice(0, 6);
      const pmResponse = await fetch(
        `https://api.mercadopago.com/v1/payment_methods/search?bin=${bin}&public_key=${MERCADOPAGO_PUBLIC_KEY}`
      );
      const pmData = await pmResponse.json();

      if (!pmData.results || pmData.results.length === 0) {
        Alert.alert("Erro", "Não foi possível identificar a bandeira do cartão.");
        setLoading(false);
        return;
      }

      const payment_method_id = pmData.results[0].id;
      const issuer_id = pmData.results[0].issuer?.id || null;

      // 3. Payload do pagamento
      const paymentData = {
        token: cardToken,
        installments: parseInt(installments),
        training_service_id: trainingServiceId,
        trainer_id: trainerId,   // 👈 vem do AsyncStorage
        client_id: client.id,    // 👈 vem do token
        payment_method_id,
        issuer_id,
        payer: {
          email: client.email, // 👈 vem do cliente logado
          identification: {
            type: "CPF",
            number: documentNumber.replace(/\D/g, ""),
          },
        },
      };

      // 4. Enviar pagamento ao backend
      const paymentResponse = await axios.post(API_URL, paymentData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (paymentResponse.data.status === "approved") {
        Alert.alert("Sucesso", "Pagamento aprovado com sucesso!");
      } else {
        Alert.alert(
          "Pagamento recusado",
          `Status: ${paymentResponse.data.status}\nDetalhe: ${paymentResponse.data.detail}`
        );
      }
    } catch (error) {
      console.error("❌ Erro no pagamento:", error);
      Alert.alert("Erro", "Ocorreu um erro no processamento do pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pagamento com Cartão</Text>

      <TextInput style={styles.input} placeholder="Número do cartão" keyboardType="numeric" value={cardNumber} onChangeText={setCardNumber} />
      <TextInput style={styles.input} placeholder="Nome do titular" value={cardholderName} onChangeText={setCardholderName} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Mês expiração (MM)" keyboardType="numeric" value={expirationMonth} onChangeText={setExpirationMonth} />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Ano expiração (YYYY)" keyboardType="numeric" value={expirationYear} onChangeText={setExpirationYear} />
      </View>
      <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry value={cvv} onChangeText={setCvv} />
      <TextInput style={styles.input} placeholder="CPF" value={documentNumber} onChangeText={setDocumentNumber} />
      <TextInput style={styles.input} placeholder="Parcelas" keyboardType="numeric" value={installments} onChangeText={setInstallments} />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 10 }} />
      ) : (
        <Button title="Pagar" onPress={handlePayment} />
      )}

      <Text style={styles.log}>{logMessage}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9f9f9", flexGrow: 1 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 20, textAlign: "center", color: "#333" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15, backgroundColor: "#fff" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { flex: 1, marginRight: 5 },
  log: { marginTop: 20, textAlign: "center", fontStyle: "italic", color: "#555" },
});
