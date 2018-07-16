const validate      = require('validate.js');
const request       = require('../../util/request').makeKryptonoRequest;
const activities    = require('../../models/activities');
const verify_ticket = require('../../services/krypto/verify_ticket');  
const url           = 'https://testenv1.kryptono.exchange/k/cs/reset-gg';

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

module.exports = (req, res, next) => {
  // mapping data from client
  const body      = {email: req.body.email};
  // recording support activities
  const object    = {
    ticket_id:      req.body.ticket_id,
    support_email:  req.user.email,
    activitiy:      "Reset 2FA",
    kryptono_email: body.email
  };
  // validate input from client
  const err = validate({email: body.email, ticket_id: object.ticket_id}, constraints);
  if (err) return res.responseError("RESET_2FA_FAILED", err);

  // create an options to send qrequest
  const opt = {
    body: body,
    url: url,
    method: 'POST',
  };

  // send request to kryptono
  verify_ticket({ticket_id: object.ticket_id})
  .then(isTicket => {
    if (!isTicket) return res.responseError("RESET_2FA_FAILED", 'Invalid ticket');
    return request(opt).then(body => body);
  })
  .then(body => {
    if(body.error) return res.responseError("RESET_2FA_FAILED", body.error_description);
    if(!body.success) return res.responseError("RESET_2FA_FAILED", 'This account is already disabled 2FA');
    activities.create(object);
    return res.responseSuccess({success: true, data: body});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("RESET_2FA_FAILED", err.message);
    }
    return res.responseError("RESET_2FA_FAILED", err);
  });
};