import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		sessionStorage.getItem("authenticated") === "true"
	);
	const location = useLocation(); // Obtém a localização atual da rota

	// Função para atualizar o estado de autenticação
	const updateAuthStatus = (status) => {
		setIsAuthenticated(status);
	};

	// Verifica a autenticação ao mudar de rota
	useEffect(() => {
		const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
		if (!isAuthenticated && location.pathname !== "/login") {
			alert("Você precisa fazer login primeiro!");
		}
	}, [location]); // Executa sempre que a rota mudar

  // Função para verificar se o usuário é admin
  const isAdmin = () => {
    return sessionStorage.getItem("role") === "admin";
  };

	return (
		<div className="app-container">
			{isAuthenticated && <Sidebar updateAuthStatus={updateAuthStatus} />} {/* Renderiza o Sidebar apenas se autenticado */}
			<div className="content">
				<Routes>
					{/* Rotas não autenticadas (login) */}
					<Route
						path="/"
						element={<Login updateAuthStatus={updateAuthStatus} />}
					/>
					<Route
						path="/login"
						element={<Login updateAuthStatus={updateAuthStatus} />}
					/>

					{/* Rotas autenticadas */}
					<Route
						path="/home"
						element={
							isAuthenticated ? <Home /> : <Navigate to="/login" />
						}
					/>
					<Route
						path="/users"
						element={
							isAuthenticated && isAdmin() ? <UserList /> : <Navigate to="/login" />
						}
					/>
					<Route
						path="/users/new"
						element={
							isAuthenticated && isAdmin() ? <UserForm /> : <Navigate to="/login" />
						}
					/>
					<Route
						path="/users/edit/:id"
						element={
							isAuthenticated && isAdmin() ? <UserForm /> : <Navigate to="/login" />
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default function AppWrapper() {
	return (
		<Router>
			<App />
		</Router>
	);
}