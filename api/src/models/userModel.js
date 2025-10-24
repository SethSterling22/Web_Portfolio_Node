const { connectDB, sql } = require('../config/db');

// Varibales para la contraseña
const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function getUsers() {
    try {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [User]');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}


async function getUserById(id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .query('SELECT TOP 1 * FROM [User] WHERE Id = @Id');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

// Se utiliza en la comprobación de existencia de usuario
async function getUserByEmail(email) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Email', sql.VarChar, email)
            .query('SELECT * FROM [User] WHERE Email = @Email');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}


async function createUser(data) {
    try {
        // Realiza Hash a la contraseña
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        // console.log(hashedPassword)

        let connection = await connectDB();
        let result = await connection.request()
            .input('email', sql.VarChar, data.email)
            .input('password', sql.VarChar, hashedPassword)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role || 'user')
            .input('lastlogin', sql.DateTime2, new Date())
            .input('registeredon', sql.DateTime2, new Date())
            .query(`
                INSERT INTO [User] (Email, Password, FirstName, LastName, Role, LastLogin, RegisteredOn)
                VALUES (@email, @password, @firstname, @lastname, @role, @lastlogin, @registeredon);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    } catch (err) {
        throw new Error(err.message);
    } 
}


// Update con Validaciones de campos vacíos
async function updateUser(id, data) {

    try {
        let updates = [];
        let inputs = { id: { type: sql.Int, value: id } };

        if (data.email) {
            updates.push('email = @email');
            inputs.email = { type: sql.VarChar, value: data.email };
        }
        if (data.firstName) {
            updates.push('firstName = @firstname');
            inputs.firstname = { type: sql.VarChar, value: data.firstName };
        }
        if (data.lastName) {
            updates.push('lastName = @lastname');
            inputs.lastname = { type: sql.VarChar, value: data.lastName };
        }
        if (data.role) {
            updates.push('role = @role');
            inputs.role = { type: sql.VarChar, value: data.role };
        }

        // Añadir la descripción
        if (data.description) {
            updates.push('description = @description');
            inputs.description = { type: sql.VarChar, value: data.description };
        }
        // console.log(data.deleted)
        
        if (data.deleted) {
            updates.push('deleted = @deleted');
            inputs.deleted = { type: sql.Int, value: data.deleted };
        }

        if (updates.length === 0) throw new Error('No se brindaron campos válidos para actualizar');

        let connection = await connectDB();
        let request = connection.request();
        
        // Añade los inputs que se enviaron al query
        Object.keys(inputs).forEach(key => {
            request.input(key, inputs[key].type, inputs[key].value);
        });

        await request.query(`
            UPDATE [User] SET ${updates.join(', ')}
            WHERE Id = @id
        `);
        
        return true;
    } catch (err) {
        throw new Error(err.message);
    } 
}


async function deleteUser(id) {
    try {
        let connection = await connectDB();
        await connection.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM [User] WHERE Id = @Id');
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}


async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail, comparePasswords };