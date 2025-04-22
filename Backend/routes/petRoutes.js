const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, petController.createPet);
router.post('/adopt/:id', auth, petController.adoptPet);
router.get('/available', petController.listAvailablePets);

module.exports = router;
