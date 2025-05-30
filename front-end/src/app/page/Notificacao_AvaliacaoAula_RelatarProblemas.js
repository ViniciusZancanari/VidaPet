import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import axios from 'axios';

const Notificacao_AvaliacaoAulaNPS = () => {
  const [selectedRating, setSelectedRating] = useState(3);
  const router = useRouter();
  const [ip, setIp] = useState(Constants.manifest2?.extra?.localhost || '172.29.0.1');
  const [ratingClass, setRatingClass] = useState(0);
  const [ratingTechnique, setRatingTechnique] = useState(0);
  const [comment, setComment] = useState('');

  // Variáveis de ID
  const evaluationId = "72cc7ee8-1aba-41a4-bed2-1e86c553ce59";

  now = new Date

  const handleUpdateEvaluation = () => {
    if (!comment.trim()) {
      Alert.alert('Erro', 'Por favor, descreva o problema no campo de comentário.');
      return;
    }

    // Dados formatados para atualizar a avaliação
    const updateData = {
      class_evaluation_id: evaluationId,
      tell_happened: comment,
      created_at: new Date().toISOString(),
    };

    axios.post(`https://apipet.com.br/reportProblem/`, updateData)
      .then(response => {
        Alert.alert('Sucesso', 'Avaliação atualizada com sucesso!');
        router.push('/page/Home');
      })
      .catch(error => {
        console.error('Erro ao atualizar a avaliação:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar a avaliação.');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Link style={styles.backButtonText} href="/page/Home">{'<'}</Link>
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerText}>AVALIAÇÃO DA AULA</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.classInfo}>
          Lamentamos que sua experiência não tenha sido como esperado. Estamos aqui para ajudar!
        </Text>

        <Text style={styles.commentLabel}>Conte-nos o que aconteceu:</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Escreva seu comentário aqui..."
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <View style={styles.buttonContainer}>
         

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateEvaluation}>
            <Link style={styles.updateButtonText} href="/page/Alerts/Notifcacao_MensagemEnviada_Positiva">Enviar</Link>
          </TouchableOpacity>
        </View>
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
  classInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#315381',
  },
  commentLabel: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#191970',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#faac0f',
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Notificacao_AvaliacaoAulaNPS;
