import React, { useState } from 'react';
import './Meupet.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function Meupet() {
  const navigate = useNavigate();

  // Estado para armazenar lista de pets
  const [pets, setPets] = useState([]);
  // Estado para guardar o texto da pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigationClick = (section) => {
    if (section === 'Cadastrar um Pet') {
      navigate('/cadastro-pet');
    } else if (section === 'Meu Pet') {
      navigate('/meupet');
    } else if (section === 'Adote um Pet') {
      navigate('/adote-um-pet');
    } else if (section === 'Carteira de Vacinação') {
      navigate('/carteira-vacinacao');
    }
  };

  // Função para buscar pets no backend (API)
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/pets?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar pets');
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    navigate('/cadastro-pet-adocao');
  };

  // Função para logout, redireciona para tela de login
  const handleLogout = () => {
    // Aqui você pode limpar tokens, dados de sessão etc, se usar autenticação
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-area">
          <img src={logo} alt="Logo PetPlus" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item" onClick={() => handleNavigationClick('Meu Pet')}>Meu Pet</li>
            <li className="nav-item" onClick={() => handleNavigationClick('Cadastrar um Pet')}>Cadastrar um Pet</li>
            <li className="nav-item" onClick={() => handleNavigationClick('Adote um Pet')}>Adote um Pet</li>
            <li className="nav-item" onClick={() => handleNavigationClick('Carteira de Vacinação')}>Carteira de Vacinação</li>
            {/* Botão Sair */}
            <li className="nav-item logout-button" onClick={handleLogout}>Sair</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="my-pet-section">
          <h2>Meu Pet</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar pets..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>Pesquisar</button>
            <button className="add-button" onClick={handleAdd}>Adicionar</button>
          </div>

          <div className="pet-list">
            {pets.length === 0 && <p>Nenhum pet encontrado.</p>}
            {pets.map((pet) => (
              <div key={pet.id} className="pet-item">
                <img src={pet.image || 'https://via.placeholder.com/150'} alt={pet.name} className="pet-thumbnail" />
                <div>
                  <h3>{pet.name}</h3>
                  <p>{pet.breed}</p>
                  <p>{pet.age} anos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Meupet;
