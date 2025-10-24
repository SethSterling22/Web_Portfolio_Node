const { getUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = require("../models/userModel");

const jwt = require('jsonwebtoken');

exports.getAllUsers = async (res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'Usuarios no encontrados :O', error: error.message });
    }
}

exports.getUserById = async (id, res) => {
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error trayendo al usuario :c', error: error.message });
    }
}


exports.createUser = async (data, res) => {
    const { email, password, firstName, lastName, role } = data;

    // Validación de usuario existente y creación de Token
    try {
        // Verifica si el usuario existe
        let user = await getUserByEmail(email);
        if (user) return res.status(400).json({ message: 'El usuario ya existe :/' });
        
        // console.log(password)

        // Crear el usuario
        const newUser = {
            email,
            password,
            firstName,
            lastName,
            role,
        };

        const userId = await createUser(newUser);
        // console.log(":D")

        // Generar Token
        const token = jwt.sign(
            { userId, email, role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // console.log("JWT creado")
        // return { userId, token };
        res.status(201).json({message: 'Usuario creado con éxito, aquí tiene su Token:', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error del servidor *o*' });
    }
};


exports.updateUser = async (req, id, res) => {
    try {
        // Permite editar si es su propia cuenta o si su rol es admin
        // console.log(req.user.role)
        if (req.user.userId !== parseInt(id) && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'No está autorizado para actualizar este usuario >:|' });
        }

        // Verificar que el Email no se quiera cambiar por el de otro usuario y si no es el propio
        // console.log(email)
        const existingUser = await getUserByEmail(req.body.email); 
        if (existingUser && existingUser.Id != id) { 
            return res.status(400).json({ message: `El Email: ${email} ya está en uso, favor escoger otro *o*`});
        }

        await updateUser(id, req.body);
        res.status(200).json({message: `Usuario con Id: ${id} ha sido actualizado`});
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando el usuario :c', error: error.message });
    }
}

exports.deleteUser = async (req, id, res) => {
    try {
        // Solamente el Usuario dueño de la cuenta puede eliminarla o un Admin
        if (req.user.userId !== parseInt(id) && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'No está autorizado para eliminar este usuario >:|' });
        }

        await deleteUser(id);
        res.status(200).json({message: `Usuario con Id: ${id} ha sido removido`});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario :c', error: error.message });
    }
}