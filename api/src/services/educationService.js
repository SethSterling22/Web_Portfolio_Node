const { getUserByEducationId, getEducationByUser, getEducationById, createEducation, updateEducation, deleteEducation } = require('../models/educationModel');
const User = require('../models/userModel');

// Traer la educación por el Id del usuario
exports.getEducation = async (UserId, res) => {
  try {
    const user = await User.getUserById(UserId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

    const education = await getEducationByUser(UserId);
    res.json(education);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Añadir educación
exports.addEducation = async (UserId, data, res) => {
  try {
    const user = await User.getUserById(UserId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

    const education = await createEducation(UserId, data);
    res.status(201).json({message: 'Educación añadida con éxito:', education });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updateEducation = async (req, UserId, id, data, res) => {
  try {
    const education = await getEducationById( UserId, id );
    if (!education) return res.status(404).json({ message: "Educación no encontrada :/" });

    // Verificar que esa skill le pertenezca al usuario
    const userIdFromEducation = await getUserByEducationId(id);

    if (userIdFromEducation !== parseInt(UserId) && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No está autorizado para actualizar este Skill >:|' });
    }

    await updateEducation( UserId, id, data );
    res.status(200).json({message: `Educación con Id: ${id} ha sido actualizada`});
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la Educación :c', error: error.message });
  }
};


exports.deleteEducation = async (req, UserId, id, res) => {
  try {
    const education = await getEducationById( UserId, id );
    if (!education) return res.status(404).json({ message: "Educación no encontrada :/" });

    // Verificar que esa skill le pertenezca al usuario
    const userIdFromEducation = await getUserByEducationId(id);

    if (userIdFromEducation !== parseInt(UserId) && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No está autorizado para actualizar este Skill >:|' });
    }

    await deleteEducation( UserId, id );
    res.status(200).json({message: `Educación con Id: ${id} ha sido removida`});
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar esta Educación :c', error: error.message });
  }
};
