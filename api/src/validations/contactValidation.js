const { check, validationResult } = require("express-validator");

exports.validateContact = [
    check("message").notEmpty().withMessage("Se requiere un mensaje"),
    check("email").isEmail().withMessage("Valid email es requerido"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];