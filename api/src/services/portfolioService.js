const portfolioModel = require('../models/portfolioModel');
const User = require('../models/userModel');

exports.getPortfolio = async (UserId, res) => {
  try {
    const user = await User.getUserById(UserId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

    const portfolio = await portfolioModel.getPortfolio(UserId);
    res.status(200).json({ message: `El Portafolio del Usuario con el Id: ${UserId} es: `, portfolio});
  } catch (err) {
  res.status(404).json({ message: err.message });
  }
};