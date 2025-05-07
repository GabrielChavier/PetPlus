const express = require('express');
const router = express.Router();

// Importações dos controladores e middlewares
const petController = require('../controllers/petController'); // Lógica de manipulação dos pets
const auth = require('../middleware/authMiddleware');           // Middleware para verificar se o usuário está autenticado
const upload = require('../middleware/upload');                 // Middleware para lidar com upload de imagens

// ======================================
// Rotas relacionadas aos pets
// ======================================

// Rota para cadastrar um novo pet (com autenticação e upload de imagem)
router.post('/pets', auth, upload.single('photo'), petController.createPet);
// Middleware 'auth' verifica se o usuário está autenticado
// Middleware 'upload.single("photo")' processa a imagem enviada com o nome 'photo'
// Função 'createPet' cria um novo pet no banco de dados

// Rota para listar todos os pets (por exemplo, para fins administrativos)
router.get('/pets', petController.getPets);

// Rota para buscar pets por nome (ex: /api/pets/search?name=rex)
router.get('/pets/search', petController.searchPetByName);

// Rota para adotar um pet (com autenticação)
router.post('/pets/adopt/:id', auth, petController.adoptPet);
// ':id' é o identificador do pet a ser adotado

// Rota para listar apenas os pets disponíveis para adoção
router.get('/pets/available', petController.listAvailablePets);

module.exports = router;
