const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const RefreshToken = sequelize.define(
  'RefreshToken',
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
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'RefreshToken'
  }
)

RefreshToken.getUserByToken = async (refreshTokenId, refreshToken) => {
  const matchedRefreshToken = await RefreshToken.findOne({
    where: {
      id: parseInt(refreshTokenId),
      token: refreshToken
    },
    include: 'user'
  })
  return { user: matchedRefreshToken.user, matchedRefreshToken }
}

RefreshToken.associate = models => {
  RefreshToken.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
}

module.exports = RefreshToken
