const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.post('/register', ownerController.registerOwner);

module.exports = router;
