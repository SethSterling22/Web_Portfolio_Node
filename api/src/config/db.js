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
// const mysql = require('mysql2/promise');
// const sql = {};


// For MSSQL
const sql = require('mssql');


// Config for MySQL
// const config = {
//     user: process.env.MY_DB_USER,
//     password: process.env.MY_DB_PASSWORD,
//     host: process.env.MY_DB_SERVER,
//     database: process.env.MY_DB_NAME,
//     port: parseInt(process.env.MY_DB_PORT, 10) || 3306,
// };

// Config for MSSQL
const config = {
    user: process.env.MS_DB_USER,
    password: process.env.MS_DB_PASSWORD,
    server: process.env.MS_DB_SERVER,
    database: process.env.MS_DB_DATABASE,
    port: parseInt(process.env.MS_DB_PORT, 10),
    options: {
        encrypt: process.env.MS_DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.MS_DB_TRUST_SERVER_CERTIFICATE === 'true'
    }
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



// // Emulate the .request() function
// function mockRequest(pool) {
//     const inputs = {};
    
//     // Object that returns a simulation of Request from mssql
//     const request = {
//         // Simulate input()
//         input: function(name, type, value) {
//             // Save the value by its name 
//             inputs[name] = value; 
//             return this;
//         },
//             query: async function(sqlQuery) {
            
//             let mysqlQuery = sqlQuery;
//             let values = [];

//             // Map the query
//             for (const name in inputs) {
//                 // Replace the name for ?
//                 mysqlQuery = mysqlQuery.replace(new RegExp(`@${name}`), '?');
//                 values.push(inputs[name]);
//             }

//             // Ejecutar la consulta en MySQL
//             // Use execute() of mysql2 for parameterized queries
//             const [rows, fields] = await pool.execute(mysqlQuery, values); 

//             // Return the simulated dataset
//             return {
//                 recordset: rows, 
//                 recordset: rows,
//             };
//         }
//     };

//     return request;
// }


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



// // For MySQL
// async function connectDB() {
//     try {
//         // Conectar usando mysql.createPool
//         let pool = mysql.createPool(config);
        
//         // Probar la conexión
//         await pool.query('SELECT 1'); 

//         console.log('Connected to MySQL Database');
        
// 	// Emulate request for backend
// 	pool.request = function() {
//             return mockRequest(pool);
//         };
// 	return pool;
        
//     } catch (err) {
//         console.error('Database connection failed:', err);
//         throw err; 
//     }
// }

// For DEBUG
console.log('🔌 DEBUG: Database configuration Loaded:', config);


// For PostgreSQL
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


// Connect to MSSQL
async function connectDB() {
    try {
        let connection = await sql.connect(config);
        console.log('Connected to Microsoft SQL Database');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}

module.exports = { connectDB, sql };
// module.exports = { connectDB };