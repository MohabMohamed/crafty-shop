const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const UserType = sequelize.define(
  'UserType',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    tableName: 'UserType'
  }
)

UserType.associate = models => {
  UserType.hasMany(models.User, {
    foreignKey: 'userTypeId',
    as: 'userType',
    onUpdate: 'cascade',
    onDelete: 'SET NULL'
  })
}

module.exports = UserType
