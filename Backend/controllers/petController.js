const { Op } = require('sequelize');
const Pet = require('../models/Pet');

module.exports = {
  // ================================
  // Cadastrar novo pet
  // ================================
  createPet: async (req, res) => {
    const { name, species, breed, gender, age } = req.body;
    const photo = req.file ? req.file.filename : null;
    const userId = req.user.id;

    try {
      const pet = await Pet.create({
        name,
        species,
        breed,
        gender,
        age,
        photo,
        userId,
        adopted: false,
      });

      return res.status(201).json({
        message: 'Pet cadastrado com sucesso',
        data: pet,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Erro ao cadastrar pet',
        error: err.message,
      });
    }
  },

  // ================================
  // Adotar um pet (marca como adotado)
  // ================================
  adoptPet: async (req, res) => {
    const { id } = req.params;

    try {
      const pet = await Pet.findByPk(id);

      if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado' });
      }

      if (pet.adopted) {
        return res.status(400).json({ message: 'Pet já foi adotado' });
      }

      pet.adopted = true;
      await pet.save();

      return res.status(200).json({
        message: 'Pet adotado com sucesso',
        data: pet,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Erro ao adotar pet',
        error: err.message,
      });
    }
  },

  // ================================
  // Listar todos os pets disponíveis
  // ================================
  listAvailablePets: async (req, res) => {
    try {
      const pets = await Pet.findAll({ where: { adopted: false } });
      return res.status(200).json({ data: pets });
    } catch (err) {
      return res.status(500).json({
        message: 'Erro ao listar pets disponíveis',
        error: err.message,
      });
    }
  },

  // ================================
  // Buscar pets pelo nome (case-insensitive e parcial)
  // ================================
  searchPetByName: async (req, res) => {
    const { name } = req.query;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Parâmetro "name" é obrigatório' });
    }

    try {
      const pets = await Pet.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
          adopted: false,
        },
      });

      return res.status(200).json({ data: pets });
    } catch (err) {
      return res.status(500).json({
        message: 'Erro ao buscar pets por nome',
        error: err.message,
      });
    }
  },

  // ================================
  // Listar todos os pets (admin ou debug)
  // ================================
  getPets: async (req, res) => {
    try {
      const pets = await Pet.findAll();
      return res.status(200).json({ data: pets });
    } catch (err) {
      return res.status(500).json({
        message: 'Erro ao listar todos os pets',
        error: err.message,
      });
    }
  },
};

