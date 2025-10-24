const { connectDB, sql } = require('../config/db');


async function getUserByExperienceId(id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .query('SELECT UserId FROM [Experience] WHERE Id = @id');

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

async function getExperiencesByUser(UserId) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('UserId', sql.Int, UserId)
            .query('SELECT * FROM [Experience] WHERE UserId = @UserId');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getExperienceById(userId, id) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .input('UserId', sql.Int, userId)
            .query('SELECT TOP 1 * FROM [Experience] WHERE Id = @Id AND UserId = @UserId');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createExperience(userId, experienceData) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('UserId', sql.Int, userId)
            .input('jobTitle', sql.VarChar, experienceData.jobTitle)
            .input('company', sql.VarChar, experienceData.company)
            .input('description', sql.VarChar, experienceData.description || '')
            .input('startDate', sql.Date, experienceData.startDate)
            .input('endDate', sql.Date, experienceData.endDate || null)
            .input('isProject', sql.Bit, experienceData.isProject || false)
            .query(`
                INSERT INTO [Experience] (UserId, JobTitle, Company, Description, StartDate, EndDate, IsProject)
                VALUES (@UserId, @jobTitle, @company, @description, @startDate, @endDate, @isProject);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function updateExperience( UserId, id, experienceData) {
    try {
        let updates = [];
        let inputs = { id: { type: sql.Int, value: id }, userId: { type: sql.Int, value: UserId } };

        // console.log(UserId)
        // console.log(id)
        // console.log(experienceData.company)

        if (experienceData.jobTitle) {
            updates.push('JobTitle = @jobTitle');
            inputs.jobTitle = { type: sql.VarChar, value: experienceData.jobTitle };
        }
        if (experienceData.company) {
            updates.push('Company = @company');
            inputs.company = { type: sql.VarChar, value: experienceData.company };
        }
        if (experienceData.description !== undefined) {
            updates.push('Description = @description');
            inputs.description = { type: sql.VarChar, value: experienceData.description };
        }
        if (experienceData.startDate) {
            updates.push('StartDate = @startDate');
            inputs.startDate = { type: sql.Date, value: experienceData.startDate };
        }
        if (experienceData.endDate !== undefined) {
            updates.push('EndDate = @endDate');
            inputs.endDate = { type: sql.Date, value: experienceData.endDate };
        }
        if (experienceData.isProject !== undefined) {
            updates.push('IsProject = @isProject');
            inputs.isProject = { type: sql.Bit, value: experienceData.isProject };
        }

        if (updates.length === 0) throw new Error('No se brindaron campos válidos para actualizar');

        let connection = await connectDB();
        let request = connection.request();
        
        Object.keys(inputs).forEach(key => {
            request.input(key, inputs[key].type, inputs[key].value);
        });

        await request.query(`
            UPDATE [Experience] SET ${updates.join(', ')}
            WHERE Id = @id AND UserId = @userId
        `);
        
        return await getExperienceById( UserId, id );
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteExperience( UserId, id ) {
    try {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .input('UserId', sql.Int, UserId)
            .query('DELETE FROM [Experience] WHERE Id = @Id AND UserId = @UserId');
        
        if (result.rowsAffected[0] === 0) {
            throw new Error('Experiencia o Usuario no encontrados :/');
        }
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getUserByExperienceId, getExperiencesByUser, getExperienceById, createExperience, updateExperience, deleteExperience };