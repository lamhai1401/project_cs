const validate      = require('../../util/validate');
const kryptos       = require('../../services/kryptos');
const url       = require('../../util/constant').KRYPTONO_URL;

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
  const err     = validate({token: object.token, action: req.body.action}, constraints);
  if (err) return res.responseError("KYC_STATUS_UPDATE_FAILED", "Validate failed: " + err);
  
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

// update kyc detail
function kyc_detail(req, res,next) {
  
  // validate request param
  const constraints = {
    account_id: {
      presence: true
    }
  };

  // create request body
  const object = {
    account_id: req.body.account_id,
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    gender: req.body.gender || null,
    country_citizenship: req.body.country_citizenship || null,
    country_resident: req.body.country_resident || null,
    id_number: req.body.passport || null
  };

  // validate data
  const err     = validate({account_id: object.account_id}, constraints);
  if (err) return res.responseError("KYC_DETAIL_UPDATE_FAILED", "Validate failed: " + err);
  
  // send request to kryptos server
  return kryptos.update_kyc_detail(object, url.KYC_UPDATE_DETAIL)
  .then(body => {
    console.log(body);
    if(!body.success) return res.responseError("KYC_DETAIL_UPDATE_FAILED", "Nothing to update");
    return res.responseSuccess({success: body.success, data: body.kyc_details});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("KYC_DETAIL_UPDATE_FAILED", err);
    }
    return res.responseError("KYC_DETAIL_UPDATE_FAILED", err);
  });

}

// update withdraw status
function withdraw_status(req, res, next) {
  // validate request param
  const constraints = {
    account_id : {
      presence: true
    },
    action: {
      presence: true,
      format: /(enable|disable)/
    }
  };

  // get request body
  const object = {
    account_id: req.body.account_id
  };

  // create url for enable or disable
  const withdraw_url = req.body.action == 'enable' ? url.ENABLE_WITHDRAW : url.DISABLE_WITHDRAW;

  // validate data
  const err     = validate({account_id: object.account_id, action: req.body.action}, constraints);
  if (err) return res.responseError("WITHDRAW_STATUS_UPDATE_FAILED", "Validate failed: " + err);

  // send request to kryptos server
  return kryptos.update_withdraw_status(object, withdraw_url)
  .then(body => {
    if(!body.success) return res.responseError("WITHDRAW_STATUS_UPDATE_FAILED", "This account already is " + req.body.action);
    return res.responseSuccess({success: body.success, data: 'Updated withdraw status successfully'});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("WITHDRAW_STATUS_UPDATE_FAILED", err);
    }
    return res.responseError("WITHDRAW_STATUS_UPDATE_FAILED", err);
  });
}

module.exports = {
  kyc_status: kyc_status,
  kyc_detail: kyc_detail,
  withdraw_status: withdraw_status
};