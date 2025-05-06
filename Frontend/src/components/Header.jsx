import React from 'react';

const Header = () => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <h1 className="text-xl font-semibold">Sistema PetPlus</h1>
    <button className="bg-red-500 text-white px-3 py-1 rounded">Sair</button>
  </header>
);

export default Header;
