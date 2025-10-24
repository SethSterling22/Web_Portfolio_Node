// Definición para uso de paquetes
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const swaggerUi = require('swagger-ui-express'); // Importa swagger-ui-express
const swaggerFile = require('./swagger.json'); // Importa el archivo generado

// Definición de rutas
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Uso de Api Key
const apiKeyAuth = require('./middleware/apiKeyAuth');

const version = "v1";
const app = express();

// Rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// app.use(express.json());

// Middleware de API Key
app.use(`/api/${version}`, apiKeyAuth);

///////////////////////////////// RUTAS //////////////////////////////////////
// Uso de Normal
// app.use(`/api/${version}/users`,userRoutes);
// app.use(`/api/${version}/auth`,authRoutes);
// app.use(`/api/${version}/skills`,skillRoutes);
// app.use(`/api/${version}/experiences`,experienceRoutes);
// app.use(`/api/${verskillsion}/educations`,educationRoutes);
// app.use(`/api/${version}/portfolio`,portfolioRoutes);

// Uso con Swagger
app.use(`/api/${version}`,userRoutes);
app.use(`/api/${version}`,authRoutes);
app.use(`/api/${version}`,skillRoutes);
app.use(`/api/${version}`,experienceRoutes);
app.use(`/api/${version}`,educationRoutes);
app.use(`/api/${version}`,portfolioRoutes);

app.use(`/api/${version}`,contactRoutes);
///////////////////////////////// RUTAS //////////////////////////////////////


// Servir swagger.json
app.get(`/api/${version}/swagger.json`, (req, res) => {
  const filePath = path.join(__dirname, 'swagger.json');
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(filePath);
});

app.use(`/api/${version}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal! :^(' });
});


module.exports = app;