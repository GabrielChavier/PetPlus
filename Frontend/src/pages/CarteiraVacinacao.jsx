import './all.css';
import logo from '../assets/logo.jpeg';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CarteiraVacinacao() {
  return (
    <div className="carteira-container">
      <header className="navbar">
        <div className="logo-area">
          <img src={logo} alt="Logo PetPlus" className="logo" />
        </div>
        <nav className="nav-links">
        <Link to="/meupet">Meu Pet</Link>
        <Link to="/cadastro-pet">Cadastrar um Pet</Link>
        <Link to="/adote-um-pet">Adote um Pet</Link>
        <Link to="/carteira-vacinacao">Carteira de Vacinação</Link>
        </nav>
      </header>

      <main className="carteira-content">
        <div className="card-vacina">
          <h3>vacinação:</h3>
          {[1, 2, 3].map((_, idx) => (
            <div className="linha" key={`vacina-${idx}`}>
              <input type="date" placeholder="data" />
              <input type="date" placeholder="revacina" />
              <input type="text" placeholder="tipo" />
              <input type="text" placeholder="veterinário" />
              <input type="text" placeholder="clínica vet" />
              <button className="btn-add"><FaPlusCircle /></button>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}
