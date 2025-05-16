import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Notificacao_AvaliacaoAulaNPS = () => {
  const router = useRouter();
  const [ip, setIp] = useState(Constants.manifest2?.extra?.localhost || '172.29.0.1');
  const [ratingClass, setRatingClass] = useState(0);
  const [ratingTechnique, setRatingTechnique] = useState(0);
  const [comment, setComment] = useState('');

  const evaluationId = "53fe971b-ea81-4566-a117-85fe6dfbc12e";
  const trainingServiceId = "87159b63-2d90-40d0-8a66-abb8065c7773";

  const handleRatingClass = (rating) => setRatingClass(rating);
  const handleRatingTechnique = (rating) => setRatingTechnique(rating);

  const handleSubmit = () => {
    if (ratingClass === 0 || ratingTechnique === 0) {
      Alert.alert('Erro', 'Por favor, avalie a aula e a técnica aplicada.');
      return;
    }

    const postData = {
      id: evaluationId,
      rating_class: ["ONESTAR", "TWOSTAR", "THREESTAR", "FOURSTAR", "FIVESTAR"][ratingClass - 1],
      liked_tec_class: ["ONESTAR", "TWOSTAR", "THREESTAR", "FOURSTAR", "FIVESTAR"][ratingTechnique - 1],
      training_service_id: trainingServiceId,
      tell_happened: comment || null,
      created_at: new Date().toISOString(),
    };

    axios.post(`https://164.152.36.73:3000/classEvaluation`, postData)
      .then(() => {
        // Redirecionar com base na avaliação
        if (ratingClass > 4) {
          router.push('/page/Alerts/Notifcacao_MensagemEnviada_Positiva');
        } else {
          router.push('/page/Alerts/Notifcacao_MensagemEnviada_Negativa');
        }
      })
      .catch(error => {
        console.error('Erro ao enviar a avaliação:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao enviar a avaliação.');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>AVALIAÇÃO DA AULA</Text>
        <Text style={styles.question}>O que você achou da aula?</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleRatingClass(index + 1)}>
              <Ionicons
                name={index < ratingClass ? "heart" : "heart-outline"}
                size={30}
                color={index < ratingClass ? "#7B68EE" : "gray"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.question}>Você gostou da técnica aplicada?</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleRatingTechnique(index + 1)}>
              <Ionicons
                name={index < ratingTechnique ? "heart" : "heart-outline"}
                size={30}
                color={index < ratingTechnique ? "#7B68EE" : "gray"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Deixe um comentário (opcional)"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  question: { fontSize: 16, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  ratingContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  commentInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 10, minHeight: 80 },
  submitButton: { backgroundColor: '#191970', padding: 10, borderRadius: 30, marginTop: 20 },
  submitButtonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
});

export default Notificacao_AvaliacaoAulaNPS;
