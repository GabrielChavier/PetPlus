import React, { useState, useRef } from "react";
import './CadastroPet.css';
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function CadastroPetAdocao() {
  const [foto, setFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    sexo: "",
    idade: "",
    telefone: "",
    local: "",
    bio: "",
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoPet = {
      nome: formData.nome,
      especie: formData.especie,
      raca: formData.raca,
      sexo: formData.sexo,
      idade: formData.idade,
      telefone: formData.telefone,
      local: formData.local,
      bio: formData.bio,
      fotoUrl: previewUrl,
    };

    const petsSalvos = JSON.parse(localStorage.getItem("meusPets")) || [];
    petsSalvos.push(novoPet);
    localStorage.setItem("meusPets", JSON.stringify(petsSalvos));

    // Limpar campos
    setFormData({
      nome: "",
      especie: "",
      raca: "",
      sexo: "",
      idade: "",
      telefone: "",
      local: "",
      bio: "",
    });
    setFoto(null);
    setPreviewUrl(null);

    setMensagemSucesso("🐶 Cadastro realizado com sucesso!");

    setTimeout(() => {
      setMensagemSucesso("");
      navigate("/meupet");
    }, 2000);
  };

  return (
    <div className="form-page">
      <header className="navbar">
        <div className="logo-area">
          <img src={logo} alt="Logo PetPlus" className="logo" />
        </div>
        <nav className="nav-links">
          <Link to="/meupet">Meu Pet</Link>
          <Link to="/cadastro-pet">Cadastrar um Pet</Link>
          <Link to="/adote-um-pet">Adote um Pet</Link>
          <Link to="/carteira-vacinacao">Carteira de Vacinação</Link>
        </nav>
      </header>

      <main className="form-content">
        <div className="form-box">
          <h2>cadastre seu pet para adoção</h2>
          {mensagemSucesso && <p className="success-message">{mensagemSucesso}</p>}
          <form onSubmit={handleSubmit}>
            <input type="text" name="nome" placeholder="nome do pet" value={formData.nome} onChange={handleChange} required />
            <div className="row">
              <input type="text" name="especie" placeholder="especie" value={formData.especie} onChange={handleChange} required />
              <input type="text" name="raca" placeholder="raça" value={formData.raca} onChange={handleChange} required />
            </div>
            <div className="row">
              <input type="text" name="sexo" placeholder="sexo" value={formData.sexo} onChange={handleChange} required />
              <input type="text" name="idade" placeholder="idade" value={formData.idade} onChange={handleChange} required />
            </div>
            <input type="text" name="telefone" placeholder="telefone" value={formData.telefone} onChange={handleChange} required />
            <input type="text" name="local" placeholder="local" value={formData.local} onChange={handleChange} required />
            <div className="row">
              <textarea name="bio" placeholder="biografia" value={formData.bio} onChange={handleChange}></textarea>

              <button type="button" className="upload-btn" onClick={handleUploadClick}>
                📷
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {foto && <p>Imagem selecionada: {foto.name}</p>}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Pré-visualização"
                style={{ marginTop: "10px", maxWidth: "200px", borderRadius: "8px" }}
              />
            )}

            <div className="btn-area">
              <button type="button" className="btn cancel" onClick={() => navigate("/meupet")}>cancelar</button>
              <button type="submit" className="btn">cadastrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
