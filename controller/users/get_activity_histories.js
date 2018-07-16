const activities = require('../../models/activities');
const validate   = require('validate.js');

const constraints = {
  email: {
    presence: true,
    email: true,
  }
};

module.exports = (req, res, next) => {
  
  //mapping date from request body
  const object = {
    email: req.body.email,
    limit: Math.abs(req.query.limit) || 10,
    page: (Math.abs(req.body.page) || 1) -1
  };

  // validate input from client
  const err = validate(object, constraints);
  if (err) return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", err);

  // get data from mongo
  activities.find({kryptono_email: object.email})
  .limit(object.limit)
  .skip(object.limit*object.page)
  .sort({"updated_at": -1})
  .then(list => {
    // if(!list[0]) return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", 'Invalid kryptono email');
    return res.responseSuccess({success: true, data: {list: list, number_pages: parseInt(list.length / object.limit)}});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", err.message);
    }
    return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", err);
  });
};