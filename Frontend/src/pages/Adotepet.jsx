import React, { useState, useEffect } from 'react';
import './Adotepet.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/PetplusAlpha.jpeg';

function Meupet() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
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

  // Mock de pets caso não tenha nada no localStorage
  const mockPets = [
    { id: 1, name: 'Rex', breed: 'Labrador', age: '3 anos', image: '/imagens/labrador.jpg' },
    { id: 2, name: 'Mimi', breed: 'Poodle', age: '2 anos', image: '/imagens/poodle.jpeg' },
    { id: 3, name: 'Toby', breed: 'Beagle', age: '4 anos', image: '/imagens/beagle.jpeg' },
  ];

  // Função para filtrar pets localmente
  const handleSearch = () => {
    const allPets = JSON.parse(localStorage.getItem("pets")) || mockPets;

    if (!searchTerm) {
      setPets(allPets);
    } else {
      const filtered = allPets.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPets(filtered);
    }
  };

  // Carrega pets do localStorage ou mock ao montar o componente
  useEffect(() => {
    handleSearch();
  }, []);

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
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="my-pet-section">
          <h2>Adote um Pet</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pesquisar pets..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>Pesquisar</button>
          </div>

          <div className="pet-list">
            {pets.length === 0 ? (
              <p>Nenhum pet encontrado.</p>
            ) : (
              pets.map((pet) => (
                <div key={pet.id} className="pet-item">
                  <img src={pet.image || 'https://via.placeholder.com/150'} alt={pet.name} className="pet-thumbnail" />
                  <div>
                    <h3>{pet.name}</h3>
                    <p>{pet.breed}</p>
                    <p>{pet.age}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Meupet;
