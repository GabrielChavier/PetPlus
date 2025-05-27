import './Cadastro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import pets from '../assets/Pet_Cadastro.png';

// URL base da API — ajuste conforme seu backend
const API_BASE = 'http://localhost:3000';

export default function Cadastro() {
  const navigate = useNavigate();

  // Estados para os inputs
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');

  // Estado para mensagem de erro
  const [error, setError] = useState('');

  // Envio direto para o backend sem validações ou confirmação de senha
  function handleSubmit(event) {
    event.preventDefault();

    fetch(`${API_BASE}/pets`, { // Ajuste '/pets' para a rota correta do seu backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        cidade,
        estado,
        cep,
        senha
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Erro ao cadastrar.');
      }
      return res.json();
    })
    .then(data => {
      setError('');
      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // Redireciona para a página de login
    })
    .catch(err => {
      setError(err.message || 'Erro desconhecido.');
    });
  }

  return (
    <div className="cadastro-container">
      <main className="cadastro-content">
        <div className="image-area">
          <img src={pets} alt="pets" className="pets-img" />
        </div>

        <div className="form-card">
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="row">
              <input
                type="text"
                placeholder="cidade"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
              />
              <input
                type="text"
                placeholder="estado"
                value={estado}
                onChange={e => setEstado(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="cep"
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />

            {/* Exibe erro se existir */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <div className="btn-area">
              <button
                type="button"
                className="btn cancel"
                onClick={() => navigate('/login')}
              >
                Cancelar
              </button>

              <button type="submit" className="btn">Cadastrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
