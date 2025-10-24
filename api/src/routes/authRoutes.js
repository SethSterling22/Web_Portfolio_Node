const express = require('express');
const { login } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// router.post('/login', login);
router.post('/auth/login', login);

module.exports = router;