const activities = require('../../models/activities');
const validate   = require('validate.js');

const constraints = {
  kryptono_email: {
    email: true,
  },
  support_email: {
    email: true,
  },
};

module.exports = (req, res, next) => {
  var object= {};
  if(req.body.kryptono_email) object.kryptono_email = req.body.kryptono_email;
  if(req.body.support_email) object.support_email = req.body.support_email;
  limit = Math.abs(req.body.limit) || 10;
  page  = (Math.abs(req.body.page) || 1) -1;

  // validate input from client
  const err = validate(object, constraints);
  if (err) return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", err);

  // get data from mongo
  activities.find(object)
  .limit(limit)
  .skip(limit*page)
  .sort({"updated_at": -1})
  .then(list => {
    // if(!list[0]) return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", 'Invalid kryptono/support email');
    return res.responseSuccess({success: true, data: {list: list, number_pages: parseInt(list.length / limit)}});
  })
  .catch(err => {
    if(err.message) {
      return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", err.message);
    }
    return res.responseError("SUPPORT_ACTIVITIES_HISTORY_LIST_FAILED", err);
  });
};