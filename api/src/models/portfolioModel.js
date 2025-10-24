const { connectDB, sql } = require('../config/db');
const userModel = require('./userModel');

async function getPortfolio(UserId) {
    try {
        let connection = await connectDB();
        
        const [ user, skills, experience, education] = await Promise.all([
            userModel.getUserById(UserId),
            connection.request()
                .input('UserId', sql.Int, UserId)
                .query('SELECT * FROM [Skill] WHERE UserId = @UserId'),
            connection.request()
                .input('UserId', sql.Int, UserId)
                .query('SELECT * FROM [Experience] WHERE UserId = @UserId'),
            connection.request()
                .input('UserId', sql.Int, UserId)
                .query(`
                    SELECT e.*, d.Name AS DegreeName 
                    FROM [Education] e 
                    LEFT JOIN [Degree] d ON e.DegreeId = d.Id 
                    WHERE e.UserId = @UserId
                `)
        ]);

        if (!user) return res.status(404).json({ message: "Usuario no encontrado :/" });

        return {
            skills: skills.recordset,
            experience: experience.recordset,
            education: education.recordset
        };
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getPortfolio };