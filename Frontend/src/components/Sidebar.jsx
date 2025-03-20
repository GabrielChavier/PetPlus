import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ updateAuthStatus }) {
	const navigate = useNavigate();
    const role = sessionStorage.getItem("role"); // Obtém a função do usuário

	const handleLogout = () => {
		sessionStorage.removeItem("authenticated"); // Remove a autenticação
		sessionStorage.removeItem("role"); // Remove o tipo de usuário
		updateAuthStatus(false); // Atualiza o estado de autenticação no App.js
		navigate("/login"); // Redireciona para a tela de login
	};

	return (
		<div className="sidebar">
			<ul>
				<li><Link to="/home">Dashboard</Link></li>
				{role === "admin" && ( // Mostra o link de "Usuários" apenas para admin
					<li><Link to="/users">Usuários</Link></li>
				)}
			</ul>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}

export default Sidebar;