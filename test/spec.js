const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise-native')

const accessTokenMiddleWare = require('../')

test('should reject request with missing access token', async t => {
  const service = app()
  const uri = await listen(service)

  try {
    await request({uri})
    t.fail('Expected request to fail since access token is missing')
  } catch (ex) {
    t.is(ex.statusCode, 401)
  }

  service.close()
})

test('should accept request with valid access token', async t => {
  const service = app({
    tokenValidatorFn: token => token == 1
  })
  const uri = await listen(service)

  try {
    debugger
    await request({uri: uri + '/?access_token=1'})
    t.pass()
  } catch (ex) {
    t.fail('Unexpected failure: ' + ex)
  }

  service.close()
})

const app = options =>
  micro(accessTokenMiddleWare((req, res) => micro.send(res, 204), options))
