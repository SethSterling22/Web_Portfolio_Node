const { getContactsByUserEmail, createContact, deleteContact } = require('../models/contactModel');
const User = require('../models/userModel');


// Devuelve los emails si son del email del usuario
exports.getContacts = async (userId, res) => {
    try {
        const user = await User.getUserById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

        // console.log(user.email)
        const contacts = await getContactsByUserEmail(user.Email);
        // console.log(contacts)
        res.status(200).json(contacts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


exports.addContact = async (UserId, data, res) => {
    try {
        // console.log("holaaaaaaaaaa")
        // console.log(UserId)
        const user = await User.getUserById(UserId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

        // Rompe el formato :p
        
        const { email, message } = data;
        const newContact = { email, message};
        // console.log(UserId)
        const contact = await createContact(UserId, newContact);
        res.status(201).json({message: 'Contacto añadido con éxito:', contact });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteContact = async (req, UserId, id, res) => {
    try {
        // Verificar que el usuario existe
        const user = await User.getUserById(UserId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado :/' });
        }

        // Obtiene los contactos del usuario
        const messages = await getContactsByUserEmail(user.Email);
        
        // Verifica si el contacto existe y comparar el E-mail
        const contactToDelete = messages.find(contact => contact.Id === id);
        if (contactToDelete && user.Email !== contactToDelete.UserEmail && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'No está autorizado para eliminar este contacto >:|' });
        }

        // console.log(userIdFromContact.email)
        await deleteContact( id );
        res.status(200).json({message: `Contacto con Id: ${id} ha sido removida`});
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el Contacto :c', error: error.message });
    }
};

