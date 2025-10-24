const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
    const users = await userService.getAllUsers(res);
    return users;
};

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id, res);
    return user;
};

exports.createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body, res);
    return newUser;
};

exports.updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req, req.params.id, res);
    // Se encarga auth
    // if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado :/" });
    return updatedUser;
};

exports.deleteUser = async (req, res) => {
    const deletedUser = await userService.deleteUser(req, req.params.id, res);
    // Se encarga auth
    // if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado :/" });
    return deletedUser;
};
