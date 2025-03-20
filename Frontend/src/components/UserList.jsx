import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserList() {
	const [users, setUsers] = useState([]);
	// const navigate = useNavigate();

	// Carrega a lista de usuários ao montar o componente
	useEffect(() => {
		fetchUsers();
	}, []);

	// Função para carregar os usuários
	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:3001/users");
			setUsers(response.data);
		} catch (error) {
			console.error("Erro ao carregar usuários:", error);
		}
	};

	// Função para deletar um usuário
	const handleDelete = async (userId) => {
		try {
			await axios.delete(`http://localhost:3001/users/${userId}`);
			alert("Usuário deletado com sucesso!");
			fetchUsers(); // Recarrega a lista após deletar
		} catch (error) {
			console.error("Erro ao deletar usuário:", error);
			alert("Erro ao deletar usuário.");
		}
	};

	return (
		<div>
			<h2>Lista de Usuários</h2>
			<Link to="/users/new">Novo Usuário</Link>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						{user.fullName} ({user.role})
						<Link to={`/users/edit/${user.id}`}>Editar</Link>
						<button onClick={() => handleDelete(user.id)}>Deletar</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default UserList;