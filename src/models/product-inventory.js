const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const ProductInventory = sequelize.define(
  'ProductInventory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: 'ProductInventory'
  }
)

ProductInventory.associate = models => {
  ProductInventory.hasOne(models.Product, {
    foreignKey: 'productInventoryId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = ProductInventory
