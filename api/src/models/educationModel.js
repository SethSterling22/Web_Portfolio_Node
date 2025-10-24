const { connectDB, sql } = require('../config/db');



async function getUserByEducationId(id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .query('SELECT UserId FROM [Education] WHERE Id = @id');

        // Verificar si se encontró usuario
        if (result.recordset && result.recordset.length > 0) {
            return result.recordset[0].UserId; 
        } else {
            return null; 
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


// Conseguir la educación del usuario con sus Degree asociados a la tabla de Education
async function getEducationByUser(userId) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('UserId', sql.Int, userId)
            .query(`
                SELECT e.*, d.Name AS DegreeName 
                FROM [Education] e 
                LEFT JOIN [Degree] d ON e.DegreeId = d.Id 
                WHERE e.UserId = @UserId
            `);
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}


async function getEducationById( userId, id ) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .input('UserId', sql.Int, userId)
            .query(`
                SELECT TOP 1 e.*, d.Name AS DegreeName 
                FROM [Education] e 
                LEFT JOIN [Degree] d ON e.DegreeId = d.Id 
                WHERE e.Id = @Id AND e.UserId = @UserId
            `);
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

// Añadir educación
async function createEducation(UserId, educationData) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('UserId', sql.Int, UserId)
            .input('institution', sql.VarChar, educationData.institution)
            .input('degreeId', sql.Int, educationData.degreeId)
            .input('fieldOfStudy', sql.VarChar, educationData.fieldOfStudy || '')
            .input('startDate', sql.Date, educationData.startDate)
            .input('endDate', sql.Date, educationData.endDate || null)
            .query(`
                INSERT INTO [Education] (UserId, Institution, DegreeId, FieldOfStudy, StartDate, EndDate)
                VALUES (@UserId, @institution, @degreeId, @fieldOfStudy, @startDate, @endDate);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function updateEducation( userId, id, educationData) {
    try {
        let updates = [];
        let inputs = { 
            id: { type: sql.Int, value: id },
            userId: { type: sql.Int, value: userId }
        };

        if (educationData.institution) {
            updates.push('Institution = @institution');
            inputs.institution = { type: sql.VarChar, value: educationData.institution };
        }
        if (educationData.degreeId) {
            updates.push('DegreeId = @degreeId');
            inputs.degreeId = { type: sql.Int, value: educationData.degreeId };
        }
        if (educationData.fieldOfStudy !== undefined) {
            updates.push('FieldOfStudy = @fieldOfStudy');
            inputs.fieldOfStudy = { type: sql.VarChar, value: educationData.fieldOfStudy };
        }
        if (educationData.startDate) {
            updates.push('StartDate = @startDate');
            inputs.startDate = { type: sql.Date, value: educationData.startDate };
        }
        if (educationData.endDate !== undefined) {
            updates.push('EndDate = @endDate');
            inputs.endDate = { type: sql.Date, value: educationData.endDate };
        }

        if (updates.length === 0) throw new Error('No se brindaron campos válidos para actualizar');

        let connection = await connectDB();
        let request = connection.request();
        
        Object.keys(inputs).forEach(key => {
            request.input(key, inputs[key].type, inputs[key].value);
        });

        await request.query(`
            UPDATE [Education] SET ${updates.join(', ')}
            WHERE Id = @id AND UserId = @userId
        `);
        
        return await getEducationById( userId, id );
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteEducation( UserId, id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .input('UserId', sql.Int, UserId)
            .query('DELETE FROM [Education] WHERE Id = @Id AND UserId = @UserId');
        
        if (result.rowsAffected[0] === 0) {
            throw new Error('Educación o usuario no encontrados :/');
        }
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getUserByEducationId, getEducationByUser, getEducationById, createEducation, updateEducation, deleteEducation };