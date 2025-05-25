import React, { useState, useRef } from "react";
import './CadastroPet.css';
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function CadastroPetAdocao() {
  const [foto, setFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPet = {
      id: Date.now(),
      ...formData,
      foto: previewUrl || "https://via.placeholder.com/150",
    };

    const existingPets = JSON.parse(localStorage.getItem("pets")) || [];
    localStorage.setItem("pets", JSON.stringify([...existingPets, newPet]));

    alert("🐶 Cadastro realizado com sucesso!");
    navigate("/adote-um-pet");
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="nome do pet"
              onChange={handleChange}
              required
            />
            <div className="row">
              <input type="text" name="especie" placeholder="especie" onChange={handleChange} required />
              <input type="text" name="raca" placeholder="raça" onChange={handleChange} required />
            </div>
            <div className="row">
              <input type="text" name="sexo" placeholder="sexo" onChange={handleChange} required />
              <input type="text" name="idade" placeholder="idade" onChange={handleChange} required />
            </div>
            <input type="text" name="telefone" placeholder="telefone" onChange={handleChange} required />
            <input type="text" name="local" placeholder="local" onChange={handleChange} required />
            <div className="row">
              <textarea name="bio" placeholder="biografia" onChange={handleChange}></textarea>

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
              <button type="button" className="btn cancel" onClick={() => navigate("/adote-um-pet")}>cancelar</button>
              <button type="submit" className="btn">cadastrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
