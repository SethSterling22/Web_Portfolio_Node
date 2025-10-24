const contactService = require("../services/contactService");


// Devuelve los emails si son del email del usuario
exports.getContactsByUser = async (req, res) => {
    const contacts = await contactService.getContacts(req.params.userId, res);
    return contacts;
};

exports.addContact = async (req, res) => {
    const newContact = await contactService.addContact(req.params.userId, req.body, res);
    return newContact;
};

// exports.updateSkill = async (req, res) => {
//     const updatedSkill = await contactService.updateSkill(req, req.params.userId, req.params.id, req.body, res);
//     return updatedSkill;
// };

exports.deleteContact = async (req, res) => {
    const deletedContact = await contactService.deleteContact(req, req.params.userId, req.params.id, res);
    return deletedContact;
};