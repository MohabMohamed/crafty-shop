const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  info: {
    title: 'REST API for Crafty-shop',
    version: '1.0.0',
    description: 'An e-commerce website for hand crafts'
  },
  host: 'localhost:3000'
}

const options = {
  swaggerDefinition,
  apis: ['./src/docs/**/*.yaml']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
