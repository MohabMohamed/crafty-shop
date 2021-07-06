const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Order = sequelize.define(
  'Order',
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
    tableName: 'Order'
  }
)

Order.associate = models => {
  Order.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  Order.hasMany(models.OrderItem, {
    foreignKey: 'orderId',
    as: 'orderItem',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = Order
