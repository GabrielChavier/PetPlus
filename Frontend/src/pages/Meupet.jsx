// src/pages/Meupet.jsx
import React from 'react';
import './all.css';
import { useNavigate } from 'react-router-dom';

function Meupet() {
  const navigate = useNavigate();

  const handleNavigationClick = (section) => {
    if (section === 'Cadastrar um Pet') {
      navigate('/cadastro-pet');
    } else if (section === 'Meu Pet') {
      navigate('/meupet');
    } else if (section === 'Adote um Pet') {
      navigate('/adote-um-pet');
    } else if (section === 'Carteira de Vacinação') {
      navigate('/carteira-vacinacao');
    } else {
      console.log(`Navegar para: ${section}`);
    }
  };

  const handleSearch = () => {
    console.log('Search button clicked!');
  };

  const handleAdd = () => {
    console.log('Add button clicked!');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <img src="https://via.placeholder.com/80x80?text=Logo" alt="My Pet Logo" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item" onClick={() => handleNavigationClick('Meu Pet')}>Meu Pet</li>
            <li className="nav-item" onClick={() => handleNavigationClick('Cadastrar um Pet')}>Cadastrar um Pet</li>
            <li className="nav-item" onClick={() => handleNavigationClick('Adote um Pet')}>Adote um Pet</li>
            <li className="nav-item" onClick={() => handleNavigationClick('Carteira de Vacinação')}>Carteira de Vacinação</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="my-pet-section">
          <h2>Meu Pet</h2>
          <div className="search-bar">
            <input type="text" placeholder="" className="search-input" />
            <button className="search-button" onClick={handleSearch}>pesquisar</button>
            <button className="add-button" onClick={handleAdd}>adicionar</button>
          </div>
          <div className="pet-images">
            <img src="https://via.placeholder.com/150x150?text=Dog" alt="Pet 1" className="pet-thumbnail" />
            <img src="https://via.placeholder.com/150x150?text=Cat" alt="Pet 2" className="pet-thumbnail" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Meupet;
