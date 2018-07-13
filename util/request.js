const crypto      = require('crypto');
const request     = require('request');
const {KRYPTONO}  = require('config');
const jwt         = require('../util/jwt');

 function makeKryptonoRequest(opt = {}) {
  return jwt.verifyTokenWithKey(KRYPTONO.KRYPTONO_TOKEN, KRYPTONO.KRYPTONO_KEY)
    .then(kryptono => {
      const hash = crypto.createHmac('sha256', kryptono.secret);
      const signature = hash.update(JSON.stringify(opt.body || {})).digest('hex');
      // create a options of request
      const options = Object.assign({
        headers:
        {
          'X-Requested-With': 'XMLHttpRequest',
          'Signature': signature,
          'Content-Type': 'application/json',
          'Authorization': kryptono.auth
        },
      json: true
      }, opt);
      return options;
    })
    .then (options => {
      return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if(error) return reject(error);
          // TODO check more data
          resolve(body);
        });
      });
    });
};

module.exports = {
  makeKryptonoRequest: makeKryptonoRequest
};