import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import EsqueciSenha from '../pages/EsqueciSenha';
import Meupet from '../pages/Meupet';
import CadastroPet from '../pages/CadastroPet';
import CadastroPetAdocao from '../pages/CadastroPetAdocao';
import CadastroVacina from '../pages/CadastroVacina';
import CarteiraVacinacao from '../pages/CarteiraVacinacao';
import Adotepet from '../pages/Adotepet';
import PetDetalhes from '../pages/PetDetalhes';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="/adote-um-pet" element={<Adotepet />} />

      {/* Rotas abertas (sem PrivateRoute) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meupet" element={<Meupet />} />
      <Route path="/meupet/:id" element={<PetDetalhes />} />
      <Route path="/cadastro-pet" element={<CadastroPet />} />
      <Route path="/cadastro-pet-adocao" element={<CadastroPetAdocao />} />
      <Route path="/cadastro-de-vacina" element={<CadastroVacina />} />
      <Route path="/carteira-vacinacao" element={<CarteiraVacinacao />} />

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
