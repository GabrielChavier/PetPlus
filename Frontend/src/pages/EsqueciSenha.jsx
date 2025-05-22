import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './all.css';

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
    // Simula o envio de nova senha por email
    setMensagem(`Uma nova senha foi enviada para ${email}. Verifique seu e-mail.`);
    
    // Opcional: redirecionar para login depois de um tempo
    setTimeout(() => {
      navigate('/login');
    }, 3000);
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
