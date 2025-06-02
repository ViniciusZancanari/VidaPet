import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import axios from 'axios';

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
    setLoadingTrainer(true);
    axios.get(`https://apipet.com.br/trainer/8f8e294a-518d-46b7-80e1-e2221b2492eb`)
      .then(response => {
        if (isActive) {
          setTrainer(response.data);
          setLoadingTrainer(false);
        }
      })
      .catch(error => {
        if (isActive) {
          console.warn('--- DETALHES DO ERRO AXIOS AO BUSCAR TREINADOR ---');
          if (error.response) {
            // A requisição foi feita e o servidor respondeu com um status code fora do range de 2xx
            console.warn("Dados da Resposta do Erro:", JSON.stringify(error.response.data, null, 2));
            console.warn("Status da Resposta do Erro:", error.response.status);
            console.warn("Cabeçalhos da Resposta do Erro:", JSON.stringify(error.response.headers, null, 2));
          } else if (error.request) {
            // A requisição foi feita mas nenhuma resposta foi recebida
            console.warn("Erro na Requisição (sem resposta):", error.request);
          } else {
            // Algo aconteceu na configuração da requisição que acionou um Erro
            console.warn('Mensagem de Erro Geral:', error.message);
          }
          // Log do objeto de erro completo pode ser útil, mas pode ser grande
          // console.warn("Objeto de Erro Completo:", error);
          console.warn('--- FIM DETALHES DO ERRO AXIOS ---');
          
          setLoadingTrainer(false);
          Alert.alert(
            "Erro ao Carregar", 
            "Não foi possível buscar os dados do treinador. Verifique sua conexão ou tente mais tarde."
          );
        }
      });
    
    return () => {
      isActive = false;
    };
  }, []);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
          {trainer ? trainer.address : 'Carregando endereço...'}
        </Text>
        <View style={styles.headerIcons}>
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
        <Text style={styles.name}>{trainer ? trainer.username : 'Carregando nome...'}</Text>
        <Text style={styles.reviews}>2 avaliações</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={styles.location}>
            {trainer ? `${trainer.city || 'Cidade não informada'}, ${trainer.state_initials || 'UF'}` : 'Carregando localização...'}
          </Text>
        </View>
        <Text style={styles.price}>
          {trainer && trainer.hourly_rate ? `R$${parseFloat(trainer.hourly_rate).toFixed(2).replace('.',',')}/hora` : 'Carregando preço...'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Sobre o <Text style={styles.highlight}>profissional:</Text>
      </Text>
      <Text style={styles.description}>
        {trainer ? trainer.professional_description : 'Carregando descrição...'}
      </Text>

      <Text style={styles.sectionTitle}>
        Confira algumas <Text style={styles.highlight}>fotos:</Text>
      </Text>
      <Image source={require('../../../assets/galeria1.png')} style={styles.photo} />

      <Text style={styles.sectionTitle}>
        Assista ao <Text style={styles.highlight}>vídeo:</Text>
      </Text>
      <Image source={require('../../../assets/galeria2.png')} style={styles.video} />

      <Text style={styles.sectionTitle}>
        Avaliações de <Text style={styles.highlight}>usuários:</Text>
      </Text>
      <View style={styles.review}>
        <Image source={require('../../../assets/perfil.png')} style={styles.reviewImage} />
        <View style={styles.reviewContent}>
          <Text style={styles.reviewName}>Fernanda Lopes</Text>
          <Text style={styles.reviewDate}>02/04/2024</Text>
          <Text style={styles.reviewText}>Cum earum modi ea autem aliquam ut dolor voluptates.</Text>
        </View>
      </View>
      <View style={styles.review}>
        <Image source={require('../../../assets/perfil.png')} style={styles.reviewImage} />
        <View style={styles.reviewContent}>
          <Text style={styles.reviewName}>Tiago Santiago</Text>
          <Text style={styles.reviewDate}>02/04/2024</Text>
          <Text style={styles.reviewText}>Cum earum modi ea autem aliquam ut dolor voluptates.</Text>
        </View>
      </View>

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
    paddingHorizontal: 20, // Adicionado paddingHorizontal
    paddingBottom: 40, // Adicionado paddingBottom para mais espaço no final
  },
  loadingView: { 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0, // Remover padding vertical se for tela cheia de loading
  },
  loadingText: { // Estilo para o texto de loading
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20, // Espaço do topo
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // Permite que o endereço ocupe espaço disponível
    marginRight: 10, // Espaço antes dos ícones
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
    marginTop: 20, // Ajustado marginTop
    marginBottom: 20, // Adicionado marginBottom
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
  profileImageStyle: { // Estilo específico para a imagem de perfil do adestrador
    width: 80, 
    height: 80, 
    borderRadius: 40,
    backgroundColor: '#e0e0e0', // Placeholder visual
  },
  grafismoImageStyle: { // Estilo específico para a imagem de grafismo
    width: 30, // Exemplo
    height: 80, // Exemplo
    marginLeft: -15, // Exemplo de sobreposição ou ajuste
    // Adicione outros estilos se necessário
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30, // Aumentado
  },
  name: {
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  reviews: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8, // Aumentado
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Aumentado
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
    marginTop: 25, // Aumentado
    marginBottom: 15, // Aumentado
  },
  highlight: {
    color: '#00BFFF',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20, // Aumentado
    lineHeight: 20, 
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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
    marginBottom: 15, // Aumentado
    textAlign: 'center', 
  },
});

export default PerfilAdestrador;