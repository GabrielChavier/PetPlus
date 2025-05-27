import React, { useState } from 'react';
import './CadastroVacina.css';
import logo from '../assets/logo.jpeg';

export default function CadastroVacina() {
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [data, setData] = useState('');
  const [revacina, setRevacina] = useState('');
  const [tipo, setTipo] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [clinica, setClinica] = useState('');

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vacinaData = {
      data,
      revacina,
      tipo,
      veterinario,
      clinica,
    };

    try {
      const response = await fetch(`${API_BASE}/vacinas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacinaData),
      });

      if (!response.ok) {
        alert('Erro ao cadastrar vacina.');
        return;
      }

      alert('Vacina cadastrada com sucesso!');
      
      // Limpa os campos após o envio
      setData('');
      setRevacina('');
      setTipo('');
      setVeterinario('');
      setClinica('');

      // Redireciona se quiser
      navigate('/carteira-vacinacao');

    } catch (error) {
      console.error('Erro ao cadastrar vacina:', error);
      alert('Erro de comunicação com o servidor.');
    }
  };

  // Botão cancelar
  const handleCancel = () => {
    navigate('/carteira-vacinacao');
  };

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
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="date"
                placeholder="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
              <input
                type="date"
                placeholder="revacina"
                value={revacina}
                onChange={(e) => setRevacina(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="veterinário"
              value={veterinario}
              onChange={(e) => setVeterinario(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="clínica vet"
              value={clinica}
              onChange={(e) => setClinica(e.target.value)}
              required
            />
            <div className="btn-area">
              <button type="button" className="btn cancel" onClick={handleCancel}>
                cancelar
              </button>
              <button type="submit" className="btn">
                cadastrar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
