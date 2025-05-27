import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EsqueciSenha.css';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setMensagem('Por favor, informe seu e-mail.');
      return;
    }

    // ✅ Envia requisição real ao backend
    fetch(`${API_BASE}/esqueci-senha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao enviar solicitação');
        return res.json();
      })
      .then(data => {
        setMensagem(data.mensagem || 'Uma nova senha foi enviada. Verifique seu e-mail.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch(err => {
        console.error(err);
        setMensagem('Erro ao processar solicitação. Verifique o e-mail e tente novamente.');
      });
  }

  return (
    <div className="recuperacao-container">
      <h2>Recuperar senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Enviar nova senha</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
