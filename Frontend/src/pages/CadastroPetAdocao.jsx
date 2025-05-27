import React, { useState, useRef } from "react";
import './CadastroPetAdocao.css';
import logo from "../assets/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";

export default function CadastroPet() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [foto, setFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const fileInputRef = useRef(null);

  const handleCancel = () => {
    navigate("/meupet");
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFoto(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("especie", especie);
    formData.append("raca", raca);
    formData.append("sexo", sexo);
    formData.append("idade", idade);

    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const response = await fetch(`${API_BASE}/pets`, {  // Usando API_BASE aqui
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Erro ao cadastrar pet.");
        return;
      }

      setNome("");
      setEspecie("");
      setRaca("");
      setSexo("");
      setIdade("");
      setFoto(null);
      setPreviewUrl(null);

      setMensagemSucesso("Cadastro realizado com sucesso!");

      setTimeout(() => {
        setMensagemSucesso("");
        navigate("/meupet");
      }, 3000);

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div className="form-page">
      <header className="navbar">
        <img src={logo} alt="PetPlus" className="logo" />
        <nav className="nav-links">
          <Link to="/meupet">Meu Pet</Link>
          <Link to="/cadastro-pet">Cadastrar um Pet</Link>
          <Link to="/adote-um-pet">Adote um Pet</Link>
          <Link to="/carteira-vacinacao">Carteira de Vacinação</Link>
        </nav>
      </header>

      <main className="form-content">
        <div className="form-box">
          <h2>cadastre seu pet</h2>

          {mensagemSucesso && (
            <p style={{ color: "green", fontWeight: "bold", marginBottom: "15px" }}>
              {mensagemSucesso}
            </p>
          )}

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
              <button
                type="button"
                className="upload-btn"
                onClick={handleUploadClick}
              >
                📷
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {foto && <p>Imagem selecionada: {foto.name}</p>}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Pré-visualização"
                  style={{ marginTop: "10px", maxWidth: "200px", borderRadius: "8px" }}
                />
              )}
            </div>

            <div className="btn-area">
              <button
                type="button"
                className="btn cancel"
                onClick={handleCancel}
              >
                cancelar
              </button>
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
