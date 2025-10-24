const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_old.json';
const endpointsFiles = ['./routes/*.js']; 

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'Portfolio Student API',
        version: '1.0.0',
        description: 'Un API muy interesante sobre Portafolios de estudiantes y sus carreras.',
    },
    servers: [
        {
            url: 'https://aery.stegosaurus-panga.ts.net/api/v1', // dirección externa del servidor :D
            description: 'Servidor Externo'
        },
        {
            url: 'http://localhost:3001/api/v1',
            description: 'Servidor Local'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ bearerAuth: [] }],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`Documentación generada y guardada en ${outputFile}`);
});
