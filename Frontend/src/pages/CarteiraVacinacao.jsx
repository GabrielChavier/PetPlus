import './CarteiraVacinacao.css';
import logo from '../assets/logo.jpeg';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CarteiraVacinacao() {
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState({
    data: '',
    revacina: '',
    tipo: '',
    veterinario: '',
    clinica: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaVacina((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const adicionarVacina = () => {
    if (novaVacina.data && novaVacina.tipo) {
      setVacinas([...vacinas, novaVacina]);
      setNovaVacina({
        data: '',
        revacina: '',
        tipo: '',
        veterinario: '',
        clinica: '',
      });
    } else {
      alert("Preencha pelo menos a data e o tipo da vacina.");
    }
  };

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
          <div className="linha">
            <input
              type="date"
              name="data"
              value={novaVacina.data}
              onChange={handleChange}
            />
            <input
              type="date"
              name="revacina"
              value={novaVacina.revacina}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tipo"
              placeholder="tipo"
              value={novaVacina.tipo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="veterinario"
              placeholder="veterinário"
              value={novaVacina.veterinario}
              onChange={handleChange}
            />
            <input
              type="text"
              name="clinica"
              placeholder="clínica vet"
              value={novaVacina.clinica}
              onChange={handleChange}
            />
            <button className="btn-add" type="button" onClick={adicionarVacina}>
              <FaPlusCircle />
            </button>
          </div>

          {/* Lista de vacinas adicionadas */}
          <div className="lista-vacinas">
            {vacinas.map((vacina, idx) => (
              <div key={idx} className="linha-vacina">
                <p><strong>Data:</strong> {vacina.data}</p>
                <p><strong>Revacina:</strong> {vacina.revacina}</p>
                <p><strong>Tipo:</strong> {vacina.tipo}</p>
                <p><strong>Veterinário:</strong> {vacina.veterinario}</p>
                <p><strong>Clínica:</strong> {vacina.clinica}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
