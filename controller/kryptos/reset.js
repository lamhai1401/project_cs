const validate      = require('validate.js');
const kryptos         = require('../../services/kryptos');

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  ticket_id: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
};

// * Reset 2fa
function google_auth(req, res, next) {
  // mapping data from client
  const object = {
    ticket_id: req.body.ticket_id,
    support_email:  req.user.email,
    kryptono_email: req.body.email
  };
  // validate input from client
  const err = validate({email: object.kryptono_email, ticket_id: object.ticket_id}, constraints);
  if (err) return res.responseError("RESET_2FA_FAILED", err);

  // send request to kryptono
  kryptos.reset_2fa(object)
  .then(body => res.responseSuccess({success: true, data: body}))
  .catch(err => {
    if(err.message) {
      return res.responseError("RESET_2FA_FAILED", err.message);
    }
    return res.responseError("RESET_2FA_FAILED", err);
  });
}

// * Reset SMS
function sms(req, res, next) {
  // mapping data from client
  const object = {
    ticket_id: req.body.ticket_id,
    support_email:  req.user.email,
    kryptono_email: req.body.email
  };
  // validate input from client
  const err = validate({email: object.kryptono_email, ticket_id: object.ticket_id}, constraints);
  if (err) return res.responseError("RESET_SMS_FAILED", err);

  // send request to kryptono
  kryptos.reset_sms(object)
  .then(body => res.responseSuccess({success: true, data: body}))
  .catch(err => {
    if(err.message) {
      return res.responseError("RESET_SMS_FAILED", err.message);
    }
    return res.responseError("RESET_SMS_FAILED", err);
  });
}

module.exports = {
  google_auth: google_auth,
  sms: sms
};