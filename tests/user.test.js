const request = require('supertest')
const { CookieAccessInfo } = require('cookiejar')
const { setupDatabase, cleanDB } = require('./fixtures/db')
const app = require('../src/app')
const User = require('../src/models/user')
const RefreshToken = require('../src/models/refresh-token')

beforeEach(setupDatabase)
afterAll(cleanDB)

const agent = request.agent(app)

test('Should register new user', async () => {
  const response = await agent.post('/user').send({
    firstName: 'john',
    lastName: 'Doe',
    email: 'Awesome@gmail.com',
    password: '1234bbvw!#',
    phoneNumber: '0100821751',
    addressLine: 'street 7, Nasr city',
    city: 'cario',
    postalCode: '18786',
    country: 'Egypt'
  }).expect(201)
  const user = User.findByPk(response.body.id)
  expect(user).not.toBeNull()

  expect(response.body).toMatchObject({
    firstName: 'john',
    lastName: 'doe',
    email: 'awesome@gmail.com'
  })

  const accessInfo = CookieAccessInfo()
  const ResponseRefreshToken = agent.jar.getCookie('refreshToken', accessInfo).value
  const refreshToken = await RefreshToken.findOne({
    where: {
      userId: parseInt(response.body.id),
      token: ResponseRefreshToken
    }
  })

  expect(refreshToken).not.toBeNull()
  expect(refreshToken.getDataValue('token')).toBe(ResponseRefreshToken)
})
