const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

function generateSwagger(title, version, routes) {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: title,
        version: version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: routes, // Path to your route files
  };

  return swaggerJsdoc(swaggerOptions);
}

function serveSwagger(app, swaggerSpec, route) {
  app.use(route, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = { generateSwagger, serveSwagger };