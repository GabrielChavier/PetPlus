// Importa os hooks do React
import React, { useState, useEffect } from 'react';

// Importa o hook useAuth do contexto de autenticação
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  // Usando o contexto de autenticação para obter os dados do usuário
  const { user: contextUser } = useAuth();

  // Define o estado 'user' para armazenar os dados do usuário logado
  const [user, setUser] = useState(null);

  // useEffect executa o efeito colateral para buscar os dados do usuário
  useEffect(() => {
    // Tenta obter o usuário do contexto de autenticação
    if (contextUser) {
      setUser(contextUser); // Caso o usuário esteja no contexto, atualiza o estado
    } else {
      // Se não houver usuário no contexto, tenta pegar do localStorage
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      if (loggedUser) {
        setUser(loggedUser); // Se o usuário estiver no localStorage, atualiza o estado
      }
    }
  }, [contextUser]); // O efeito depende do 'contextUser' para ser executado quando o contexto mudar

  // Caso não haja um usuário autenticado, exibe mensagem pedindo para fazer login
  if (!user) {
    return <div>Por favor, faça login para acessar o painel.</div>;
  }

  // Se o usuário estiver logado, exibe o painel de controle com o nome do usuário
  return (
    <div>
      <h2>Bem-vindo, {user.name}!</h2> {/* Exibe o nome do usuário */}
      <p>Esse é o seu painel de controle.</p> {/* Mensagem complementar */}
    </div>
  );
};

export default Dashboard;
