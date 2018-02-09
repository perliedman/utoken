const {send} = require('micro')
const getQueryParameter = require('./get-query-parameter')

const defaultOptions = {
  tokenAccessFn: getQueryParameter('access_token'),
  tokenValidatorFn: () => false,
  failFn: res => send(res, 401, {error: 'Missing or invalid access token'})
}

module.exports = (handler, options) => {
  options = {...defaultOptions, ...options}

  return async (req, res) => {
    const token = options.tokenAccessFn(req)

    if (options.tokenValidatorFn(token)) {
      return await handler(req, res)
    }

    return options.failFn(res)
  }
}