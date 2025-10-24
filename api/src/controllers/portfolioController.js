const portfolioService = require("../services/portfolioService");

exports.getPortfolio = async (req, res) => {
    const portfolio = await portfolioService.getPortfolio(req.params.userId, res);
    return portfolio;
};