const KRYPTONO_URL = {
  "RESET_2FA"               : "https://xapi.kryptono.exchange/k/cs/reset-gg",
  "RESET_SMS"               : "https://xapi.kryptono.exchange/k/cs/reset-sms",
  "LOGIN_HISTORIES"         : "https://xapi.kryptono.exchange/k/cs/login-history",
  "ACCOUNT_DETAIL"          : "https://xapi.kryptono.exchange/k/cs/get-account-details",
  "KYC_UPDATE_APPROVE"      : "https://xapi.kryptono.exchange/k/cs/kyc/approve",
  "KYC_UPDATE_REJECT"       : "https://xapi.kryptono.exchange/k/cs/kyc/reject",
  "KYC_UPDATE_DETAIL"       : "https://testenv1.kryptono.exchange/k/cs/kyc/update",
  "ENABLE_WITHDRAW"         : "https://testenv1.kryptono.exchange/k/cs/withdraw/enable",
  "DISABLE_WITHDRAW"        : "https://testenv1.kryptono.exchange/k/cs/withdraw/disable"
};

module.exports = {
  KRYPTONO_URL: KRYPTONO_URL
};