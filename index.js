'use strict'

const {authenticate, getTheMessage, sendAnswer} = require('./lib/communicator')
const config = require('./config')

let username = config.auth.username
let password = config.auth.password

authenticate(username, password)
  .then(getTheMessage)
  .then(sendAnswer)
  .catch(err => console.error(err))
