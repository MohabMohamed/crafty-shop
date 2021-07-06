const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const OrderItem = sequelize.define(
  'OrderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
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
    tableName: 'OrderItem',
    updatedAt: false
  }
)

OrderItem.associate = models => {
  OrderItem.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  OrderItem.belongsTo(models.Order, {
    foreignKey: 'orderId',
    as: 'order',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = OrderItem
