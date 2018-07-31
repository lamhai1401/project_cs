const crypto    = require('crypto');
const request   = require('request');
const moment    = require('moment');
const KRYPTONO  = require('config').KRYPTONO;
const url       = require('../util/constant').KRYPTONO_URL;
const jwt       = require('../util/jwt');

//* Simple request
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
  .then(options => {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) return reject(error);
        if(!body) return reject('Disconnected Server');
        // TODO check more data
        resolve(body);
      });
    });
  });
}

//* Login to kryptos server return cookies
function login(j) {
  return new Promise((resolve, reject) => {
    // create new request options
    const options = {
      method: 'POST',
      url: url.LOGIN,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        email: 'lamthanhhai141@gmail.com',
        password: 'P@ssw0rd!@#r@nd0m'
      },
      jar: j,
      json: true
    };
    // make login request
    return request(options, (error, response, body) => {
      if (error) return reject(error);
      resolve(j);
    });
});
}

//* Request with cookies
function makeKryptonoRequestWithCookies() {
  // create cookies agrument
  let j = request.jar();
  let time = moment();
  let initLogin = null;

  // get new cookie if failed
  let getCookie = () => {
    if (!initLogin) initLogin = new Promise((resolve, reject) => {
      login(j).then(cookie => {
        getCookie = getCookie2;
        resolve(cookie);
      }).catch(err => reject(err));
    });
    return initLogin;
  };
  function getCookie2() {
    if (time.diff(moment(), 'minutes') >= 15) {
      return login(j).then(cookie => {
        return j;
      }).catch(err => Promise.reject(err));
    }
    return Promise.resolve(j);
  }
  // return function
  return function makeRequest(opt = {}) {
    return getCookie()
    .then(cookie => {
      let options = Object.assign({}, opt);
      options.jar = cookie;
      return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
          if (error) return reject(error);
          resolve(body);
        });
      });
    });
  };
}

module.exports = {
  makeKryptonoRequest: makeKryptonoRequest,
  makeKryptonoRequestWithCookies: makeKryptonoRequestWithCookies(),
};

// let myOptions = {
//     method: 'POST',
//     url: 'https://testenv1.kryptono.exchange/portal/account/details',
//     headers:
//         {
//             'Content-Type': 'application/json',
//         },
//     body: {accountData: 'toquocphuong@gmail.com'},
//     json: true
// };

// function test(i) {
//   module.exports.makeKryptonoRequestWithCookies(myOptions).then(r => {
//     console.log('i', i);
//   })
// }
