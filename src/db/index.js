const sequelize = require('./db')
const User = require('../models/user')
const models = { User }

Object.keys(models).forEach(model => {
  if (model.associate) {
    // model.associate(this.models)
  }
})

const DB = {
  models,
  initDB: async function () {
    await sequelize.sync()
  }
}

module.exports = DB
