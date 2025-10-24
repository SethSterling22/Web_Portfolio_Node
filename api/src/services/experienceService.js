const { getUserByExperienceId, getExperiencesByUser, getExperienceById, createExperience, updateExperience, deleteExperience } = require('../models/experienceModel');
const User = require('../models/userModel');


// Trae las Experiencias del usuario por su Id
exports.getExperiencesByUser = async (UserId, res) => {
  try {
    const user = await User.getUserById(UserId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

    const experiences = await getExperiencesByUser(UserId);
    res.status(200).json(experiences);
  } catch (err) {
  res.status(404).json({ message: err.message });
  }
};

// Añadir experiencia
exports.addExperience = async (UserId, experienceData, res) => {
  try {
    const user = await User.getUserById(UserId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

    const experience = await createExperience(UserId, experienceData);
    res.status(201).json({message: 'Experiencia añadida con éxito:', experience });

  } catch (err) {
    res.status(400).json({ message: err.message });
}
};



exports.updateExperience = async (req, UserId, experienceId, data, res) => {
  try {
    const experience = await getExperienceById( UserId, experienceId );
    if (!experience) return res.status(404).json({ message: "Experiencia no encontrada :/" });

    // Verificar que esa skill le pertenezca al usuario
    const userIdFromExperience = await getUserByExperienceId(experienceId);

    if (userIdFromExperience !== parseInt(UserId) && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No está autorizado para actualizar este Skill >:|' });
    }

    await updateExperience( UserId, experienceId, data );
    res.status(200).json({message: `Experiencia con Id: ${experienceId} ha sido actualizada`});
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la Experiencia :c', error: error.message });
  }
};


exports.deleteExperience = async (req, UserId, experienceId, res) => {
  try {
    const experience = await getExperienceById( UserId, experienceId );
    if (!experience) return res.status(404).json({ message: "Experiencia no encontrada :/" });

    // Verificar que esa skill le pertenezca al usuario
    const userIdFromExperience = await getUserByExperienceId(experienceId);

    if (userIdFromExperience !== parseInt(UserId) && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No está autorizado para actualizar este Skill >:|' });
    }

    await deleteExperience( UserId, experienceId );
    res.status(200).json({message: `Experiencia con Id: ${experienceId} ha sido removida`});
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la Experiencia :c', error: error.message });
  }
};

