const userServices = require('../../services/users');

module.exports = (req, res, next) => {
  userServices.getUsers()
    .then((users) => {
      res.json(users)
  }).catch((err)=>{
    res.json(err);
  })
}