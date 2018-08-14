const validate  = require('../../util/validate');
const kryptos   = require('../../services/kryptos');

// update kyc status
function kyc_status(req, res, next) {
  // validate request param
  const constraints = {
    accountId: {
      presence: true,
    },
    action: {
      presence: true,
      format: /(approve|reject)/,
    }
  };
  var arrReason = null;
  if (req.body.reasons) arrReason = (req.body.reasons).split(", ");
  // get request body
  const object = {
    accountId: req.body.accountId || null,
    action: req.body.action,
    reasons: arrReason
  };
  // validate data
  const err = validate(object, constraints);
  if (err) return res.responseError("KYC_STATUS_UPDATE_FAILED", err);
  // send request to kryptos server
  kryptos.update_kyc_status(object)
  .then(body => {
    return res.responseSuccess({success: true, data: body});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("KYC_STATUS_UPDATE_FAILED", err.message);
    }
    return res.responseError("KYC_STATUS_UPDATE_FAILED", err);
  });
}

module.exports = {
  kyc_status: kyc_status
};