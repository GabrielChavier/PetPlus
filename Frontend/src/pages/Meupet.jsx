// App.js
import React from 'react';
import './Meupet.css'; // Import the main CSS file

function App() {
  const handleNavigationClick = (section) => {
    console.log(`Navigating to: ${section}`);
    // In a real application, you would use React Router here to change views
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
          {/* You would replace 'logo.png' with your actual logo image path */}
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
            {/* Replace with your actual pet images */}
            <img src="https://via.placeholder.com/150x150?text=Dog" alt="Pet 1" className="pet-thumbnail" />
            <img src="https://via.placeholder.com/150x150?text=Cat" alt="Pet 2" className="pet-thumbnail" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;