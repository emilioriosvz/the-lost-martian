'use strict'

const config = require('../config')
const request = require('request')
const caesar = require('./caesar')

const authenticate = function (username, password) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'POST',
      url: `${config.url}/login`,
      body: { username, password },
      json: true
    }

    request(options, function (error, response, body) {
      if (error) return reject(error)
      if (body.status && body.status !== 200) return reject(body.message)
      resolve(body)
    })
  })
}

const getTheMessage = function (auth) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: `${config.url}/api/v1/message/send/hello`,
      headers: {
        'x-key': 'candidate',
        'x-access-token': auth.token
      }
    }

    request(options, function (error, response, body) {
      if (error) return reject(error)
      if (typeof body === 'string') body = JSON.parse(body)
      if (body.status !== 'OK') return reject(body.message)

      let opts = {auth, communication: body}
      resolve(opts)
    })
  })
}

const sendAnswer = function ({ auth, communication }) {
  let text = communication.message
  let displacement = communication.hint.displacement
  let message = caesar.decrypt(text, displacement)

  console.log('-', message, '\n')
  console.log('+', 'Earth', '\n')

  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: `${config.url}/api/v1/message/send/`,
      headers: {
        'x-key': 'candidate',
        'x-access-token': auth.token
      },
      body: { answer: caesar.encrypt('Earth', displacement) },
      json: true
    }

    request(options, function (error, response, body) {
      if (error) return reject(error)
      if (body.status !== 'OK') return reject(body.message)

      console.log('-', body.message, '\n')

      let opts = { auth, communication, response: body }

      resolve(opts)
    })
  })
}

module.exports = {authenticate, getTheMessage, sendAnswer}
