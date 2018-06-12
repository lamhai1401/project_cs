const Random = require('random-js');
const random = new Random(Random.engines.mt19937().autoSeed());

// độ dài chữ số muốn random từ param1 -> param2
async function getRandomInteger(fromLength, toLength) {
  try {
    const random_int = await new Promise((resolve, reject) => {
      const value = random.integer(fromLength, toLength);
      if (!value) throw new Error('Can not get random number !');
      resolve(value);
    });
    return random_int;
  }
  catch(err) {
    return err.message;
  }
}

// độ dài xâu muốn lấy
async function getRandomString(length) {
  try {
    const random_str = await new Promise((resolve, reject) => {
      const str = random.string(length);
      if (!str) throw new Error ('Can not get random string !');
      resolve(str);
    }); 
    return random_str;
  }
  catch(err) {
    return err.message;
  }
}

module.exports = {
  getRandomInteger,
  getRandomString
};