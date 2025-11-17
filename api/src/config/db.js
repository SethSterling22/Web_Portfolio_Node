// require('dotenv').config();
// Leer las variables de entorno del escritorio raíz
require('dotenv').config({ path: '.env' });

// For PostgreSQL (must change "connection.request().query"
// to "connection.query()"  in the Models when use "pg")

// And replace .request() with .query()
// const result = await pool.query(queryText, values);
//const { Pool } = require('pg');


// For Mysql
const sql = require('mssql');

// Config for MySQL
const config = {
    user: process.env.MY_DB_USER,
    password: process.env.MY_DB_PASSWORD,
    server: process.env.MY_DB_SERVER,
    database: process.env.MY_DB_DATABASE,
    port: parseInt(process.env.MY_DB_PORT, 10) || 3306,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
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


// Connect to MySQL
async function connectDB() {
    try {
        let connection = await sql.connect(config);
        console.log('Connected to MySQL Database');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
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

