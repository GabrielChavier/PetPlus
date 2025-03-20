import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ updateAuthStatus }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

    // Redireciona para /home se já estiver autenticado
	useEffect(() => {
		const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:3001/login", {
				username,
				password,
			});

			if (response.data.success) {
				sessionStorage.setItem("authenticated", "true");
				sessionStorage.setItem("role", response.data.role);
				updateAuthStatus(true); // Atualiza o estado de autenticação no App.js
				alert("Login bem-sucedido!");
				navigate("/home"); // Redireciona para a página inicial
			} else {
				alert("Usuário ou senha incorretos.");
			}
		} catch (error) {
			alert("Erro ao conectar ao servidor.");
		}
	};

	return (
		<div className="login-container">
			<img src="/logo-ser.png" alt="Logo" className="logo" /> {/* Adiciona a imagem */}
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Usuário"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Entrar</button>
			</form>
		</div>
	);
}

export default Login;