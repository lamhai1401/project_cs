const request = require('request');
const secret  = require('config').KEY.SECRET;
const auth    = require('config').KEY.AUTH;
const crypto  = require('crypto');
const url     = 'https://testenv1.kryptono.exchange/k/cs/get-account-details';

module.exports = (req, res, next) => {
  // create new intance
  const hash    = crypto.createHmac('sha256', secret);
  // mapping data from client
  const body = {email: req.body.email};
  // get signature
  const signature = hash.update(JSON.stringify(body)).digest('hex');

  // create a options of request
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
    if (error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", error);
    if(body.error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", body);
    const account = {
      email: body.email,
      name: body.kyc_detail.first_name + body.kyc_detail.last_name,
      google_auth_status: body.enable_google_2fa,
      account_status: body.account_status,
      kyc_status: body.kyc_status,
      withdrawal_status: body.withdrawal_status,
      sms_status: false,
      kyc_detail: body.kyc_detail
    };

    if (body.phone) account.sms_status = true;
    res.responseSuccess({success: true, data: account});
  });
};