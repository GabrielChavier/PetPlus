import './Cadastro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import pets from '../assets/Pet_Cadastro.png';

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

  function handleSubmit(event) {
    event.preventDefault();

    // Validação simples para garantir que todos os campos estejam preenchidos
    if (!nome || !email || !cidade || !estado || !cep || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Monta um objeto com os dados do usuário
    const usuario = {
      nome,
      email,
      cidade,
      estado,
      cep,
      senha,
    };

    // Salva os dados no localStorage (você pode usar sessão, contexto ou outro meio)
    localStorage.setItem('usuario', JSON.stringify(usuario));

    setError('');
    alert('Cadastro realizado com sucesso!');

    // Volta para tela de login
    navigate('/login');
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
              required
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className="row">
              <input
                type="text"
                placeholder="cidade"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="estado"
                value={estado}
                onChange={e => setEstado(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="cep"
              value={cep}
              onChange={e => setCep(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />

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
