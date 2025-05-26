import React from 'react';
import { useParams } from 'react-router-dom';

const PetDetalhes = () => {
  const { id } = useParams();

  // Aqui você pode fazer requisição para buscar dados do pet pelo id,
  // ou usar estado global / contexto

  return (
    <div>
      <h1>Detalhes do Pet</h1>
      <p>ID do Pet: {id}</p>
      {/* Renderize os detalhes do pet aqui */}
    </div>
  );
};

export default PetDetalhes;
