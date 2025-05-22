import React, { useState } from "react";
import "./all.css";
import logo from "../assets/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";

export default function CadastroPet() {
  const navigate = useNavigate();

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [foto, setFoto] = useState(null); // Estado para armazenar o arquivo da foto do pet

  const [mensagemSucesso, setMensagemSucesso] = useState(""); 
  // Estado para mostrar mensagem de cadastro realizado com sucesso

  // Referência para o input file escondido (para abrir via botão)
  const fileInputRef = React.useRef(null);

  // Função para navegar para a página /meupet ao cancelar o cadastro
  const handleCancel = () => {
    navigate("/meupet");
  };

  // Abre o seletor de arquivos quando o botão de upload for clicado
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Atualiza o estado 'foto' com o arquivo selecionado pelo usuário
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFoto(file);
    }
  };

  // Função que trata o envio do formulário (submit)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita recarregar a página ao enviar

    // Cria um objeto FormData para enviar os dados e o arquivo
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("especie", especie);
    formData.append("raca", raca);
    formData.append("sexo", sexo);
    formData.append("idade", idade);

    // Se o usuário enviou uma foto, adiciona no FormData
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      // Envia os dados para o backend via fetch, usando POST e enviando o FormData
      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Se o backend retornar erro, exibe alerta para o usuário
        alert("Erro ao cadastrar pet.");
        return;
      }

      // Se chegou aqui, o cadastro foi um sucesso

      // Limpa os estados para zerar o formulário
      setNome("");
      setEspecie("");
      setRaca("");
      setSexo("");
      setIdade("");
      setFoto(null);

      // Exibe a mensagem de sucesso na tela
      setMensagemSucesso("Cadastro realizado com sucesso!");

      // Opcional: depois de alguns segundos, limpa a mensagem e redireciona
      setTimeout(() => {
        setMensagemSucesso(""); // limpa a mensagem
        navigate("/meupet"); // redireciona para a página /meupet
      }, 3000); // 3 segundos

    } catch (error) {
      // Se der erro na comunicação, exibe mensagem no console e alerta ao usuário
      console.error("Erro na requisição:", error);
      alert("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div className="form-page">
      <header className="navbar">
        <img src={logo} alt="PetPlus" className="logo" />
        <nav className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/cadastro-pet">Cadastrar um Pet</Link>
          <Link to="/adote-um-pet">Adote um Pet</Link>
          <Link to="/carteira-vacinacao">Carteira de Vacinação</Link>
        </nav>
      </header>

      <main className="form-content">
        <div className="form-box">
          <h2>cadastre seu pet</h2>

          {/* Exibe mensagem de sucesso se existir */}
          {mensagemSucesso && (
            <p style={{ color: "green", fontWeight: "bold", marginBottom: "15px" }}>
              {mensagemSucesso}
            </p>
          )}

          {/* Formulário com onSubmit que chama handleSubmit */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="nome do pet"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <div className="row">
              <input
                type="text"
                placeholder="especie"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="raça"
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              />
            </div>

            <div className="upload-area">
              {/* Botão que abre seletor de arquivos */}
              <button
                type="button"
                className="upload-btn"
                onClick={handleUploadClick}
              >
                📷
              </button>

              {/* Input file escondido */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {/* Mostra nome da imagem selecionada */}
              {foto && <p>Imagem selecionada: {foto.name}</p>}
            </div>

            <div className="btn-area">
              {/* Botão cancelar navega para /meupet */}
              <button
                type="button"
                className="btn cancel"
                onClick={handleCancel}
              >
                cancelar
              </button>

              {/* Botão submit envia o formulário */}
              <button type="submit" className="btn">
                cadastrar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
