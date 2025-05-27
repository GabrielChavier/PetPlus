import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute'; // ajuste o caminho se o arquivo estiver em outro local
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

      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/meupet"
        element={
          <PrivateRoute>
            <Meupet />
          </PrivateRoute>
        }
      />
      <Route
        path="/meupet/:id"
        element={
          <PrivateRoute>
            <PetDetalhes />
          </PrivateRoute>
        }
      />
      <Route
        path="/cadastro-pet"
        element={
          <PrivateRoute>
            <CadastroPet />
          </PrivateRoute>
        }
      />
      <Route
        path="/cadastro-pet-adocao"
        element={
          <PrivateRoute>
            <CadastroPetAdocao />
          </PrivateRoute>
        }
      />
      <Route
        path="/cadastro-de-vacina"
        element={
          <PrivateRoute>
            <CadastroVacina />
          </PrivateRoute>
        }
      />
      <Route
        path="/carteira-vacinacao"
        element={
          <PrivateRoute>
            <CarteiraVacinacao />
          </PrivateRoute>
        }
      />

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
