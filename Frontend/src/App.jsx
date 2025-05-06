// Importa o React para utilizar JSX e criar componentes
import React from 'react';

// Importa componentes do React Router para navegação entre páginas
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importa o componente da barra lateral que será exibida em todas as páginas
import Sidebar from './components/Sidebar';

// Importa o cabeçalho que também será exibido em todas as páginas
import Header from './components/Header';

// Importa as páginas que serão acessadas via rotas
import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Vaccines from './pages/Vaccines';
import Users from './pages/Users';

// Componente principal da aplicação
function App() {
  return (
    // Envolve toda a aplicação com o Router, permitindo o uso de rotas
    <Router>
      {/* Layout principal da aplicação usando Flexbox */}
      <div className="flex h-screen">
        {/* Componente da barra lateral fixa à esquerda */}
        <Sidebar />

        {/* Área da direita (conteúdo principal), ocupa todo o espaço restante */}
        <div className="flex flex-col flex-1">
          {/* Componente do cabeçalho (exibido no topo da área principal) */}
          <Header />

          {/* Conteúdo principal da página. Possui padding e rolagem vertical */}
          <main className="p-4 overflow-y-auto">
            {/* Define as rotas da aplicação. Cada rota renderiza um componente específico */}
            <Routes>
              {/* Rota para a página inicial, renderiza o Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Rota para a página de pets */}
              <Route path="/pets" element={<Pets />} />

              {/* Rota para a página de vacinas */}
              <Route path="/vaccines" element={<Vaccines />} />

              {/* Rota para a página de usuários */}
              <Route path="/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

// Exporta o componente App para ser usado no index.js (ponto de entrada da aplicação)
export default App;
