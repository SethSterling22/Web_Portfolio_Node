// require('dotenv').config();
// Leer las variables de entorno del escritorio raíz
require('dotenv').config({ path: '.env' });

// For PostgreSQL (must change "connection.request().query"
// to "connection.query()"  in the Models when use "pg")

// And replace .request() with .query()
// const result = await pool.query(queryText, values);
//const { Pool } = require('pg');


// For Mysql
// const sql = require('mssql');
const mysql = require('mysql2/promise');
const sql = {};


// Config for MySQL
const config = {
    user: process.env.MY_DB_USER,
    password: process.env.MY_DB_PASSWORD,
    host: process.env.MY_DB_SERVER,
    database: process.env.MY_DB_NAME,
    port: parseInt(process.env.MY_DB_PORT, 10) || 3306,
    //options: {
    //    encrypt: process.env.DB_ENCRYPT === 'true',
    //    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    //}
};

// Config for PostgreSQL
// const config = {
//     // PostgreSQL variable
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_SERVER, 
//     database: process.env.DB_DATABASE,
//     port: parseInt(process.env.DB_PORT, 10) || 5432, 
// };



// Emulate the .request() function
function mockRequest(pool) {
    const inputs = {}; // Para almacenar los inputs simulados
    
    // Objeto de retorno que simula el Request de mssql
    const request = {
        // 1. Simular .input('nombre', tipo, valor)
        input: function(name, type, value) {
            // Guardamos el valor por su nombre, ignorando el 'type' ya que MySQL lo infiere.
            inputs[name] = value; 
            return this; // Permite el encadenamiento: .input().input()
        },
        
        // 2. Simular .query('SELECT @nombre, ...')
        query: async function(sqlQuery) {
            
            // Reemplazar los parámetros nombrados de MSSQL (@nombre) 
            // por parámetros posicionales de MySQL (?)
            let mysqlQuery = sqlQuery;
            let values = [];
            
            // Mapeamos los inputs y reemplazamos @nombre en la consulta.
            for (const name in inputs) {
                // Reemplaza la primera ocurrencia de @nombre por ?
                mysqlQuery = mysqlQuery.replace(new RegExp(`@${name}`), '?');
                values.push(inputs[name]);
            }
            
            // Ejecutar la consulta en MySQL
            // Usamos execute() de mysql2 para consultas parametrizadas
            const [rows, fields] = await pool.execute(mysqlQuery, values); 
            
            // Devolver un objeto que simule el resultado de mssql (recordset)
            return {
                // MySQL devuelve las filas directamente
                recordset: rows, 
                // MySQL devuelve el ID de la última inserción en el campo insertId
                recordset: rows,
                // El resultado de la inserción se maneja aquí:
                // Si la consulta es INSERT, rows.insertId contendrá el ID.
            };
        }
    };
    
    return request;
}


// Connect to MySQL
//async function connectDB() {
//    try {
//        let connection = await sql.connect(config);
//        console.log('Connected to MySQL Database');
//        return connection;
//    } catch (err) {
//        console.error('Database connection failed:', err);
//        process.exit(1);
//    }
//}

async function connectDB() {
    try {
        // Conectar usando mysql.createPool
        let pool = mysql.createPool(config);
        
        // Probar la conexión
        await pool.query('SELECT 1'); 

        console.log('Connected to MySQL Database');
        
	// Emulate request for backend
	pool.request = function() {
            return mockRequest(pool);
        };
	return pool;
        
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err; 
    }
}

// For DEBUG
console.log('🔌 DEBUG: Database configuration Loaded:', config);

// async function connectDB() {
//     const pool = new Pool(config);

//     try {
//         await pool.query('SELECT 1'); // Test connection
//         console.log('Connected to PostgreSQL Database'); 
//         return pool; 
//     } catch (err) {
//         console.error('Database connection failed:', err);
//         process.exit(1);
//     }
// }

module.exports = { connectDB, sql };
// module.exports = { connectDB };

