const existingEmail = () => {
  return { errors: [{ email: 'There is an account with the same email' }] }
}

const UnableToLogin = () => {
  return { errors: [{ email: 'Please recheck your email and password' }] }
}

module.exports = { existingEmail, UnableToLogin }
