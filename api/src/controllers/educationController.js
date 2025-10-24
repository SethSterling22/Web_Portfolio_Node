const educationService = require("../services/educationService");

exports.getEducation = async (req, res) => {
    const education = await educationService.getEducation(req.params.userId, res);
    return education;
};

exports.addEducation = async (req, res) => {
    const newEducation = await educationService.addEducation(req.params.userId, req.body, res);
    return newEducation;
};

exports.updateEducation = async (req, res) => {
    const updatedEducation = await educationService.updateEducation(req, req.params.userId, req.params.id, req.body, res);
    return updatedEducation;
};

exports.deleteEducation = async (req, res) => {
    const deletedEducation = await educationService.deleteEducation(req, req.params.userId, req.params.id, res);
    return deletedEducation;
};

exports.getDegrees = async (req, res) => {
    const degrees = await educationService.getAllDegrees(res);
    return degrees;
};