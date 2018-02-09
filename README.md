# µ-token (utoken)

A access token validation middleware for [micro](https://github.com/zeit/micro).

Example:

```js
  const accessTokenMiddleWare = require('utoken')
  const app = require('my-micro-app')

  micro(accessTokenMiddleWare(app))
```

This will create a middleware that will read access tokens from the request's `access_token` query parameter.
By default, all tokens will be rejected, so we will need to specify a function that tests for valid access tokens:

```js
  micro(accessTokenMiddleWare(app, {
    tokenValidatorFn: token => token == '12345'
  }))
```

This will allow the single access token `12345`. For real world use, you might want to look up the token in a database
or something like that.

## Options

There are a couple of options that can be passed to customize the middleware's functionality:

### tokenAccessFn

This function specifies how the access token is extracted from a request; it is a function that will
be passed the HTTP request and should return the token (or `undefined` if not present).

By default, this function will extract the query parameter `access_token` from the request's URL.

### tokenValidatorFn

This function validates an access token and returns `true` if it is a valid token and `false` otherwise.

The default is a function that _always_ returns `false` (rejects all tokens).

### failFn

Called when access token validation fails: returns a HTTP 401 by default with the error message
`"Missing or invalid access token"`.
