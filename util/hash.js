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
    return err;
  }
};

// trả về true | false
function compare(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

module.exports = { 
  hash: hash,
  compare: compare 
};
