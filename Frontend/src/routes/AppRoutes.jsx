// Importa os componentes Routes e Route da biblioteca react-router-dom
// Routes é o contêiner que agrupa todas as rotas da aplicação
// Route define uma rota individual, associando uma URL a um componente React
import { Routes, Route } from 'react-router-dom';

// Importa os componentes de página que serão exibidos nas rotas correspondentes
import LandingPage from '../pages/LandingPage'; // Página inicial (landing page)
import Login from '../pages/Login';             // Página de login
import Cadastro from '../pages/Cadastro';       // Página para cadastro de usuários
import Dashboard from '../pages/Dashboard';     // Página principal após o login
import EsqueciSenha from '../pages/EsqueciSenha'; // Importa a nova página EsqueciSenha
import Meupet from '../pages/Meupet';

// Define e exporta o componente funcional AppRoutes, responsável por configurar as rotas da aplicação
export default function AppRoutes() {
  return (
    // Componente Routes agrupa todas as rotas definidas dentro dele
    <Routes>
      {/* 
        Cada Route mapeia uma URL para um componente React específico:
        - path="/" indica a rota raiz da aplicação
        - element={<LandingPage />} indica que a LandingPage será renderizada quando o usuário acessar "/"
      */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/meupet" element={<Meupet />} />
      {/* Rota para a página de login, acessível pelo caminho "/login" */}
      <Route path="/login" element={<Login />} />

      {/* Rota para a página de cadastro, acessível pelo caminho "/cadastro" */}
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rota para a página dashboard, exibida após o login, acessível em "/dashboard" */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Rota para a página de recuperação de senha */}
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
    </Routes>
  );
}
