import './LandingPage.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import pets from '../assets/Pet_LandingPage.png'; 

export default function LandingPage() {
  return (
    <div className="landing-container">
      <header className="navbar">
        <div className="logo-area">
          <img src={logo} alt="PetPlus Logo" className="logo" />
        </div>
        <nav className="nav-links">
          <a href="#">Início</a>
          <a href="#">Cadastrar um Pet</a>
          <a href="#">Adote um Pet</a>
          <a href="#">Carteira de Vacinação</a>
        </nav>
      </header>

      <main className="landing-content">
        <div className="text-area">
          <h1>PetPlus seu<br />aplicativo completo<br />para cuidar da<br />saúde e bem-estar<br />do seu pet.</h1>
          <div className="button-area">
            <Link to="/login" className="btn">Entrar</Link>
            <Link to="/cadastro" className="btn secondary">cadastre-se</Link>
          </div>
        </div>
        <div className="image-area">
          <img src={pets} alt="Cachorro e Gato" className="pets-img" />
        </div>
      </main>
    </div>
  );
}
