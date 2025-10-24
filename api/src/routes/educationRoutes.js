const express = require('express');
const educationController = require('../controllers/educationController');
const { protect } = require('../middleware/auth');
const { validateEducation } = require("../validations/educationValidation");

const router = express.Router();

// Rutas Normales
// router.get('/:userId', educationController.getEducation);
// router.post('/:userId', protect, educationController.addEducation);
// router.put('/:userId/:id', protect, educationController.updateEducation);
// router.delete('/:userId/:id', protect, educationController.deleteEducation);

// Rutas de Swagger
router.get('/educations/:userId', educationController.getEducation);
router.post('/educations/:userId', protect, validateEducation, educationController.addEducation);
router.put('/educations/:userId/:id', protect, validateEducation, educationController.updateEducation);
router.delete('/educations/:userId/:id', protect, educationController.deleteEducation);

module.exports = router;