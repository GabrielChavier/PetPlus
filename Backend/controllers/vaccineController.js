const Vaccine = require('../models/Vaccine');

exports.addVaccine = async (req, res) => {
  const { name, date, petId } = req.body;
  try {
    const vaccine = await Vaccine.create({ name, date, PetId: petId });
    res.status(201).json(vaccine);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar vacina', error: err.message });
  }
};

exports.getPetVaccines = async (req, res) => {
  const { petId } = req.params;
  try {
    const vaccines = await Vaccine.findAll({ where: { PetId: petId } });
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vacinas', error: err.message });
  }
};
