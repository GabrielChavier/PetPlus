// Importa os componentes necessários do React Router DOM:
// - Routes: componente que agrupa todas as rotas da aplicação
// - Route: define uma rota individual, associando um caminho (path) a um componente React
import { Routes, Route } from 'react-router-dom';

// Importa os componentes de página que serão exibidos nas rotas correspondentes
import Login from '../pages/Login';       // Página de login
import Cadastro from '../pages/Cadastro'; // Página de cadastro
import Dashboard from '../pages/Dashboard'; // Página principal após login

// Define e exporta o componente AppRoutes, que contém a definição das rotas da aplicação
export default function AppRoutes() {
  return (
    // Routes encapsula todas as rotas e permite que o React Router faça a renderização condicional
    <Routes>
      {/* 
        Cada Route mapeia uma URL para um componente:
        - path="/" indica a rota raiz, que renderiza o componente <Login />
      */}
      <Route path="/" element={<Login />} />

      {/* Rota para a página de cadastro, exibida em /cadastro */}
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rota para a página de dashboard, exibida em /dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
