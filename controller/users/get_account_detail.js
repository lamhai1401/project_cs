const request       = require('request');
const validate      = require('validate.js');
const kryptono_token= require('config').KRYPTONO.KRYPTONO_TOKEN;
const kryptono_key  = require('config').KRYPTONO.KRYPTONO_KEY;
const jwt           = require('../../util/jwt');
const crypto        = require('crypto');
const url           = 'https://testenv1.kryptono.exchange/k/cs/get-account-details';

const constraints = {
  email: {
    presence: true,
    email: true,
  },
};

module.exports = (req, res, next) => {
  // mapping data from client
  const body      = {
    email: req.body.email};
  // validate input from client
  const err = validate({email: body.email}, constraints);
  if (err) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err);
  //verify token to get auth and secret key
  jwt.verifyTokenWithKey(kryptono_token, kryptono_key)
  .then(kryptono => {
    // create new intance
    const hash    = crypto.createHmac('sha256', kryptono.secret);
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
          'Authorization': kryptono.auth
        },
      body: body,
      json: true
    };

    return request(options, (error, response, body) => {
      if (error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", error);
      if(body.error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", body.error_description);
      console.log(body);
      // recording support activites to data base 
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
    });
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err.message);
    }
    return res.responseError("GET_ACCOUNT_DETAIL_FAILED", err);
  });
};

// module.exports = (req, res, next) => {
//   // create new intance
//   const hash    = crypto.createHmac('sha256', secret);
//   // mapping data from client
//   const body = {email: req.body.email};
//   // get signature
//   const signature = hash.update(JSON.stringify(body)).digest('hex');

//   // create a options of request
//   const options = {
//     method: 'POST',
//     url: url,
//     headers:
//       {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Signature': signature,
//         'Content-Type': 'application/json',
//         'Authorization': auth
//       },
//     body: body,
//     json: true
//   };

//   request(options, (error, response, body) => {

//     if (error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", error);
//     if(body.error) return res.responseError("GET_ACCOUNT_DETAIL_FAILED", body.error_description);

//     const account = {
//       email: body.email,
//       name: body.kyc_detail.first_name + body.kyc_detail.last_name,
//       google_auth_status: body.enable_google_2fa,
//       account_status: body.account_status,
//       kyc_status: body.kyc_status,
//       withdrawal_status: body.withdrawal_status,
//       sms_status: false,
//       kyc_detail: body.kyc_detail
//     };
//     if (body.phone) account.sms_status = true;
//     return res.responseSuccess({success: true, data: account});
//   });
// };