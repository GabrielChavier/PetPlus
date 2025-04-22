const express = require('express');
const router = express.Router();
const vaccineController = require('../controllers/vaccineController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, vaccineController.addVaccine);
router.get('/:petId', vaccineController.getPetVaccines);

module.exports = router;
