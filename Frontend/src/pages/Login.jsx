import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import pets from '../assets/Pet_LandingPage.png'; 

export default function Login() {
  return (
    <div className="login-container">
      <header className="navbar">
        <div className="logo-area">
          <img src={logo} alt="Logo PetPlus" className="logo" />
        </div>
        <nav className="nav-links">
          <a href="#">Início</a>
          <a href="#">Cadastrar um Pet</a>
          <a href="#">Adote um Pet</a>
          <a href="#">Carteira de Vacinação</a>
        </nav>
      </header>

      <main className="login-content">
        <div className="form-card">
          <h2>Bem-vindo</h2>
          <form>
            <input type="text" placeholder="usuário" required />
            <input type="password" placeholder="senha" required />
            <div className="options">
              <label>
                <input type="checkbox" /> lembrar de mim
              </label>
              <a href="#">esqueci minha senha</a>
            </div>
            <button type="submit" className="btn-login">entrar</button>
          </form>
          <p className="signup">
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
          </p>
        </div>

        <div className="image-area">
          <img src={pets} alt="pets" className="pets-img" />
        </div>
      </main>
    </div>
  );
}
