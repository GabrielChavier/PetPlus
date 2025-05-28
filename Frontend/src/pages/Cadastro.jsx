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


  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_BASE = "http://localhost:3000/api"; // Defina a URL base da sua API aqui
    const formData = new FormData();
    //http://localhost:3000/auth/register

    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("cidade", cidade);
    formData.append("cep", cep);
    formData.append("senha", senha);

    console.log(nome);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {  // Usando API_BASE aqui
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Erro o usuário.");
        return;
      }

      setCep("");
      setCidade("");
      setEmail("");
      setNome("");
      setSenha("");
      setEstado("");

      setMensagemSucesso("Cadastro realizado com sucesso!");

      setTimeout(() => {
        setMensagemSucesso("");
        navigate("/meupet");
      }, 3000);

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na comunicação com o servidor.");
    }
  };


  

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
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="row">
              <input
                type="text"
                placeholder="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
