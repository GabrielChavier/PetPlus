import './FormPet.css';
import logo from '../assets/logo.png';

export default function CadastroPetAdocao() {
  return (
    <div className="form-page">
      <header className="navbar">
        <img src={logo} alt="PetPlus" className="logo" />
        <nav className="nav-links">
          <a href="#">Início</a>
          <a href="#">Cadastrar um Pet</a>
          <a href="#">Adote um Pet</a>
          <a href="#">Carteira de Vacinação</a>
        </nav>
      </header>

      <main className="form-content">
        <div className="form-box">
          <h2>cadastre seu pet para adoção</h2>
          <form>
            <input type="text" placeholder="nome do pet" />
            <div className="row">
              <input type="text" placeholder="especie" />
              <input type="text" placeholder="raça" />
            </div>
            <div className="row">
              <input type="text" placeholder="sexo" />
              <input type="text" placeholder="idade" />
            </div>
            <input type="text" placeholder="telefone" />
            <input type="text" placeholder="local" />
            <div className="row">
              <textarea placeholder="biografia"></textarea>
              <button type="button" className="upload-btn">📷</button>
            </div>
            <div className="btn-area">
              <button type="button" className="btn cancel">cancelar</button>
              <button type="submit" className="btn">cadastrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
