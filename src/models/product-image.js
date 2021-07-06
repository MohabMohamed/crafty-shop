const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const ProductImage = sequelize.define(
  'ProductImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    updatedAt: false,
    tableName: 'ProductImage'
  }
)

ProductImage.associate = models => {
  ProductImage.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = ProductImage
