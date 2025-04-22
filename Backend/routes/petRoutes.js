const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // middleware para upload de imagem

// Cadastrar pet (com autenticação e upload de imagem)
router.post('/', auth, upload.single('photo'), petController.createPet);

// Buscar pet pelo nome (ex: /api/pets/search?name=rex)
router.get('/search', petController.searchPetByName);

// Adotar pet (com autenticação) (ex: /api/pets/adopt/5)
router.post('/adopt/:id', auth, petController.adoptPet);

// Listar pets disponíveis
router.get('/available', petController.listAvailablePets);

module.exports = router;

