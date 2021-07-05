const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const ProductCategory = sequelize.define(
  'ProductCategory',
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
    }
  },
  {
    tableName: 'ProductCategory'
  }
)

ProductCategory.associate = models => {
  ProductCategory.hasMany(models.Product, {
    foreignKey: 'productCategoryId',
    as: 'productCategory',
    onUpdate: 'cascade',
    onDelete: 'SET NULL'
  })
}

module.exports = ProductCategory
