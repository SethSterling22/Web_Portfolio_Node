const { check, validationResult } = require("express-validator");

exports.validateExperience = [
    check("jobTitle")
        .notEmpty().withMessage("Job title es requerido.")
        .isLength({ max: 100 }).withMessage("Job titledebe ser menor de 100 caracteres"),
    check("company")
        .optional() // Cambio para manejar los cursos
        .isLength({ max: 100 }).withMessage("Company namedebe ser menor de 100 caracteres"),
    check("description")
        .optional()
        .isLength({ max: 500 }).withMessage("Description debe ser menor de 500 caracteres"),
    check("startDate")
        .notEmpty().withMessage("Start date es requerido.")
        .isISO8601().withMessage("Start date debe ser una fecha válida, véase: (YYYY-MM-DD)"),
    check("endDate")
        .optional()
        .isISO8601().withMessage("End date debe ser una fecha válida, véase: (YYYY-MM-DD)"),
    check("isProject")
        .optional()
        .isBoolean().withMessage("isProject must be a boolean value"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];