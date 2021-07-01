const express = require('express')
const helmet = require('helmet')
const { NODE_ENV_ENUM, runIfEnv } = require('./util/node-env')
const healthRouter = require('./routers/health')
const db = require('./db/index')
const app = express()

runIfEnv(true, NODE_ENV_ENUM.test, async () => {
  await db.initDB()
})

runIfEnv(false, NODE_ENV_ENUM.dev, () => {
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = require('./swagger-docs')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
})

app.use(helmet())
app.use(express.json())
app.use(healthRouter)

module.exports = app
