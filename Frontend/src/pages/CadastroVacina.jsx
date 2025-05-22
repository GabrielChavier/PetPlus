import './all.css';
import logo from '../assets/logo.jpeg';

export default function CadastroVacina() {
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
          <h2>cadastro de vacina</h2>
          <form>
            <div className="row">
              <input type="date" placeholder="data" />
              <input type="date" placeholder="revacina" />
            </div>
            <input type="text" placeholder="tipo" />
            <input type="text" placeholder="veterinário" />
            <input type="text" placeholder="clínica vet" />
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
