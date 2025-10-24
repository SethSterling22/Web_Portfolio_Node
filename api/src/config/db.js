// require('dotenv').config();
// Leer las variables de entorno del escritorio raíz
require('dotenv').config({ path: '../.env' });
const sql = require('mssql');

// Configuración de la base de datos
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    }
};

// Conectar a Azure SQL
async function connectDB() {
    try {
        let connection = await sql.connect(config);
        console.log('Connected to Azure SQL Database');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}

module.exports = { connectDB, sql };