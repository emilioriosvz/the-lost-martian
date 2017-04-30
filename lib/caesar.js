'use strict'

const decrypt = function (text, displacement) {
  var plaintext = ''
  for (var i = 0; i < text.length; i++) {
    var character = text.charCodeAt(i)
    if (character >= 97 && character <= 122) {
      plaintext += String.fromCharCode((character - 97 - displacement + 26) % 26 + 97)
    } else if (character >= 65 && character <= 90) {
      plaintext += String.fromCharCode((character - 65 - displacement + 26) % 26 + 65)
    } else {
      plaintext += String.fromCharCode(character)
    }
  }

  return plaintext
}

const encrypt = function (text, displacement) {
  var encryptedText = ''
  for (var i = 0; i < text.length; i++) {
    var plainCharacter = text.charCodeAt(i)
    if (plainCharacter >= 97 && plainCharacter <= 122) {
      encryptedText += String.fromCharCode((plainCharacter - 97 + displacement) % 26 + 97)
    } else if (plainCharacter >= 65 && plainCharacter <= 90) {
      encryptedText += String.fromCharCode((plainCharacter - 65 + displacement) % 26 + 65)
    } else {
      encryptedText += String.fromCharCode(plainCharacter)
    }
  }

  return encryptedText
}

module.exports = { decrypt, encrypt }
