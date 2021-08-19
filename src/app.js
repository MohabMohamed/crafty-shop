const express = require('express')
const cookieParser = require('cookie-parser')
const { NODE_ENV_ENUM, runIfEnv } = require('./util/node-env')
const healthRouter = require('./routers/health')
const userRouter = require('./routers/user')
const db = require('./db/index')
const app = express()

runIfEnv(true, NODE_ENV_ENUM.test, async () => {
  await db.initDB()
})

runIfEnv(false, NODE_ENV_ENUM.dev, () => {
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = require('./swagger-docs')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
})

runIfEnv(false, NODE_ENV_ENUM.prod, () => {
  const helmet = require('helmet')
  console.log('helmet')
  app.use(helmet())
})

app.use(express.json())
app.use(cookieParser())
app.use(healthRouter)
app.use(userRouter)

module.exports = app
