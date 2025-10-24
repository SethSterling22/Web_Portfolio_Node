const jwt = require('jsonwebtoken');
const { getUserByEmail, comparePasswords } = require('../models/userModel');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas >:|' });
        }

        // Verificar si el campo "Deleted" en User es True
        if (user.Deleted) {
            return res.status(404).json({ message: 'Este usuario ha sido Eliminado *o*' });
        }

        // Verificar la contraseña
        const isMatch = await comparePasswords(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas >:|' });
        }

        // Generar token
        const token = jwt.sign(
            { userId: user.Id, email: user.Email, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({ 
            token,
            user: {
                id: user.Id,
                email: user.Email,
                firstName: user.FirstName,
                lastName: user.LastName,
                role: user.Role
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error del servidor *o*' });
    }
};

// exports.login = async (req, res) => {
//     try {
//       // Verifica que el body exista
//       if (!req.body) {
//         return res.status(400).json({ error: 'Cuerpo de la solicitud no proporcionado' });
//       }

//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({ 
//           error: 'Email y contraseña son requeridos',
//           received_body: req.body // Para debugging
//         });
//       }

//       // Resto de tu lógica de login...

//     } catch (error) {
//       console.error('Error en login:', error);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     }
//   };
