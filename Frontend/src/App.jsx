// Importa o React para poder usar JSX e criar componentes
import React from 'react';

// Importa os componentes de roteamento do React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa o container de notificações da biblioteca react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos padrão para as notificações

// Importa os componentes fixos do layout principal
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Importa a página de login (não deve exibir layout principal)
import Login from './components/Login';

// Importa as páginas que compõem o conteúdo principal do sistema
import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Vaccines from './pages/Vaccines';
import Users from './pages/Users';

// Importa o AuthProvider para gerenciar o contexto de autenticação
import { AuthProvider } from './context/AuthContext';

// Componente principal da aplicação
function App() {
  return (
    // AuthProvider fornece o contexto de autenticação para toda a aplicação
    <AuthProvider>
      <Router>
        {/* ToastContainer permite exibir notificações "toast" em qualquer parte da aplicação */}
        <ToastContainer />

        {/* Define as rotas da aplicação */}
        <Routes>

          {/* Rota para a página de login - não inclui layout (Header/Sidebar) */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas que usam o layout com Sidebar + Header */}
          <Route
            path="/*" // Captura todas as outras rotas exceto "/login"
            element={
              <div className="flex h-screen">
                {/* Barra lateral exibida em todas as rotas autenticadas */}
                <Sidebar />

                {/* Conteúdo principal à direita */}
                <div className="flex flex-col flex-1">
                  {/* Cabeçalho fixo no topo */}
                  <Header />

                  {/* Área de conteúdo com padding e rolagem vertical */}
                  <main className="p-4 overflow-y-auto">
                    <Routes>
                      {/* Página inicial do painel */}
                      <Route path="/" element={<Dashboard />} />

                      {/* Página de pets */}
                      <Route path="/pets" element={<Pets />} />

                      {/* Página de vacinas */}
                      <Route path="/vaccines" element={<Vaccines />} />

                      {/* Página de usuários */}
                      <Route path="/users" element={<Users />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Exporta o componente App para ser utilizado no index.js
export default App;
