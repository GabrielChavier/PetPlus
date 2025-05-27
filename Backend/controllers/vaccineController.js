const Vaccine = require('../models/Vaccine');

exports.cadastrarVacina = async (req, res) => {
  const { name, date, petId } = req.body;
  try {
    const vaccine = await Vaccine.create({ name, date, PetId: petId });
    return res.status(201).json({
      message: 'Vacina cadastrada com sucesso',
      data: vaccine,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Erro ao adicionar vacina',
      error: err.message,
    });
  }
};

exports.listarVacinasDoUsuario = async (req, res) => {
  const { petId } = req.params;
  try {
    const vaccines = await Vaccine.findAll({ where: { PetId: petId } });
    return res.status(200).json({
      message: 'Vacinas recuperadas com sucesso',
      data: vaccines,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Erro ao buscar vacinas',
      error: err.message,
    });
  }
};

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

    return res.status(200).json({
      message: 'Vacina atualizada com sucesso',
      data: vaccine,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Erro ao editar vacina',
      error: err.message,
    });
  }
};

exports.excluirVacina = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccine = await Vaccine.findByPk(id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vacina não encontrada' });
    }
    await vaccine.destroy();
    return res.status(200).json({
      message: 'Vacina excluída com sucesso',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Erro ao excluir vacina',
      error: err.message,
    });
  }
};
