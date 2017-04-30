'use strict'

const test = require('tape')
const { authenticate, getTheMessage, sendAnswer } = require('../lib/communicator')

const setup = () => {
  const fixtures = {}
  fixtures.credentials = {
    username: 'candidate',
    password: 'try'
  }

  return fixtures
}

test('Check the authentication', (assert) => {
  const credentials = setup().credentials
  authenticate(credentials.username, credentials.password)
    .then(response => {
      assert.equal(typeof response.token, 'string', 'token should be a string')
      assert.equal(typeof response.expires, 'number', 'expires should be a number')
      assert.equal(typeof response.user, 'object', 'user should be an object')

      assert.end()
    })
})

test('Receive a message', (assert) => {
  const credentials = setup().credentials
  authenticate(credentials.username, credentials.password)
    .then(getTheMessage)
    .then(response => {
      assert.equal(typeof response.auth, 'object', 'auth should be an object')
      assert.equal(typeof response.communication, 'object', 'communication should be an object')
      assert.equal(typeof response.communication.message, 'string', 'communication should be a  string')
      assert.equal(typeof response.communication.hint, 'object', 'hint should be an object')

      assert.end()
    })
})

test('Send an answer', (assert) => {
  const credentials = setup().credentials
  authenticate(credentials.username, credentials.password)
    .then(getTheMessage)
    .then(sendAnswer)
    .then(response => {
      assert.equal(typeof response.auth, 'object', 'auth should be an object')
      assert.equal(typeof response.communication, 'object', 'communication should be an object')
      assert.equal(typeof response.response, 'object', 'response should be an object')
      assert.equal(typeof response.communication.message, 'string', 'message should be a  string')

      assert.end()
    })
})
