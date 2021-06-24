const { Sequelize } = require('sequelize')
const User = require('../models/user')

const sequelize = new Sequelize(process.env.DB_URL, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const models = { User }

Object.keys(models).forEach(model => {
  if (model.associate) {
    model.associate(this.models)
  }
})

const initDB = async () => {
  await sequelize.sync()
}

initDB()

module.exports = sequelize
