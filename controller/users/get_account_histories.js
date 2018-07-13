const requets       = require('../../util/request').makeKryptonoRequest;
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
    action: req.body.action || "" // next-previous-undefine
  };
  // validate input from client
  const err = validate(body, constraints);
  if (err) return res.responseError("GET_LAST_LOGIN_FAILED", err);

  // creata a new opt
  const opt = {
    url: url,
    body: body,
    method: "POST"
  };

  // send a request to kryptono
  requets(opt)
  .then(body => {
    //if (!body[0])  return res.responseError("GET_LAST_LOGIN_FAILED", "This user dont have any login histories");
    return res.responseSuccess({success: true, data: body});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("GET_LAST_LOGIN_FAILED", err.message);
    }
    return res.responseError("GET_LAST_LOGIN_FAILED", err);
  });
};
