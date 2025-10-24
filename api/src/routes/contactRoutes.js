const express = require('express');
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { validateContact } = require("../validations/contactValidation");

const router = express.Router();

// Rutas con Swagger
router.get('/contacts/:userId', contactController.getContactsByUser);
router.post('/contacts/:userId', protect, validateContact, contactController.addContact);
router.delete('/contacts/:userId/:id', protect, contactController.deleteContact);

module.exports = router;