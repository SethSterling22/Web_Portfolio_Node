const express = require('express');
const skillController = require('../controllers/skillController');
const { protect } = require('../middleware/auth');
const { validateSkill } = require("../validations/skillValidation");

const router = express.Router();

// Rutas Normales
// router.get('/:userId', skillController.getSkillsByUser);
// router.post('/:userId', protect, skillController.agetSkillsByUserddSkill);
// router.put('/:userId/:id', protect, skillController.updateSkill);
// router.delete('/:userId/:id', protect, skillController.deleteSkill);

// Rutas con Swagger
router.get('/skills/:userId', skillController.getSkillsByUser);
router.post('/skills/:userId', protect, validateSkill, skillController.addSkill);
router.put('/skills/:userId/:id', protect, validateSkill, skillController.updateSkill);
router.delete('/skills/:userId/:id', protect, skillController.deleteSkill);

module.exports = router;