const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const UserAddress = sequelize.define(
  'UserAddress',
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
    addressLine: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING(6)
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  },
  {
    tableName: 'UserAddress'
  }
)

UserAddress.associate = models => {
  UserAddress.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'userAddress',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = UserAddress
