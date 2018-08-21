const request = require('../../util/request').makeKryptonoRequest;

//* Update kyc status approve or reject
function kyc_status(object, url) {
  return new Promise((resolve, reject) => {
    const opt = {
      method: 'POST',
      url: url,
      body: object
    };

    // send request kyc status to kryto server
    return request(opt)
    .then(body => {
      if(body.error) return reject("Response body error:  " + body.error_description);
      return resolve(body);
    })
    .catch(err => reject(err));
  });
}

//* Update kyc detail
function kyc_detail(object, url) {
  return new Promise((resolve, reject) => {
    const opt = {
      method: 'POST',
      url: url,
      body: object
    };

    //send request kyc detail to krypto server
    return request(opt)
    .then(body => resolve(body))
    .catch(err => reject(err));
  });
}

//* Update withdraw status
function withdraw_status(object, url) {
  return new Promise((resolve, reject) => {
    const opt = {
      method: 'POST',
      url: url,
      body: object
    };

    return request(opt)
    .then(body => {
      return resolve(body);
    })
    .catch(err => reject(err));
  });
}
module.exports = {
  kyc_status: kyc_status,
  kyc_detail: kyc_detail,
  withdraw_status: withdraw_status
};