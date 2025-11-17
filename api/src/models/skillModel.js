const { connectDB, sql } = require('../config/db');


async function getUserBySkillId(id) {
    try {
        let connection = await connectDB();
        // let result = await connection.request()
        let result = await connection
            .input('id', sql.Int, id)
            .query('SELECT UserId FROM [Skill] WHERE Id = @id');
        
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


async function getSkillsByUser(userId) {
    try {
        let connection = await connectDB();
        // let result = await connection.request()
        let result = await connection
            .input('UserId', sql.Int, userId)
            .query('SELECT * FROM [Skill] WHERE UserId = @UserId');
        return result.recordset;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getSkillById(id, userId) {
    try {
        let connection = await connectDB();
        // let result = await connection.request()
        let result = await connection
            .input('Id', sql.Int, id)
            .input('UserId', sql.Int, userId)
            .query('SELECT TOP 1 * FROM [Skill] WHERE Id = @Id AND UserId = @UserId');
        return result.recordset[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createSkill(userId, data) {
    // console.log("osufhgodifsvnin")
    try {
        let connection = await connectDB();
        // let result = await connection.request()
        let result = await connection
            .input('UserId', sql.Int, userId)
            .input('name', sql.VarChar, data.name)
            .input('proficiency', sql.VarChar, data.proficiency)
            .query(`
                INSERT INTO [Skill] (UserId, Name, Proficiency)
                VALUES (@UserId, @name, @proficiency);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        // console.log("yeii");
        return result.recordset[0].Id;
    } catch (err) {
        // console.log("meh");
        throw new Error(err.message);
    }
}

async function updateSkill( userId, id, skillData) {
    try {
        let updates = [];
        let inputs = { id: { type: sql.Int, value: id },userId: { type: sql.Int, value: userId } };
        // console.log(skillData.name)
        // console.log(id)
        // console.log(skillData.proficiency)

        if (skillData.name) {
            updates.push('Name = @name');
            inputs.name = { type: sql.VarChar, value: skillData.name };
        }
        if (skillData.proficiency) {
            updates.push('Proficiency = @proficiency');
            inputs.proficiency = { type: sql.VarChar, value: skillData.proficiency };
        }

        if (updates.length === 0) throw new Error('No se brindaron campos válidos para actualizar');

        let connection = await connectDB();
        let request = connection.request();
        
        Object.keys(inputs).forEach(key => {
            request.input(key, inputs[key].type, inputs[key].value);
        });

        await request.query(`
            UPDATE [Skill] SET ${updates.join(', ')}
            WHERE Id = @id AND UserId = @userId
        `);
        
        return await getSkillById(id, userId);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteSkill( UserId, id ) {
    try {
        let connection = await connectDB();
        // let result = await connection.request()
        let result = await connection
            .input('Id', sql.Int, id)
            .input('UserId', sql.Int, UserId)
            .query('DELETE FROM [Skill] WHERE Id = @Id AND UserId = @UserId');
        
        if (result.rowsAffected[0] === 0) {
            throw new Error('Habilidad o usuario no encotrados *.*');
        }
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getSkillsByUser, getSkillById, createSkill, updateSkill, deleteSkill, getUserBySkillId };