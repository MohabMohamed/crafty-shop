const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Cart = sequelize.define(
  'Cart',
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
    grandTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    }
  },
  {
    tableName: 'Cart'
  }
)

Cart.associate = models => {
  Cart.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'cart',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = Cart
