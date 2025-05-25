const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Rota para cadastrar um novo pet (com autenticação e upload de imagem)
router.post('/', auth, upload.single('photo'), petController.createPet);

// Rota para listar todos os pets
router.get('/', petController.getPets);

// Rota para buscar pets por nome (ex: /api/pets/search?name=rex)
router.get('/search', petController.searchPetByName);

// Rota para adotar um pet (com autenticação)
router.post('/adopt/:id', auth, petController.adoptPet);

// Rota para listar apenas os pets disponíveis para adoção
router.get('/available', petController.listAvailablePets);

module.exports = router;
