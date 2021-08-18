const fs = require('fs')
const path = require('path')
const sequelize = require('./db')
const modelsDirPath = path.join(__dirname, '../models')

const models = {}

fs.readdirSync(modelsDirPath)
  .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(modelsDirPath, file))
    models[model.name] = model
  })

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

const DB = {
  models,
  initDB: async function () {
    await sequelize.sync()
    await models.UserType.initialize()
  }
}

module.exports = DB
