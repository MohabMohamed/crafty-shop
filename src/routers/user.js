const express = require('express')
const User = require('../models/user')
const rules = require('../middleware/validators/user-rules')
const validate = require('../middleware/validators/validator')
const router = new express.Router()

router.post('/user', rules.PostUserRules(), validate, async (req, res) => {
  try {
    const userAttributes = [
      'firstName',
      'lastName',
      'email',
      'password',
      'phoneNumber'
    ]
    const addressAttributes = ['addressLine', 'city', 'postalCode', 'country']
    const user = {}
    const address = {}

    userAttributes.forEach(attr => {
      if (req.body[attr]) user[attr] = req.body[attr]
    })
    addressAttributes.forEach(attr => {
      if (req.body[attr]) address[attr] = req.body[attr]
    })

    const newUser = await User.register(user, address)

    const accessToken = await User.generateJWTToken(
      user,
      process.env.ACCESS_JWT_SECRET,
      Number(process.env.ACCESS_TOKEN_LIFE_SPAN)
    )

    res.cookie('accessToken', accessToken, {
      maxAge: Number(process.env.ACCESS_TOKEN_LIFE_SPAN),
      httpOnly: true
    })

    const refreshToken = newUser.refreshToken[0].dataValues.token

    res.cookie('refreshToken', refreshToken, {
      maxAge: Number(process.env.REFRESH_TOKEN_LIFE_SPAN),
      httpOnly: true
    })

    res.status(201).send(newUser)
  } catch (e) {
    const statusCode = e.code || 400
    res.status(statusCode).send(e)
  }
})

module.exports = router
