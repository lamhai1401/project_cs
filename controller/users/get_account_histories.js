const requets       = require('request');
const jwt           = require('../../util/jwt');
const kryptono_token= require('config').KRYPTONO.KRYPTONO_TOKEN;
const kryptono_key  = require('config').KRYPTONO.KRYPTONO_KEY;
const crypto        = require('crypto');
const validate      = require('validate.js');
const url           = 'https://testenv1.kryptono.exchange/k/cs/login-history';

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  to : {
    presence: true,
    numericality: {
      onlyInteger: true,
    }
  },
  from : {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  },
  limit : {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
};

// To 
// --pre--
// T1
// --You--
// T2
// --next--
// Form

module.exports = (req, res, next) => {
  // mapping data from client
  const body = {
    email: req.body.email,
    limit: (req.body.limit) || 10,
    from: (req.body.from) || Date.now() - 518400000,
    to: (req.body.to) || Date.now(),
    action: req.body.action || "" // next-previous
  };
  // validate input from client 1 531 377 557 346, 1 530 403 200 000
  const err = validate(body, constraints);
  if (err) return res.responseError("GET_LAST_LOGIN_FAILED", err);
  // verify token to get auth and secret key
  jwt.verifyTokenWithKey(kryptono_token, kryptono_key)
  .then(kryptono => {
    // create new intance
    const hash    = crypto.createHmac('sha256', kryptono.secret);
    // get signature
    const signature = hash.update(JSON.stringify(body)).digest('hex');
    // setting request header
    const options = {
      method: 'POST',
      url: url,
      headers:
        {
          'X-Requested-With': 'XMLHttpRequest',
          'Signature': signature,
          'Content-Type': 'application/json',
          'Authorization': kryptono.auth
        },
      body: body,
      json: true
    };
    console.log(body);
    return requets(options, (error, response, body) => {
      if (error) return res.responseError("GET_LAST_LOGIN_FAILED", error);
      console.log(body);
      if (!body[0])  return res.responseError("GET_LAST_LOGIN_FAILED", "This user dont have any login histories");
      return res.responseSuccess({success: true, data: body});
    });
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("GET_LAST_LOGIN_FAILED", err.message);
    }
    return res.responseError("GET_LAST_LOGIN_FAILED", err);
  });
};