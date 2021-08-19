const jwt = require('../util/jwt')
const RefreshToken = require('../models/refresh-token')

const auth = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies

    if (!accessToken) {
      throw new Error()
    }

    const { payload, expired } = jwt.verify(accessToken)

    if (payload) {
      req.accessToken = accessToken
      req.user = payload
      return next()
    }

    if (!expired || !refreshToken) {
      throw new Error()
    }

    const refreshTokenId = jwt.verify(refreshToken)

    const { user, matchedRefreshToken } = await RefreshToken.getUserByToken(
      refreshTokenId,
      refreshToken
    )

    if (!matchedRefreshToken) {
      throw new Error()
    }

    const newAccessToken = jwt.sign(
      { email: user.email, firstName: user.firstName, lastName: user.lastName },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: Number(process.env.ACCESS_TOKEN_LIFE_SPAN) }
    )

    req.accessToken = newAccessToken
    req.user = user
    res.cookie('accessToken', newAccessToken, {
      maxAge: Number(process.env.ACCESS_TOKEN_LIFE_SPAN),
      httpOnly: true
    })
    return next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth
