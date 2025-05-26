const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const verificarToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Rotas protegidas
router.post('/', verificarToken, upload.single('photo'), petController.cadastrarPet);
router.post('/adopt/:id', verificarToken, petController.adotarPet);

// Rotas públicas
router.get('/', petController.listarTodosPets);
router.get('/available', petController.listarPetsDisponiveis);
router.get('/search', petController.buscarPetPorNome);

module.exports = router;
