const Pet = require('../models/Pet');

// Cadastrar novo pet (com suporte a foto)
exports.createPet = async (req, res) => {
  const { name, species, breed, gender, age, ownerId } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const pet = await Pet.create({
      name,
      species,
      breed,
      gender,
      age,
      photo,
      ownerId,
      adopted: false // Garante que o pet comece como disponível
    });

    res.status(201).json({ message: 'Pet cadastrado com sucesso', pet });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar pet', error: err.message });
  }
};

// Adotar um pet (marca como adotado)
exports.adoptPet = async (req, res) => {
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

    res.status(200).json({ message: 'Pet adotado com sucesso', pet });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adotar pet', error: err.message });
  }
};

// Listar pets disponíveis para adoção
exports.listAvailablePets = async (req, res) => {
  try {
    const pets = await Pet.findAll({ where: { adopted: false } });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar pets', error: err.message });
  }
};

// Buscar pets pelo nome
exports.searchPetByName = async (req, res) => {
  const { name } = req.query;

  try {
    const pets = await Pet.findAll({
      where: {
        name: name,
        adopted: false
      }
    });

    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pet', error: err.message });
  }
};
