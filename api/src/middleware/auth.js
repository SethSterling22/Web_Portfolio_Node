const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, falta de Token :o' });
    }

    try {
        // Verificar el Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificar si el usuario existe
        const user = await getUserById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado :/' });
        }

        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        // console.log("Autorizado")
        // Sigue con la función de la Ruta
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'No autorizado, el Token ha fallado *o*' });
    }
};

// Verificar el rol del usuario, de tarea
// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ 
//                 message: `Su Rol de usuario ${req.user.role} no tiene autorización para acceder a esta ruta >:|`
//             });
//         }
//         next();
//     };
// };