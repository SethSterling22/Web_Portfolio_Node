const express = require("express");
const logger = require ("../middleware/logger");
const userController = require("../controllers/userController");
const { validateUser } = require("../validations/userValidation");


const { protect } = require('../middleware/auth');

const router = express.Router();

// Uso de Normal
// router.get("/", logger, userController.getUsers);
// router.get("/:id", userController.getUserById);
// // No se realiza protect, dado que se toma como register
// router.post("/", validateUser, userController.createUser);
// router.put("/:id", protect, validateUser, userController.updateUser);
// router.delete("/:id", protect, userController.deleteUser);

// Uso de Swagger
// router.get("/users/", logger, userController.getUsers);
router.get("/users/:id", userController.getUserById);
// No se realiza protect, dado que se toma como register
router.post("/users/",  validateUser, userController.createUser);
router.put("/users/:id", protect, validateUser, userController.updateUser);
router.delete("/users/:id", protect, userController.deleteUser);

module.exports = router;