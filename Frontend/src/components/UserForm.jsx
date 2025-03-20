import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [role, setRole] = useState("common");
	const navigate = useNavigate();
	const { id } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("As senhas não coincidem!");
			return;
		}

		const userData = { fullName, username, password, role };
		try {
			if (id) {
				await axios.put(`http://localhost:3001/users/${id}`, userData);
			} else {
				await axios.post("http://localhost:3001/users", userData);
			}
			navigate("/users");
		} catch (error) {
			console.error("Erro ao salvar usuário:", error);
		}
	};

	return (
		<div>
			<h2>{id ? "Editar Usuário" : "Novo Usuário"}</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
				<input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
				<input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
				<input type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
				<select value={role} onChange={(e) => setRole(e.target.value)}>
					<option value="admin">Admin</option>
					<option value="common">Comum</option>
				</select>
				<button type="submit">Salvar</button>
			</form>
		</div>
	);
}

export default UserForm;