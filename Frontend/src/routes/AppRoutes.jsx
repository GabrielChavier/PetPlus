// Importa os componentes Routes e Route da biblioteca react-router-dom
// Routes: contêiner que agrupa todas as rotas da aplicação
// Route: define uma rota individual, associando uma URL a um componente React
import { Routes, Route } from 'react-router-dom';

// Importa os componentes das páginas que serão exibidas em cada rota
import LandingPage from '../pages/LandingPage';       // Página inicial (landing page)
import Login from '../pages/Login';                   // Página de login do usuário
import Cadastro from '../pages/Cadastro';             // Página para cadastro de novos usuários
import Dashboard from '../pages/Dashboard';           // Página principal após o login (dashboard)
import EsqueciSenha from '../pages/EsqueciSenha';     // Página para recuperação de senha
import Meupet from '../pages/Meupet';                 // Página que lista os pets do usuário
import CadastroPet from '../pages/CadastroPet';       // Página para cadastro de um novo pet
import CadastroPetAdocao from '../pages/CadastroPetAdocao'; // Página para cadastro de pet para adoção
import CadastroVacina from '../pages/CadastroVacina'; // Página para cadastro de vacinas dos pets
import CarteiraVacinacao from '../pages/CarteiraVacinacao'; // Página que mostra a carteira de vacinação do pet

// Define e exporta o componente funcional AppRoutes
// Esse componente é responsável por configurar as rotas da aplicação React
export default function AppRoutes() {
  return (
    // Componente Routes é o contêiner que agrupa todas as rotas definidas abaixo
    <Routes>
      {/* 
        Define uma rota para a URL raiz "/"
        Quando o usuário acessar "/", o componente LandingPage será renderizado
      */}
      <Route path="/" element={<LandingPage />} />

      {/* Rota para listar os pets do usuário */}
      <Route path="/meupet" element={<Meupet />} />

      {/* Rota para a página de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota para a página de cadastro de novos usuários */}
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rota para a página dashboard, acessível após o login */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Rota para recuperação de senha */}
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />

      {/* Rota para cadastro de novo pet */}
      <Route path="/cadastro-pet" element={<CadastroPet />} />

      {/* Rota para cadastro de pet para adoção */}
      <Route path="/cadastro-pet-adocao" element={<CadastroPetAdocao />} />

      {/* Rota para cadastro de vacina */}
      <Route path="/cadastro-de-vacina" element={<CadastroVacina />} />

      {/* Rota para a carteira de vacinação do pet */}
       <Route path="/carteira-vacinacao" element={<CarteiraVacinacao />} />
    </Routes>
  );
}
