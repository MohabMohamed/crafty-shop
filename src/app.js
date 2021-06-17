const express = require('express')
const helmet = require('helmet')
const healthRouter = require('./routers/health')

const app = express()

if (process.env.NODE_ENV === 'dev') {
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = require('./swagger-docs')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

app.use(helmet())
app.use(express.json())
app.use(healthRouter)

module.exports = app
