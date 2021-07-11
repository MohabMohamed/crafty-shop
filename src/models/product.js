const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Product = sequelize.define(
  'Product',
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
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productInventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discountId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'Product'
  }
)

Product.associate = models => {
  Product.belongsTo(models.ProductCategory, {
    foreignKey: 'productCategoryId',
    as: 'productCategory',
    onUpdate: 'cascade',
    onDelete: 'SET NULL'
  })

  Product.belongsTo(models.ProductInventory, {
    foreignKey: 'productInventoryId',
    as: 'productInventory',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  Product.belongsTo(models.Seller, {
    foreignKey: 'sellerId',
    as: 'seller',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  Product.hasMany(models.CartItem, {
    foreignKey: 'productId',
    as: 'cartItem',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  Product.hasMany(models.OrderItem, {
    foreignKey: 'productId',
    as: 'orderItem',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  Product.belongsTo(models.ProductDiscount, {
    foreignKey: 'discountId',
    as: 'productDiscount',
    constraints: false,
    allowNull: true,
    defaultValue: null
  })

  Product.hasMany(models.ProductImage, {
    foreignKey: 'productId',
    as: 'productImage',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = Product
