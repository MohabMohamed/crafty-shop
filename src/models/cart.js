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
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  Cart.hasMany(models.CartItem, {
    foreignKey: 'cartId',
    as: 'cartItem',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = Cart
