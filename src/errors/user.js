const existingEmail = () => {
  return {
    code: 409,
    errors: [{ email: 'There is an account with the same email' }]
  }
}

const UnableToLogin = () => {
  return {
    code: 401,
    errors: [{ email: 'Please recheck your email and password' }]
  }
}

module.exports = { existingEmail, UnableToLogin }
