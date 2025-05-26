const Pet = require('../models/Pet');

module.exports = {
  // ================================
  // Cadastrar novo pet
  // ================================
  createPet: async (req, res) => {
    const { name, species, breed, gender, age } = req.body;
    const photo = req.file ? req.file.filename : null; // Verifica se foi enviada uma imagem
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
        adopted: false // Pet começa como disponível para adoção
      });

      res.status(201).json({ message: 'Pet cadastrado com sucesso', pet });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao cadastrar pet', error: err.message });
    }
  },

  // ================================
  // Adotar um pet (marca como adotado)
  // ================================
  adoptPet: async (req, res) => {
    const { id } = req.params;

    try {
      const pet = await Pet.findByPk(id); // Busca o pet pelo ID

      if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado' });
      }

      if (pet.adopted) {
        return res.status(400).json({ message: 'Pet já foi adotado' });
      }

      pet.adopted = true;
      await pet.save(); // Marca como adotado

      res.status(200).json({ message: 'Pet adotado com sucesso', pet });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao adotar pet', error: err.message });
    }
  },

  // ================================
  // Listar todos os pets disponíveis
  // ================================
  listAvailablePets: async (req, res) => {
    try {
      const pets = await Pet.findAll({ where: { adopted: false } }); // Apenas pets não adotados
      res.status(200).json(pets);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar pets', error: err.message });
    }
  },

  // ================================
  // Buscar pets pelo nome
  // ================================
  searchPetByName: async (req, res) => {
    const { name } = req.query;

    try {
      const pets = await Pet.findAll({
        where: {
          name: name,
          adopted: false // Só busca pets disponíveis
        }
      });

      res.status(200).json(pets);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar pet', error: err.message });
    }
  },

  // ================================
  // Listar todos os pets (admin ou debug)
  // ================================
  getPets: async (req, res) => {
    try {
      const pets = await Pet.findAll(); // Retorna todos os pets
      res.status(200).json(pets);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar todos os pets', error: err.message });
    }
  }
};
