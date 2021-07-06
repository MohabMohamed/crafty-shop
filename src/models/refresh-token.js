const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const RefreshToken = sequelize.define(
  'RefreshToken',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'RefreshToken'
  }
)

RefreshToken.associate = models => {
  RefreshToken.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = RefreshToken
