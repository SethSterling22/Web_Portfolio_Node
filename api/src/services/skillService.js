const { getUserBySkillId, getSkillById, getSkillsByUser, createSkill, updateSkill, deleteSkill } = require('../models/skillModel');
const User = require('../models/userModel');



exports.getSkillById = async (userId, req, res) => {
    try {
        const user = await User.getUserById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

        // console.log(req.params.skillId, userId);
        const skills = await getSkillById(req.params.skillId, userId);
        res.status(200).json(skills);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Trae las habilidades del usuario por su Id
exports.getSkills = async (userId, res) => {
    try {
        const user = await User.getUserById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

        const skills = await getSkillsByUser(userId);
        res.status(200).json(skills);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


exports.addSkill = async (UserId, data, res) => {
    try {
        // console.log("holaaaaaaaaaa")
        // console.log(UserId)
        const user = await User.getUserById(UserId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

        // Rompe el formato :p
        const { name, proficiency } = data;
        const newSkill = { name, proficiency};
        // console.log(UserId)
        const skill = await createSkill(UserId, newSkill);
        res.status(201).json({message: 'Habilidad añadida con éxito:', skill });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateSkill = async (req, UserId, id, data, res) => {
    try {

        // Verificar que esa skill le pertenezca al usuario
        const userIdFromSkill = await getUserBySkillId(id);

        if (userIdFromSkill !== parseInt(UserId) && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'No está autorizado para actualizar este Skill >:|' });
        }

        await updateSkill( UserId, id, data );
        res.status(200).json({message: `Habilidad con Id: ${id} ha sido actualizada`});
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la habilidad :c', error: error.message });
    }
};

exports.deleteSkill = async (req, UserId, id, res) => {
    try {
        // Verificar que esa skill le pertenezca al usuario
        const userIdFromSkill = await getUserBySkillId(id);

        if (userIdFromSkill !== parseInt(UserId) && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'No está autorizado para actualizar este Skill >:|' });
        }
        
        await deleteSkill(UserId, id);
        res.status(200).json({message: `Habilidad con Id: ${id} ha sido removida`});
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la habilidad :c', error: error.message });
    }
};

