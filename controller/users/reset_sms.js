const request       = require('request');
const secret        = require('config').KEY.SECRET;
const auth          = require('config').KEY.AUTH;
const crypto        = require('crypto');
const validate      = require('validate.js');
const activities    = require('../../models/activities');
const verify_ticket = require('../../services/krypto/verify_ticket');  
const url           = 'https://testenv1.kryptono.exchange/k/cs/reset-sms';

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  ticket_id: {
    presence: true,
  }
};

module.exports = (req, res, next) => {
  // create new intance
  const hash    = crypto.createHmac('sha256', secret);
  // mapping data from client
  const body      = {email: req.body.email};
  // recording support activities
  const object    = {
    ticket_id:      req.body.ticket_id,
    support_email:  req.user.email,
    activitiy:      "Reset SMS"
  };
  // validate input from client
  const err = validate({email: body.email, ticket_id: object.ticket_id}, constraints);
  if (err) return res.responseError("RESET_SMS_FAILED", err);

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
        'Authorization': auth
      },
    body: body,
    json: true
  };
  // check valid ticket in both of zendesk and database
  verify_ticket({ticket_id: object.ticket_id})
  .then(isTicket => {
    return request(options, (error, response, body) => {
      if (error) return res.responseError("RESET_SMS_FAILED", err);
      if(!body.success) return res.responseError("RESET_SMS_FAILED", 'This account is already disabled SMS');
      activities.create(object);
      return res.responseSuccess({success: true, data: body});
    });
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("RESET_SMS_FAILED", err.message);
    }
    return res.responseError("RESET_SMS_FAILED", err);
  });
};