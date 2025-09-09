import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native'; // Removido Alert se não for usado, ActivityIndicator pode ser removido se não tiver estado de loading aqui.
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Importar useRouter
import axios from 'axios';

const AgendamentoAula4 = () => {
  const [trainer, setTrainer] = useState(null);
  const [loadingTrainer, setLoadingTrainer] = useState(true); // Estado de loading para o treinador
  const router = useRouter(); // Instanciar o router
  const { trainer_id, selectedDate, selectedTime } = useLocalSearchParams();

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const [year, month, day] = dateString.split('-');
    // Mostra apenas os dois últimos dígitos do ano
    return `${day}/${month}/${year.slice(2)}`; 
  };

  const formatTime = (timeString) => {
    if (!timeString) return '---';
    return `${timeString.split(':')[0]}h`;
  };

  useEffect(() => {
    let isActive = true;
    if (trainer_id) {
      setLoadingTrainer(true);
      axios.get(`https://apipet.com.br/trainer/${trainer_id}`)
        .then(response => {
          if (isActive) {
            setTrainer(response.data);
            setLoadingTrainer(false);
          }
        })
        .catch(error => {
          if (isActive) {
            console.error('Erro ao buscar o treinador:', error);
            setLoadingTrainer(false);
          }
        });
    } else {
      setLoadingTrainer(false); // Não há trainer_id para buscar
    }
    return () => {
      isActive = false;
    };
  }, [trainer_id]);

  // Funções de navegação
  const navigateToPerfilAdestrador = () => {
    router.push('/page/Home');
  };

  const navigateToEnderecoCadastrado = () => {
    router.push({
      pathname: '/page/Endereco',
      params: { 
        trainer_id, // trainer_id de useLocalSearchParams já é string
        selectedDate,
        selectedTime 
      }
    });
  };

  const navigateToMarcarLocal = () => {
    router.push({
      pathname: '/page/AgendamentoAula5',
      params: { 
        trainer_id,
        selectedDate,
        selectedTime 
      }
    });
  };

  const navigateToVoltar = () => {
    router.push({
      pathname: '/page/AgendamentoAula3',
      params: { 
        trainer_id,
        selectedDate 
      }
    });
  };

  return (
    <LinearGradient colors={['#E83378', '#F47920']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToPerfilAdestrador}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredContent}>
        <Text style={styles.dateText}>
          Você selecionou o dia <Text style={styles.highlightText}>
            {formatDate(selectedDate)} às {formatTime(selectedTime)}
          </Text>
        </Text>

        <View style={styles.trainerContainer}>
          <View style={styles.imageContainer}>
            {/* Supondo que a imagem do trainer venha do objeto trainer ou um placeholder */}
            <Image 
              source={trainer && trainer.profileImageUrl ? { uri: trainer.profileImageUrl } : require('../../../assets/perfil.png')} 
              style={styles.profileImage} 
            />
            <Image source={require('../../../assets/grafismo.png')} style={styles.decorImage} />
          </View>
          {loadingTrainer ? (
            <ActivityIndicator size="small" color="#FFF" style={{marginTop: 10}} />
          ) : (
            <Text style={styles.trainerName}>{trainer ? trainer.username : 'Treinador não encontrado'}</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Local de encontro:</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={navigateToEnderecoCadastrado}>
            <Text style={styles.optionButtonText}>
              Utilizar o endereço cadastrado
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.orText}>ou</Text>

          <TouchableOpacity style={styles.optionButton} onPress={navigateToMarcarLocal}>
            <Text style={styles.optionButtonText}>
              Marcar local de encontro
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        <TouchableOpacity style={styles.backButton} onPress={navigateToVoltar}>
          <Text style={styles.backButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Este backgroundColor é sobreposto pelo LinearGradient
    width: '100%',
  },
  header: {
    position: 'absolute',
    top: 40, // Considere usar Platform.OS para ajuste iOS/Android se necessário
    right: 20,
    zIndex: 1, // Para garantir que fique sobre outros elementos se houver sobreposição
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30, // Adicionado padding horizontal consistente
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightText: {
    color: '#FFD700', // Cor de destaque (amarelo)
    fontWeight: 'bold',
  },
  trainerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Para alinhar grafismo com a imagem de perfil
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // Adicione um backgroundColor para o caso da imagem não carregar ou ser transparente
    backgroundColor: '#ccc', 
  },
  decorImage: { // Imagem de grafismo
    width: 30,
    height: 80, // Altura igual à da imagem de perfil para alinhar
    marginLeft: -10, // Sobreposição sutil para efeito de design
  },
  trainerName: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%', // Para os botões ocuparem a largura definida pelo padding do parent
    alignItems: 'center', // Para centralizar o texto "ou" se ele não ocupar 100%
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#191970', // Azul escuro (cor do botão)
    paddingVertical: 15,
    paddingHorizontal: 20, // Padding interno do botão
    borderRadius: 30,    // Bordas arredondadas
    marginBottom: 15,    // Espaço abaixo de cada botão
    width: '100%',       // Botão ocupa toda a largura disponível
    alignItems: 'center',  // Centraliza o texto do botão
    borderWidth: 2,
    borderColor: '#4169E1', // Cor da borda (azul royal)
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#FFF',
    fontSize: 16,
    marginVertical: 10, // Espaço acima e abaixo do "ou"
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFA07A', // Cor do separador (salmão claro)
    width: '100%', // Separador ocupa toda a largura
    marginVertical: 25, // Espaço vertical ao redor do separador
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    backgroundColor: 'transparent', // Fundo transparente
    borderWidth: 1,
    borderColor: '#fff', // Borda branca
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendamentoAula4;