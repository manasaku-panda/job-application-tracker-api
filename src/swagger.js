const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Application Tracker API",
            description: "Track job applications → companies → roles → status → notes → progress",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3005/api/v1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [__dirname + "/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(option)

module.exports = {
    swaggerUi,
    swaggerSpec
};