import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const PerfilAdestrador = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [loadingTrainer, setLoadingTrainer] = useState(true);
  const router = useRouter();

  const handleOptionPress = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  useEffect(() => {
    let isActive = true;
    const fetchTrainerData = async () => { // Função assíncrona para buscar os dados
      setLoadingTrainer(true);
      try {
        const trainerId = await AsyncStorage.getItem('selectedTrainerId'); // Recupera o ID do treinador

        if (!trainerId) {
          console.warn('Nenhum ID de treinador encontrado no AsyncStorage.');
          if (isActive) {
            setLoadingTrainer(false);
            Alert.alert("Erro", "Não foi possível encontrar o treinador selecionado. Por favor, retorne e tente novamente.");
            // Opcional: router.push('/page/Home'); para voltar à tela inicial
          }
          return; // Sai da função se não houver ID
        }

        console.log('Buscando dados para o treinador com ID:', trainerId); // Log para depuração

        const response = await axios.get(`https://apipet.com.br/trainer/${trainerId}`); // Usa o ID recuperado

        if (isActive) {
          setTrainer(response.data);
          setLoadingTrainer(false);
        }
      } catch (error) {
        if (isActive) {
          console.warn('--- DETALHES DO ERRO AXIOS AO BUSCAR TREINADOR ---');
          if (error.response) {
            console.warn("Dados da Resposta do Erro:", JSON.stringify(error.response.data, null, 2));
            console.warn("Status da Resposta do Erro:", error.response.status);
            console.warn("Cabeçalhos da Resposta do Erro:", JSON.stringify(error.response.headers, null, 2));
          } else if (error.request) {
            console.warn("Erro na Requisição (sem resposta):", error.request);
          } else {
            console.warn('Mensagem de Erro Geral:', error.message);
          }
          console.warn('--- FIM DETALHES DO ERRO AXIOS ---');

          setLoadingTrainer(false);
          Alert.alert(
            "Erro ao Carregar",
            "Não foi possível buscar os dados do treinador. Verifique sua conexão ou tente mais tarde."
          );
        }
      }
    };

    fetchTrainerData(); // Chama a função assíncrona

    return () => {
      isActive = false;
    };
  }, []); // Dependência vazia para executar apenas uma vez na montagem do componente

  const options = [
    { text: 'Avulso • R$50,00/aula', colors: ['#00BFFF', '#8A2BE2'], option: 'avulso' },
    { text: 'Mensal • 1x por semana - R$48,00/aula', colors: ['#E83378', '#F47920'], option: 'mensal1' },
    { text: 'Mensal • 2x por semana - R$46,00/aula', colors: ['#00BFFF', '#8A2BE2'], option: 'mensal2' },
    { text: 'Semestral • 1x por semana - R$46,00/aula', colors: ['#E83378', '#F47920'], option: 'semestral1' },
    { text: 'Semestral • 2x por semana - R$44,00/aula', colors: ['#00BFFF', '#8A2BE2'], option: 'semestral2' },
  ];

  const handleHirePress = () => {
    if (selectedOption && trainer && trainer.id) {
      router.push({
        pathname: '/page/AgendamentoAula1',
        params: { trainer_id: trainer.id }
      });
    } else if (selectedOption && (!trainer || !trainer.id)) {
      Alert.alert("Aguarde", "Os dados do treinador não estão disponíveis ou ainda estão carregando. Tente novamente em instantes.");
    }
  };

  if (loadingTrainer && !trainer) {
    return (
      <View style={[styles.container, styles.loadingView]}>
        <ActivityIndicator size="large" color="#0d47a1" />
        <Text style={styles.loadingText}>Carregando perfil do adestrador...</Text>
      </View>
    );
  }

  // Adicione uma condição para quando trainer for null (ex: erro no fetch ou ID não encontrado)
  if (!loadingTrainer && !trainer) {
    return (
      <View style={[styles.container, styles.loadingView]}>
        <Text style={styles.errorText}>Não foi possível carregar o perfil do adestrador.</Text>
        <TouchableOpacity onPress={() => router.push('/page/Home')} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Voltar para a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <TouchableOpacity onPress={() => router.push('/page/Home')}>
            <Ionicons name="arrow-back" size={24} color="#ff1744" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerCenter}>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {trainer ? trainer.address : 'Endereço não disponível'}
          </Text>
        </View>

        <View style={styles.headerSide}>
          <Ionicons name="search-outline" size={24} color="black" style={styles.icon} />
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </View>
      </View>


      <View style={styles.image}>
        <Image
          source={trainer && trainer.profile_image_url ? { uri: trainer.profile_image_url } : require('../../../assets/perfil.png')}
          style={styles.profileImageStyle}
        />
        <Image source={require('../../../assets/grafismo.png')} style={styles.grafismoImageStyle} />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.name}>{trainer ? trainer.username : 'Nome do Treinador'}</Text>
        {/* Assumindo que o treinador tem uma propriedade 'reviews_count' ou similar */}
        <Text style={styles.reviews}>{trainer && trainer.reviews_count !== undefined ? `${trainer.reviews_count} avaliações` : 'Carregando avaliações...'}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={styles.location}>
            {trainer ? `${trainer.city || 'Cidade não informada'}, ${trainer.state_initials || 'UF'}` : 'Localização não informada'}
          </Text>
        </View>
        <Text style={styles.price}>
          {trainer && trainer.hourly_rate ? `R$${parseFloat(trainer.hourly_rate).toFixed(2).replace('.', ',')}/hora` : 'Preço não disponível'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Sobre o <Text style={styles.highlight}>profissional:</Text>
      </Text>
      <Text style={styles.description}>
        {trainer ? trainer.professional_description : 'Nenhuma descrição disponível.'}
      </Text>

      <Text style={styles.sectionTitle}>
        Confira algumas <Text style={styles.highlight}>fotos:</Text>
      </Text>
      {/* Aqui você precisaria de um array de URLs de imagens no objeto trainer */}
      {trainer && trainer.gallery_images && trainer.gallery_images.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScrollView}>
          {trainer.gallery_images.map((imgUrl, index) => (
            <Image key={index} source={{ uri: imgUrl }} style={styles.photo} />
          ))}
        </ScrollView>
      ) : (
        <Image source={require('../../../assets/galeria1.png')} style={styles.video} />
      )}


      <Text style={styles.sectionTitle}>
        Assista ao <Text style={styles.highlight}>vídeo:</Text>
      </Text>
      {/* Se trainer.video_url existir, você pode usar um componente de vídeo */}
      {trainer && trainer.video_url ? (
        <Text style={{ textAlign: 'center', color: 'blue', textDecorationLine: 'underline' }} onPress={() => Alert.alert("Vídeo", `Reproduzir vídeo de: ${trainer.username}`)}>
          Clique para assistir o vídeo
        </Text>
      ) : (
        <Image source={require('../../../assets/galeria2.png')} style={styles.video} />
      )}

      <Text style={styles.sectionTitle}>
        Avaliações de <Text style={styles.highlight}>usuários:</Text>
      </Text>
      {/* Assumindo que trainer.reviews é um array de objetos de avaliação */}
      {trainer && trainer.reviews && trainer.reviews.length > 0 ? (
        trainer.reviews.map((review, index) => (
          <View key={index} style={styles.review}>
            <Image
              source={review.user_profile_image ? { uri: review.user_profile_image } : require('../../../assets/perfil.png')}
              style={styles.reviewImage}
            />
            <View style={styles.reviewContent}>
              <Text style={styles.reviewName}>{review.user_name || 'Usuário Anônimo'}</Text>
              <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noReviewsText}>Nenhuma avaliação disponível ainda.</Text>
      )}


      <Text style={styles.sectionTitle}>
        Quero <Text style={styles.highlight}>contratar!</Text>
      </Text>
      <Text style={styles.sectionSubtitle}>Selecione a opção desejada:</Text>
      <View style={styles.optionContainer}>
        {options.map(({ text, colors, option }) => (
          <TouchableOpacity key={option} onPress={() => handleOptionPress(option)}>
            <LinearGradient
              colors={selectedOption === option || selectedOption === null ? colors : ['#d3d3d3', '#d3d3d3']}
              style={styles.option}
            >
              <Text style={styles.optionText}>{text}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.hireButton, { backgroundColor: selectedOption && trainer && !loadingTrainer ? '#0d47a1' : '#d3d3d3' }]}
        disabled={!selectedOption || !trainer || loadingTrainer}
        onPress={handleHirePress}
      >
        <Text style={styles.hireButtonText}>Quero contratar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  errorText: { // Novo estilo para texto de erro
    fontSize: 18,
    color: '#ff1744',
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButton: { // Novo estilo para botão de voltar
    backgroundColor: '#ff1744',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  goBackButtonText: { // Novo estilo para texto do botão de voltar
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
  },
  backButton: {
    // Ajustado para manter o ícone de volta visível
    position: 'absolute', // Posiciona absolutamente
    left: 0, // No lado esquerdo do contêiner do cabeçalho
    zIndex: 1, // Garante que esteja acima de outros elementos se houver sobreposição
    padding: 10, // Área de toque
    marginBottom: 20
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    textAlign: 'center', // Centraliza o endereço
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  hireButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  hireButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  grafismoImageStyle: {
    width: 30,
    height: 80,
    marginLeft: -15,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviews: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    color: '#0d47a1',
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },
  highlight: {
    color: '#00BFFF',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    lineHeight: 20,
  },
  galleryScrollView: { // Novo estilo para o ScrollView horizontal da galeria
    marginBottom: 20,
  },
  photo: {
    width: 250, // Ajustado para que várias fotos caibam na horizontal
    height: 180,
    borderRadius: 10,
    marginRight: 10, // Espaçamento entre as fotos
    backgroundColor: '#e0e0e0',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
  },
  review: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  reviewImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 5,
  },
  reviewContent: {
    flex: 1,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 18,
  },
  noReviewsText: { // Novo estilo
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  option: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: Platform.OS === 'ios' ? 40 : 20,
  marginBottom: 20,
},

headerSide: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
},

headerCenter: {
  flex: 3,
  alignItems: 'center',
  justifyContent: 'center',
},

address: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingHorizontal: 10,
},

icon: {
  marginLeft: 15,
},

});

export default PerfilAdestrador;