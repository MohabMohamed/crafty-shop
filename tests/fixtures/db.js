const User = require('../../src/models/user')
const db = require('../../src/db/index')

const firstUser = {
  firstName: 'mohab',
  lastName: 'Abd El-Dayem',
  email: 'qqnnaawqajn1i@oq7fffffo.com',
  password: '1234b0i@(bvw',
  phoneNumber: '01048486',
  userAddress: {
    addressLine: 'street 5, Nasr city',
    city: 'cario',
    postalCode: '18716',
    country: 'Egypt'
  }
}

const setupDatabase = async () => {
  await User.destroy({ where: {} })
  await User.create(firstUser, {
    include: ['userAddress']
  })
}

const cleanDB = async () => {
  db.sequelize.close()
}

module.exports = { firstUser, setupDatabase, cleanDB }
