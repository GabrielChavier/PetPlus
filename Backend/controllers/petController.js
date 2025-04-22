const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  const { name, species } = req.body;
  try {
    const pet = await Pet.create({ name, species });
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar pet', error: err.message });
  }
};

exports.adoptPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).json({ message: 'Pet não encontrado' });

    pet.adopted = true;
    await pet.save();
    res.json({ message: 'Pet adotado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adotar pet', error: err.message });
  }
};

exports.listAvailablePets = async (req, res) => {
  try {
    const pets = await Pet.findAll({ where: { adopted: false } });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar pets', error: err.message });
  }
};
