const {parse} = require('url')

module.exports = parameterName =>
  req => parse(req.url, true).query[parameterName]
