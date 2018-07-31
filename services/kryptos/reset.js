// libraries
const request       = require('../../util/request').makeKryptonoRequest;
const activities    = require('../../models/activities');
const verify_ticket = require('../zendesk').verify_ticket;
// kryptono url
const url = require('../../util/constant').KRYPTONO_URL;

//* Reset 2FA
function google_auth(object) {
  return new Promise((resolve, reject) => {
    // recording support activities
    const record = {
      ticket_id:      object.ticket_id,
      support_email:  object.support_email,
      activitiy:      "Reset 2FA",
      kryptono_email: object.kryptono_email,
      status: 1,
      description: 'Reset 2FA Successfully'
    };
    // create an options to send qrequest
    const opt = {
      body: {email: record.kryptono_email},
      url: url.RESET_2FA,
      method: 'POST',
    };
    // send request to kryptono
    return verify_ticket({ticket_id: record.ticket_id})
    .then(isTicket => {
      if(!isTicket) return reject('Ticket error: Invalid ticket');
      return request(opt).then(body => body);
    })
    .then(body => {
      // ? Check body error
      if(body.error) return reject(body.error_description);
      // ? Check account already disabled 2FA
      if(!body.success) return reject('This account is already disabled 2FA');
      // ? Successfully
      activities.create(record);
      return resolve(body);
    })
    .catch(err => reject(err));
  });
}

//* Reset SMS
function sms(object) {
  return new Promise((resolve, reject) => {
    // recording support activities
    const record = {
      ticket_id:      object.ticket_id,
      support_email:  object.support_email,
      activitiy:      "Reset SMS",
      kryptono_email: object.kryptono_email,
      status: 1,
      description: 'Reset SMS Successfully'
    };
    // create an options to send qrequest
    const opt = {
      body: {email: record.kryptono_email},
      url: url.RESET_SMS,
      method: 'POST',
    };
    // send request to kryptono
    return verify_ticket({ticket_id: record.ticket_id})
    .then(isTicket => {
      if(!isTicket) return reject('Ticket error: Invalid ticket');
      return request(opt).then(body => body);
    })
    .then(body => {
      // ? Check body error
      if(body.error) return reject(body.error_description);
      // ? Check account already disabled 2FA
      if(!body.success) return reject('This account is already disabled SMS');
      // ? Successfully
      activities.create(record);
      return resolve(body);
    })
    .catch(err => reject(err));
  });
}

module.exports = {
  google_auth: google_auth,
  sms: sms
};