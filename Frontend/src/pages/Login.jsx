import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import pets from '../assets/Pet_LandingPage.png';
import React, { useState } from "react";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // Removeu a validação de usuário e senha
    // Removeu qualquer chamada real ou simulação de autenticação
    
    setMensagem("Login realizado!"); // Mensagem genérica, sem validação

    setTimeout(() => {
      navigate('/meupet');
    }, 1000);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bem-vindo</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="usuário"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          <div className="options">
            <label>
              <input type="checkbox" /> lembrar de mim
            </label>
            <Link to="/esqueci-senha">esqueci minha senha</Link>
          </div>

          <button type="submit" className="login-button">entrar</button>
        </form>

        {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

        <p className="signup">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
        </p>
      </div>

      <div className="pets-image">
        <img src={pets} alt="dog and cat" />
      </div>
    </div>
  );
}

export default Login;
