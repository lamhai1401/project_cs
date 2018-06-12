const bcrypt = require('bcrypt');

async function hash(password){
  try {
    const salt = await new Promise ((resolve, reject) =>{
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject (err);
        resolve (salt);
      }) 
    });
    const hashPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
    return hashPassword;
  }
  catch (err) {
    return err.message;
  }
};

// trả về true | false
async function compare(password, hashPassword) {
  try {
    const isPasword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, hashPassword, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
    return isPasword;
  }
  catch(err){
    return err.message;
  }
}

module.exports = { 
    hash: hash,
    compare: compare };