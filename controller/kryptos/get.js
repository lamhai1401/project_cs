const validate            = require('validate.js');
const get_account_detail  = require('../../services/kryptos/get').account_detail;
const get_login_histories = require('../../services/kryptos').get_login_histories;

//* get account krypto account detail
function account_detail (req, res, next) {
  // Validate request param
  const constraints = {
    email: {
      presence: true,
      email: true,
    },
  };
  // mapping data from client
  const body = {
    email: req.body.email
  };
  // validate input from client
  const err = validate({email: body.email}, constraints);
  if (err) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err);

  // get account
  get_account_detail(body)
  .then(account => {
    return res.responseSuccess({success: true, data: account});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err.message);
    }
    return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err);
  });
}

//* get account krypto login histories
function login_hisrories (req, res, next) {
  // Validate request param
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
  // send request to
  get_login_histories(body)
  .then(body => res.responseSuccess({success: true, data: body}))
  .catch(err => {
    if(err.message) {
      return res.responseError("GET_LAST_LOGIN_FAILED", err.message);
    }
    return res.responseError("GET_LAST_LOGIN_FAILED", err);
  });
}

module.exports = {
  account_detail: account_detail,
  login_hisrories: login_hisrories
};