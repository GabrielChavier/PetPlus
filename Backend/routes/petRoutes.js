const express = require('express');
const router = express.Router();

// Certifique-se de que esses módulos estão corretamente importados
const petController = require('../controllers/petController'); // Responsável pelas operações de pet
const auth = require('../middleware/authMiddleware'); // Middleware de autenticação
const upload = require('../middleware/upload'); // Middleware para upload de imagens

// Cadastrar pet (com autenticação e upload de imagem)
router.post('/', auth, upload.single('photo'), petController.createPet);
// A função 'upload.single('photo')' lida com o upload da imagem chamada 'photo'
// O middleware 'auth' garante que o usuário está autenticado antes de cadastrar o pet
// A função 'createPet' no 'petController' processa o cadastro do pet

// Buscar pet pelo nome (ex: /api/pets/search?name=rex)
router.get('/search', petController.searchPetByName);
// A função 'searchPetByName' no 'petController' pesquisa o pet pelo nome

// Adotar pet (com autenticação) (ex: /api/pets/adopt/5)
router.post('/adopt/:id', auth, petController.adoptPet);
// O middleware 'auth' garante que o usuário está autenticado antes de adotar um pet
// A função 'adoptPet' no 'petController' realiza o processo de adoção

// Listar pets disponíveis
router.get('/available', petController.listAvailablePets);
// A função 'listAvailablePets' no 'petController' lista os pets disponíveis para adoção

module.exports = router;
