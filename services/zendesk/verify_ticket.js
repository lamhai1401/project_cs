const request           = require('request');
const activities        = require('../../models/activities');
const zendesk_token     = require('config').ZENDESK.JWT_TOKEN;
const zendesk_key       = require('config').ZENDESK.JWT_KEY;
const jwt               = require('../../util/jwt');

module.exports = (object) => {
  return new Promise((resolve, reject) => {
    // url api of zendesk
    const url = `https://kryptono.zendesk.com/api/v2/tickets/${object.ticket_id}/audits.json`;
    return jwt.verifyTokenWithKey(zendesk_token, zendesk_key)
    .then(account => {
      // valid a ticked id in database
      return activities.findOne({ticket_id: object.ticket_id})
      .then(ticket => {
        // check ticket in cs portal database
        if(ticket) return reject(`This ticket was created by support email: ${ticket.support_email}`);
        // check ticket in zenesk database
        return request(url, {json: true}, (err, res, body) => {
          // dont know what is res error
          if(err) return reject('Ticket Error: ' + err);
          // invalid ticket id or incorrect type
          if(body.error) return reject('Ticket Error: ' + body.error);
          return resolve(body);
        }).auth(account.email, account.password, false);
      });
    })
    .catch(err => reject(err));
  });
};