const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const ProductDiscount = sequelize.define(
  'ProductDiscount',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    percent: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'ProductDiscount'
  }
)

ProductDiscount.associate = models => {
  ProductDiscount.belongsTo(models.Product, {
    foreignKey: 'discountId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'SET NULL'
  })
}

module.exports = ProductDiscount
