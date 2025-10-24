const { check, validationResult } = require("express-validator");

exports.validateSkill = [
    check("name")
        .notEmpty().withMessage("Skill name es un campo requerido")
        .isLength({ max: 100 }).withMessage("Skill debe ser menor de 100 caracteres"),
    check("proficiency")
        .notEmpty().withMessage("Proficiency es un campo requerido")
        .isLength({ max: 20 }).withMessage("Proficiency debe ser menor de 20 caracteres."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];