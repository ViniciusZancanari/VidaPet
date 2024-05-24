import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import VerificarEmail from './src/page/VerificarEmail';
import AgendamentoAula10 from './src/page/AgendamentoAula10';
import AgendamentoAula8 from './src/page/AgendamentoAula8';
import AgendamentoAula7 from './src/page/AgendamentoAula7';
import AgendamentoAula6 from './src/page/AgendamentoAula6';
import AgendamentoAula9 from './src/page/AgendamentoAula9';
import AgendamentoAula1 from './src/page/AgendamentoAula1';
import AgendamentoAula4 from './src/page/AgendamentoAula4';

export default function App() {
  return (
      <AgendamentoAula4/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
