const { check, validationResult } = require("express-validator");

exports.validateEducation = [
    check("institution")
        .notEmpty().withMessage("Institution name es requerido")
        .isLength({ max: 100 }).withMessage("Institution name debe ser menor de 100 caracteres"),
    check("degreeId")
        .notEmpty().withMessage("Degree ID es requerido")
        .isInt().withMessage("Degree ID must be an integer"),
    check("fieldOfStudy")
        .optional()
        .isLength({ max: 100 }).withMessage("Field of study debe ser menor de 100 caracteres"),
    check("startDate")
        .notEmpty().withMessage("Start date es requerido")
        .isISO8601().withMessage("Start date debe ser una fecha válida, véase: (YYYY-MM-DD)"),
    check("endDate")
        .optional()
        .isISO8601().withMessage("End date debe ser una fecha válida, véase: (YYYY-MM-DD)"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];