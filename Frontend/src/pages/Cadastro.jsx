import './Cadastro.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import pets from '../assets/Pet_Cadastro.png'; 

export default function Cadastro() {
  return (
    <div className="cadastro-container">
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

      <main className="cadastro-content">
        <div className="image-area">
          <img src={pets} alt="pets" className="pets-img" />
        </div>

        <div className="form-card">
          <h2>cadastre-se</h2>
          <form>
            <input type="text" placeholder="nome" />
            <input type="email" placeholder="email" />
            <div className="row">
              <input type="text" placeholder="cidade" />
              <input type="text" placeholder="estado" />
            </div>
            <input type="text" placeholder="cep" />
            <input type="password" placeholder="senha" />
            <input type="password" placeholder="confirmar senha" />
            <div className="btn-area">
              <button type="button" className="btn cancel">cancelar</button>
              <button type="submit" className="btn">entrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
