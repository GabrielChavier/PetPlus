import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './PetDetalhes.css'; // <-- Importa o CSS

const PetDetalhes = () => {
  const { id } = useParams();

  return (
    <div className="pet-detalhes-container">
      <h1>Detalhes do Pet</h1>
      <p className="pet-id">ID do Pet: <span>{id}</span></p>

      {/* Aqui você pode renderizar mais detalhes futuramente */}
      <div className="pet-info">
        <p><strong>Nome:</strong> Fofinho</p>
        <p><strong>Raça:</strong> Poodle</p>
        <p><strong>Idade:</strong> 2 anos</p>
      </div>
    </div>
  );
};

export default PetDetalhes;
