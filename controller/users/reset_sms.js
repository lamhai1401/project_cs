const request = require('request');
const secret  = require('config').KEY.SECRET;
const auth    = require('config').KEY.AUTH;
const crypto  = require('crypto');
const url     = 'https://kryptono.exchange/k/cs/reset-sms';

module.exports = (req, res, next) => {
  // create new intance
  const hash    = crypto.createHmac('sha256', secret);
  // mapping data from client
  const body = {email: req.body.email};
  // get signature
  const signature = hash.update(JSON.stringify(body)).digest('hex');

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

  request(options, (error, response, body) => {
    if (error) return res.responseError("RESET_SMS_FAILED", err);
    if(body.success) return res.responseSuccess({success: true, data: body});
    return res.responseError("RESET_SMS_FAILED", body);
  });
};
