const { check, validationResult } = require("express-validator");

exports.validateUser = [
    check("firstName").notEmpty().withMessage("Name es requerido"),
    check("lastName").notEmpty().withMessage("Last name es requerido"),
    check("email").isEmail().withMessage("Valid email es requerido"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];