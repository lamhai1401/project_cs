const request       = require('../../util/request').makeKryptonoRequest;
const validate      = require('validate.js');
const url           = 'https://testenv1.kryptono.exchange/k/cs/get-account-details';

const constraints = {
  email: {
    presence: true,
    email: true,
  },
};

module.exports = (req, res, next) => {
  // mapping data from client
  const body = {
    email: req.body.email
  };
  // validate input from client
  const err = validate({email: body.email}, constraints);
  if (err) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err);
  // make options
  const opt = {
    method: 'POST',
    url: url,
    body: body
  };
  request(opt)
  .then(body => {
    if(body.error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", body.error_description);
    const account = {
      email: body.email || "",
      name: "",
      google_auth_status: body.enable_google_2fa,
      account_status: body.account_status,
      kyc_status: body.kyc_status || null,
      kyc_detail: body.kyc_detail || null,
      withdrawal_status: body.withdrawal_status,
      sms_status: false,
    };
    if (body.phone) account.sms_status = true;
    if (body.kyc_detail) account.name = body.kyc_detail.first_name + body.kyc_detail.last_name;
    return res.responseSuccess({success: true, data: account});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err.message);
    }
    return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err);
  });
};