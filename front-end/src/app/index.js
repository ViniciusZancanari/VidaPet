import { Link } from "expo-router";
import Home from "./page/Home";
import Login from "./page/Login";
import Notifcacao_AulaCancelada from "./page/Notifcacao_AulaCancelada";
import Notificacao2 from "./page/Notificacao2";
import { AgendamentoProvider } from './context/AgendamentoContext';
import Notificacao_AvaliacaoAulaNPS from "./page/Notificacao_AvaliacaoAulaNPS";
import Notificacao_AvaliacaoAula_RelatarProblemas from "./page/Notificacao_AvaliacaoAula_RelatarProblemas.js";
import Termo_Cancelamento from "./page/Termo_Cancelamento.js";
import Agenda from "./page/Agenda.js";
import Notificacao from "./page/Notificacao.js";
import Reagendar from "./page/Reagendar.js";
import DadosUsuario from "./page/DadosUsuario.js";


export default function App() {
  return (
    <AgendamentoProvider>
      <Notificacao_AvaliacaoAulaNPS/>
    </AgendamentoProvider>
  );
}
