const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Seller = sequelize.define(
  'Seller',
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
    tableName: 'Seller',
    updatedAt: false
  }
)

Seller.associate = models => {
  Seller.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = Seller
