const express = require('express');
const { getPortfolio } = require('../controllers/portfolioController');

const router = express.Router();

// Rutas normales
// router.get('/:userId', getPortfolio);

// Rutas de Swagger
router.get('/portfolio/:userId', getPortfolio);

module.exports = router;