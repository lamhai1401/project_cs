const hash      = require('./foundation/hash');
const jwt       = require('./foundation/jwt');
const random    = require('./foundation/random');

module.exports = {
    string  : string,
    hash    : hash.hash,
    compare : hash.compare,
    jwt     : jwt,
    random  : random,
};