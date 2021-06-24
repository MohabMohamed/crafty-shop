const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const sequelize = require('../db/db')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  },
  {
    tableName: 'User',
    hooks: {
      beforeSave: async (user, options) => {
        const hash = await bcrypt.hash(user.password, 8)
        user.password = hash
        user.email = user.email.toLowerCase()
      },
      beforeUpdate: async (user, options) => {
        const { _previousDataValues: previousValues, dataValues } = user
        if (
          await !bcrypt.compare(dataValues.password, previousValues.password)
        ) {
          const hash = await bcrypt.hash(user.password, 8)
          user.password = hash
        }
        user.email = user.email.toLowerCase()
      }
    }
  }
)

User.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

User.associate = models => {
  User.hasOne(models.Cart, {
    foreignKey: 'userId',
    as: 'cart',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  User.hasOne(models.UserAddress, {
    foreignKey: 'userId',
    as: 'userAddress',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
  User.hasOne(models.Seller, {
    foreignKey: 'userId',
    as: 'seller',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  User.hasMany(models.RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshToken',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  User.hasMany(models.Order, {
    foreignKey: 'userId',
    as: 'order',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })

  User.belongsTo(models.UserType, {
    foreignKey: 'userType',
    as: 'userType',
    onUpdate: 'cascade',
    onDelete: 'SET NULL'
  })
}

module.exports = User
