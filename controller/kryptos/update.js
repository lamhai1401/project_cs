const validate  = require('../../util/validate');
const kryptos   = require('../../services/kryptos');
const url       = require('../../util/constant').KRYPTONO_URL;

// truyền thêm cái trạng thái kyc, pending mới cho approve hay reject, ko thì thôi
// update kyc status
function kyc_status(req, res, next) {

  // validate request param
  const constraints = {
    token: {
      presence: true,
    },
    action: {
      presence: true,
      format: /(approve|reject)/
    },
    kyc_status: {
      presence: true,
      format: /(pending)/
    }
  };

  var arrReason = null;

  // get reject infos
  if (req.body.kyc_reject_infos) arrReason = (req.body.kyc_reject_infos).split(", ");
  
  // get request body
  const object = {
    token: req.body.token || null,
    kyc_reject_infos: arrReason
  };
  // create url for approve or reject
  const kyc_url = req.body.action == 'approve' ? url.KYC_UPDATE_APPROVE : url.KYC_UPDATE_REJECT;

  // validate data
  const err     = validate({token: object.token, action: req.body.action, kyc_status: req.body.kyc_status}, constraints);
  if (err) return res.responseError("KYC_STATUS_UPDATE_FAILED", "Validate: " + err);
  
  // send request to kryptos server
  return kryptos.update_kyc_status(object, kyc_url)
  .then(body => {
    return res.responseSuccess({success: body.success, data: 'Updated Kyc status successfully'});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("KYC_STATUS_UPDATE_FAILED", err);
    }
    return res.responseError("KYC_STATUS_UPDATE_FAILED", err);
  });
}

module.exports = {
  kyc_status: kyc_status
};