const express = require('express')

const app = express()

if (process.env.NODE_ENV === 'dev') {
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = require('./swagger-docs')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

app.use(express.json())

module.exports = app
