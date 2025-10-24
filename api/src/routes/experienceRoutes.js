const express = require('express');
const experienceController = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');
const { validateExperience } = require("../validations/experienceValidation");

const router = express.Router();

// Rutas normales
// router.get('/:userId', experienceController.getExperiences);
// router.post('/:userId', protect, experienceController.addExperience);
// router.put('/:userId/:id', protect, experienceController.updateExperience);
// router.delete('/:userId/:id', protect, experienceController.deleteExperience);

// Rutas de Swagger
router.get('/experiences/:userId', experienceController.getExperiences);
router.post('/experiences/:userId', protect, validateExperience, experienceController.addExperience);
router.put('/experiences/:userId/:id', protect, validateExperience, experienceController.updateExperience);
router.delete('/experiences/:userId/:id', protect, experienceController.deleteExperience);

module.exports = router;