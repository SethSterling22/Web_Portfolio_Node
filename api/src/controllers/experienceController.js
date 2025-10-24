const experienceService = require("../services/experienceService");

exports.getExperiences = async (req, res) => {
    const experiences = await experienceService.getExperiencesByUser(req.params.userId, res);
    return experiences;
};

exports.addExperience = async (req, res) => {
    const newExperience = await experienceService.addExperience(req.params.userId, req.body, res);
    return newExperience;
};

exports.updateExperience = async (req, res) => {
    const updatedExperience = await experienceService.updateExperience(req, req.params.userId, req.params.id, req.body, res);
    return updatedExperience;
};

exports.deleteExperience = async (req, res) => {
    const deletedExperience = await experienceService.deleteExperience(req, req.params.userId, req.params.id, res);
    return deletedExperience;
};
