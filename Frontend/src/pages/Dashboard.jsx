import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [resumo, setResumo] = useState({
    totalUsuarios: 0,
    totalPets: 0,
    totalVacinas: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE}/dashboard`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar dados do dashboard');
        return res.json();
      })
      .then(data => {
        setResumo(data);
      })
      .catch(err => {
        console.error(err);
        alert('Não foi possível carregar os dados do dashboard.');
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Dashboard</h1>
      <div style={{ marginTop: '2rem' }}>
        <p><strong>Total de Usuários:</strong> {resumo.totalUsuarios}</p>
        <p><strong>Total de Pets:</strong> {resumo.totalPets}</p>
        <p><strong>Total de Vacinas:</strong> {resumo.totalVacinas}</p>
      </div>
    </div>
  );
}
