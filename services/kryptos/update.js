const request = require('../../util/request').makeKryptonoRequestWithCookies;
const url     = require('../../util/constant').KRYPTONO_URL;

const reason = {
  'reason1': "Your documents do not match",
  'reason2': "Your passport is not valid at the moment you submitted your KYC application",
  'reason3': "Your passport is not legible and it appeared to be modified by a photo editing software",
  'reason4': "Your selfie is unclear and blurry",
  'reason5': "Your note does not contain the correct information"
};

//* Update kyc status approve or reject
function kyc_status(object) {
  // make a request to krypto server
  return new Promise((resolve, reject) => {
    // make a options
    const options = {
      method: 'POST',
      header : {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      url: url.KYC_UPDATE,
      body: object,
      json: true
    };
    return request(options)
    .then(body => resolve(body))
    .catch(err => reject(err));
  });
}

module.exports = {
  kyc_status: kyc_status
};

// kyc_status({"accountId":"cf0d2b94-84c9-48e9-89ab-7e95f4765653","action":"approve", reasons: [null]})
// .then( r => console.log(r))
// .catch(err => console.log(err));