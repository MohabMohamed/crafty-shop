const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const CartItem = sequelize.define(
  'CartItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'CartItem',
    updatedAt: false
  }
)

CartItem.associate = models => {
  CartItem.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  CartItem.belongsTo(models.Cart, {
    foreignKey: 'cartId',
    as: 'cart',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = CartItem
