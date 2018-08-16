const request = require('../../util/request').makeKryptonoRequest;
const url     = require('../../util/constant').KRYPTONO_URL;

//* Get krypto account detail
function account_detail(object) {
  return new Promise((resolve, reject) => {
    // make options
    const opt = {
      method: 'POST',
      url: url.ACCOUNT_DETAIL,
      body: object
    };
    // send request to krypto server
    return request(opt)
    .then(body => {
      if(body.error) return reject(body.error_description);
      const account = {
        //account_id: body.account_id || null,
        email: body.email || "",
        name: "",
        google_auth_status: body.enable_google_2fa,
        account_status: body.account_status,
        kyc_status: body.kyc_status || null,
        kyc_detail: body.account_kyc || null,
        withdrawal_status: body.withdrawal_status,
        sms_status: false,
      };
      if (body.phone) account.sms_status = true;
      if (body.kyc_detail) account.name = body.kyc_detail.first_name + body.kyc_detail.last_name;
      return resolve(account);
    })
    .catch(err => reject(err));
  });
}

//* Get krypto account login histories
/* To --pre--T1--You--T2--next--Form */
function login_histories(object) {
  return new Promise((resolve, reject) => {
    // make options
    const opt = {
      method: 'POST',
      url: url.LOGIN_HISTORIES,
      body: object
    };
    // send request to kryptono server
    return request(opt)
    .then(body => resolve(body))
    .catch(err => reject(err));
  });
}

module.exports = {
  account_detail: account_detail,
  login_histories: login_histories
};