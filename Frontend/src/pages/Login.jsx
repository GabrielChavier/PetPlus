import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpeg';
import pets from '../assets/Pet_LandingPage.png';
import React, { useState } from "react";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!usuario || !senha) {
      alert("Preencha usuário e senha!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: usuario, senha }) // ajuste se seu backend usa outros nomes
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      // Armazena o token e redireciona
      localStorage.setItem("token", data.token);
      setMensagem("Login realizado com sucesso!");

      setTimeout(() => {
        navigate('/meupet');
      }, 2000);

    } catch (err) {
      console.error(err);
      setMensagem("Erro: " + err.message);
    }
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
