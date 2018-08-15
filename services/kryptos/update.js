const request = require('../../util/request').makeKryptonoRequest;

//* Update kyc status approve or reject
function kyc_status(object, url) {
  return new Promise((resolve, reject) => {
    const opt = {
      method: 'POST',
      url: url,
      body: object
    };

    // send request to kryto server
    return request(opt)
    .then(body => {
      if(body.error) return reject("Response body error:  " + body.error_description);
      return resolve(body);
    })
    .catch(err => reject(err));
  });
}


// function kyc_status(object) {
//   // make a request to krypto server
//   return new Promise((resolve, reject) => {
//     // make a options
//     const options = {
//       method: 'POST',
//       header : {
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest'
//       },
//       url: url.KYC_UPDATE,
//       body: object,
//       json: true
//     };
//     return request(options)
//     .then(body => resolve(body))
//     .catch(err => reject(err));
//   });
// }

module.exports = {
  kyc_status: kyc_status
};