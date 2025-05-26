const express = require('express');
const router = express.Router();

const verificarToken = require('../middleware/authMiddleware');
const vaccineController = require('../controllers/vaccineController');

// Rotas protegidas
router.post('/cadastro', verificarToken, vaccineController.cadastrarVacina);
router.get('/carteira', verificarToken, vaccineController.listarVacinasDoUsuario);
router.delete('/:id', verificarToken, vaccineController.excluirVacina);
router.put('/:id', verificarToken, vaccineController.editarVacina);

module.exports = router;
