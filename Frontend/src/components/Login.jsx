import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Componente de Login que recebe uma função para atualizar o status de autenticação no App principal
function Login({ updateAuthStatus }) {
  // Estados para armazenar o nome de usuário e a senha digitados pelo usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook para redirecionar programaticamente

  // Se o usuário já estiver autenticado, redireciona automaticamente para a página /home
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [navigate]);

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)

    try {
      // Envia os dados de login para o backend
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      // Se o backend retornar sucesso
      if (response.data.success) {
        // Armazena os dados de autenticação e perfil do usuário
        sessionStorage.setItem("authenticated", "true");        // Sinaliza que está autenticado
        sessionStorage.setItem("role", response.data.role);     // Salva o papel do usuário (ex: admin)

        // Armazena os dados completos do usuário no localStorage, caso queira usá-los em outras partes do app
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Atualiza o estado de autenticação na aplicação principal (App.js)
        updateAuthStatus(true);

        alert("Login bem-sucedido!");

        // Redireciona o usuário para o Dashboard (/home)
        navigate("/home"); // ou "/dashboard" se for esse o caminho definido
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="login-container">
      {/* Logotipo da aplicação */}
      <img src="/logo-ser.png" alt="Logo" className="logo" />

      <h2>Login</h2>

      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
