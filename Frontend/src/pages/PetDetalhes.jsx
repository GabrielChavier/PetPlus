import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PetDetalhes.css';

const PetDetalhes = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchPet() {
      try {
        const res = await fetch(`${API_BASE}/pets/${id}`);
        if (!res.ok) {
          throw new Error('Erro ao buscar detalhes do pet');
        }
        const data = await res.json();
        setPet(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPet();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!pet) return <p>Nenhum pet encontrado.</p>;

  return (
    <div className="pet-detalhes-container">
      <h1>Detalhes do Pet</h1>
      <p className="pet-id">ID do Pet: <span>{pet.id}</span></p>

      <div className="pet-info">
        <p><strong>Nome:</strong> {pet.name}</p>
        <p><strong>Raça:</strong> {pet.breed}</p>
        <p><strong>Idade:</strong> {pet.age} anos</p>
        {/* Você pode adicionar mais detalhes aqui, como:
        <p><strong>Descrição:</strong> {pet.description}</p>
        <p><strong>Peso:</strong> {pet.weight} kg</p>
        */}
      </div>
    </div>
  );
};

export default PetDetalhes;
