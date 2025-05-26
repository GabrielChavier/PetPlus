const Vaccine = require('../models/Vaccine');

// Renomeado de addVaccine para cadastrarVacina
exports.cadastrarVacina = async (req, res) => {
  const { name, date, petId } = req.body;
  try {
    const vaccine = await Vaccine.create({ name, date, PetId: petId });
    res.status(201).json(vaccine);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar vacina', error: err.message });
  }
};

// Renomeado de getPetVaccines para listarVacinasDoUsuario
exports.listarVacinasDoUsuario = async (req, res) => {
  const { petId } = req.params;
  try {
    const vaccines = await Vaccine.findAll({ where: { PetId: petId } });
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vacinas', error: err.message });
  }
};

// Novo método para editar vacina
exports.editarVacina = async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  try {
    const vaccine = await Vaccine.findByPk(id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vacina não encontrada' });
    }
    vaccine.name = name || vaccine.name;
    vaccine.date = date || vaccine.date;
    await vaccine.save();
    res.json(vaccine);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao editar vacina', error: err.message });
  }
};

// Novo método para excluir vacina
exports.excluirVacina = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccine = await Vaccine.findByPk(id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vacina não encontrada' });
    }
    await vaccine.destroy();
    res.json({ message: 'Vacina excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir vacina', error: err.message });
  }
};
