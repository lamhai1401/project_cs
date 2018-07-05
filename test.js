const request = require('request');
const crypto = require('crypto');

const sign = crypto.createHmac('sha256', 'R244m0Fcs72OtwVc0ecQVtPbwqas2nu6I1MCLYQ5fr8=');

// request('https://cs-portal.zendesk.com/api/v2/tickets/1/audits.json?email=lamthanhhai141@gmail.com&password=123456', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body);
// });

// request.get('https://cs-portal.zendesk.com/api/v2/tickets/1/audits.json', {json: true}, (err, res, body) => {
//     if(err) return console.log(err);
//     console.log(body);
// }).auth('lamthanhhai141@gmail.com', '123456', false)

// const options = {
//     method: 'POST',
//     url: 'https://testenv1.kryptono.exchange/k/cs/get-account-details',
//     headers:
//         {
//             'X-Requested-With': 'XMLHttpRequest',
//             Signature: '5eb3dc10754519bc573f1c43ce9b1c61fb9bc0eda06438bf3476dd39a0ecfb79',
//             'Content-Type': 'application/json',
//             Authorization: '75a45430d8a7a75740f22e9438eea452ec9e73b233494d04d35240451f3d8ad7'
//         },
//     body: {email: 'ahihi1@mailinator.com'},
//     json: true
// };

// options.headers.Signature =sign.update(JSON.stringify(options.body)).digest('hex');

// function callback(error, response, body) {
//     if (error) return console.log(error);
//     console.log(body);
// }

// request(options, callback);