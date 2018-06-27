const JsSearch = require('js-search')
const search = new JsSearch.Search("_id");

module.exports = (list = []) => {
  return new Promise((resolve, reject) => {
    // var list_key  = list[0].toObject();
    const list_key = Object.keys(list[0]); // get list key of value
    list_key.forEach(key => {
      search.addIndex(key)
    });
    search.addDocuments(list)
    return resolve(search);
  });
};
