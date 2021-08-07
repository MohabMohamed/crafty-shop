const jwt = require('jsonwebtoken')

const sign = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

const verify = token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return { payload: decoded, expired: false }
  } catch (e) {
    if (e.message === 'jwt expired') return { payload: null, expired: true }
  }
}

module.exports = { sign, verify }
