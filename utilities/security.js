const config = require('../config');

function encriptar(text) {
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha1', config.SecretKey).update(text).digest('hex')
    return hmac
}

module.exports = {
  encriptar
}