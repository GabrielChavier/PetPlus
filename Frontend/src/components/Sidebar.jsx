// Importa as bibliotecas necessárias do React e do React Router
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Componente funcional Sidebar
function Sidebar({ updateAuthStatus }) {
  // Hook de navegação para redirecionar o usuário programaticamente
  const navigate = useNavigate();

  // Obtém o papel (nível de acesso) do usuário atual do sessionStorage
  // Ex: 'usuario', 'instituto', 'desenvolvedor', 'admin'
  const role = sessionStorage.getItem('role');

  // Função chamada quando o usuário clica no botão de logout
  const handleLogout = () => {
    // Remove a autenticação e o papel do usuário da sessão
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('role');

    // Se o App estiver controlando autenticação via estado, atualiza para "deslogado"
    if (updateAuthStatus) updateAuthStatus(false);

    // Redireciona o usuário para a tela de login
    navigate('/login');
  };

  // JSX que representa a sidebar na interface
  return (
    // Container da sidebar com largura fixa, cor de fundo azul escuro, texto branco e preenchimento interno
    <div className="w-64 bg-blue-700 text-white p-4 min-h-screen">
      
      {/* Título da barra lateral */}
      <h2 className="text-xl font-bold mb-4">PetPlus</h2>

      {/* Navegação com espaçamento vertical entre os links */}
      <nav className="space-y-2">
        {/* Link para a dashboard (visível para todos os usuários) */}
        <Link to="/" className="block hover:bg-blue-600 p-2 rounded">Dashboard</Link>

        {/* Link para a página de pets (visível para todos os usuários) */}
        <Link to="/pets" className="block hover:bg-blue-600 p-2 rounded">Pets</Link>

        {/* Link para a página de vacinas (visível para todos os usuários) */}
        <Link to="/vaccines" className="block hover:bg-blue-600 p-2 rounded">Vacinas</Link>

        {/* Link visível apenas para usuários com papel 'admin' ou 'desenvolvedor' */}
        {(role === 'admin' || role === 'desenvolvedor') && (
          <Link to="/users" className="block hover:bg-blue-600 p-2 rounded">Usuários</Link>
        )}
      </nav>

      {/* Botão de logout, posicionado ao final da sidebar */}
      <button
        onClick={handleLogout} // Executa o logout ao clicar
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

// Exporta o componente para uso em outros arquivos (ex: App.jsx)
export default Sidebar;
