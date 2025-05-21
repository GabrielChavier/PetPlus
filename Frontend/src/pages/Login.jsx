import "./Login.css";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpeg';
import pets from '../assets/Pet_LandingPage.png';
import React from "react";


function Login() {
  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="logo-area">
          <img src={logo} alt="Logo PetPlus" className="logo" />
        </div>
        <ul className="nav-links">
          <li>Meu Pet</li>
          <li>Cadastrar um Pet</li>
          <li>Adote um Pet</li>
          <li>Carteira de Vacinação</li>
        </ul>
      </nav>

      <div className="login-box">
        <h2>Bem-vindo</h2>
        <input type="text" placeholder="usuário" />
        <input type="password" placeholder="senha" />
        <div className="options">
          <label>
            <input type="checkbox" /> lembrar de mim
          </label>
          <a href="#">esqueci minha senha</a>
        </div>
        <button className="login-button">entrar</button>
        <p className="signup">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
        </p>
      </div>

      <div className="pets-image">
        <img src="/dog-cat.png" alt="dog and cat" />
      </div>
    </div>
  );
}

export default Login;
