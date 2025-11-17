const { connectDB, sql } = require('../config/db');


// Devuelve los emails si son del email del usuario
async function getContactsByUserEmail(email) {
    // console.log(email)
    try {
        let connection = await connectDB();
        let result = await connection.request()
        // let result = await connection
            .input('email', sql.VarChar, email)
            // .query('SELECT * FROM [Contact] WHERE Email = @email');
            .query(`
                SELECT c.*, u.Email AS UserEmail, u.FirstName AS UserFirstName,  u.LastName AS UserLastName
                FROM [Contact] c
                JOIN [User] u ON c.UserId = u.Id
                WHERE c.Email = @email
            `);
        
        // Verificar si se encontraron mensajes
        if (result.recordset && result.recordset.length > 0) {
            return result.recordset; // Retorna todos los mensajes
        } else {
            return []; // Retorna un arreglo vacío si no hay mensajes
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createContact(userId, data) {
    // console.log(data.message);
    const sentDate = new Date(); 
    try {
        let connection = await connectDB();
        let result = await connection.request()
        // let result = await connection
            .input('UserId', sql.Int, userId)
            .input('email', sql.VarChar, data.email)
            .input('message', sql.VarChar, data.message)
            .input('sentDate', sql.Date, sentDate)
            .query(`
                INSERT INTO [Contact] (UserId, Email, Message, SentDate)
                VALUES (@UserId, @email, @message, @sentDate);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        // console.log("yeii");
        return result.recordset[0].Id;
    } catch (err) {
        // console.log("meh");
        throw new Error(err.message);
    }
}

async function deleteContact( id ) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
        // let result = await connection
            .input('id', sql.VarChar, id)
            .query('DELETE FROM [Contact] WHERE Id = @id');
        
        if (result.rowsAffected[0] === 0) {
            throw new Error('Mensaje no encotrados *.*');
        }
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { createContact, deleteContact, getContactsByUserEmail };