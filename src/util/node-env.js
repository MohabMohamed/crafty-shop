const NODE_ENV_ENUM = {
  dev: 'dev',
  test: 'test',
  prod: 'prod'
}

const _actualNodeEnv = process.env.NODE_ENV

function runIfEnv (AllEnvsExcept, envEnum, fn, ...fnPrams) {
  if (_actualNodeEnv === envEnum && AllEnvsExcept === false) {
    return fn(...fnPrams)
  }
  if (_actualNodeEnv !== envEnum && AllEnvsExcept === true) {
    return fn(...fnPrams)
  }
}

module.exports = { NODE_ENV_ENUM, runIfEnv }
