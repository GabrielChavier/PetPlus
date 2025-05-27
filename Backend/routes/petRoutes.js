const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const verificarToken = require('../middleware/authMiddleware'); // middleware de autenticação
const upload = require('../middleware/upload'); // middleware multer para upload

// Rotas protegidas
// Rota para criar pet com upload de foto, protegida por autenticação
router.post('/', verificarToken, upload.single('photo'), petController.createPet);

// Rota para adotar pet, protegida por autenticação
router.post('/adopt/:id', verificarToken, petController.adoptPet);

// Rotas públicas (não precisam de autenticação)
// Lista todos os pets
router.get('/', petController.getPets);

// Lista pets disponíveis para adoção
router.get('/available', petController.listAvailablePets);

// Busca pets pelo nome
router.get('/search', petController.searchPetByName);

module.exports = router;
