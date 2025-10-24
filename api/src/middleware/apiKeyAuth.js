require('dotenv').config();

const ApiKey = process.env.API_KEY;

function apiKeyAuth(req, res, next) {
    const apiKey = req.get('X-API-KEY') || req.query.apiKey;
    
    if (!apiKey) {
        return res.status(401).json({ error: 'API Key no proporcionada >:/' });
    }
    
    if (apiKey !== ApiKey) {
        return res.status(403).json({ error: 'API Key inválida >:C' });
    }
    
    next();
}

module.exports = apiKeyAuth;
