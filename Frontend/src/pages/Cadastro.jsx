import './Cadastro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/logo.jpeg';
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
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Estado para mensagem de erro
  const [error, setError] = useState('');

  // Função para validar formulário no submit
  function handleSubmit(event) {
    event.preventDefault();

    if (!nome || !email || !cidade || !estado || !cep || !senha || !confirmarSenha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não conferem.');
      return;
    }

    setError('');
    alert('Cadastro realizado com sucesso!');
    // Aqui você pode adicionar redirecionamento ou envio do formulário
  }

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
            <input
              type="password"
              placeholder="confirmar senha"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
            />

            {/* Exibe erro se existir */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <div className="btn-area">
              <button
                type="button"
                className="btn cancel"
                onClick={() => navigate('/login')}
              >
                cancelar
              </button>

              <button type="submit" className="btn">entrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
