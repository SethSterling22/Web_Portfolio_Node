const { connectDB, sql } = require('../config/db');

async function getDegreeById(id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
        // let result = connection.request()
            .input('Id', sql.Int, id)
            .query('SELECT TOP 1 * FROM [Degree] WHERE Id = @Id');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getAllDegrees() {
    try {
        let connection = await connectDB();
        let result = await connection.request()
        // let result = connection.request()
            .query('SELECT * FROM [Degree]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getDegreeById, getAllDegrees };