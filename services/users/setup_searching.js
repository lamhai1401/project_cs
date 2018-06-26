const jssearch = require('js-search');
const search   = new jssearch.Search('_id');

module.exports = (list = []) => {
  return new Promise((resolve, reject) => {
    const list_key = Object.keys(list[0]) // get list key of value
    list_key.forEach(key => search.addIndex(key));
    search.addDocuments(list)
    return resolve(search);
  });
};
