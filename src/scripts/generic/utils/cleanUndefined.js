module.exports = function cleanUndefined (obj) {
  if (typeof obj !== 'object') return obj
  return Object
    .keys(obj)
    .filter(function (key) {
      return typeof obj[key] !== 'undefined' && obj[key] !== null
    })
    .reduce(function (aggr, key) {
      aggr[key] = obj[key]
      return aggr
    }, {})
}
