const skillService = require("../services/skillService");

exports.getSkillsByUser = async (req, res) => {
    const skills = await skillService.getSkills(req.params.userId, res);
    return skills;
};

exports.addSkill = async (req, res) => {
    const newSkill = await skillService.addSkill(req.params.userId, req.body, res);
    return newSkill;
};

exports.updateSkill = async (req, res) => {
    const updatedSkill = await skillService.updateSkill(req, req.params.userId, req.params.id, req.body, res);
    return updatedSkill;
};

exports.deleteSkill = async (req, res) => {
    const deletedSkill = await skillService.deleteSkill(req, req.params.userId, req.params.id, res);
    return deletedSkill;
};