var queryString = require('query-string')

module.exports = /* @ngInject */function ($resource, ENDPOINT_URL) {
  var Model = $resource(ENDPOINT_URL + '/member/:id', {
    id: '@id'
  }, {
    // api methods
  })

  // methods
  Object.assign(Model.prototype, {
    getName: function () {
      return [this.firstName, this.lastName].filter(function (s) { return !!s }).join(' ')
    },
    getFullAddress: function () {
      return [this.address, this.city, this.postalCode, this.country].filter(function (a) { return a }).join(',')
    },
    toString: function () {
      return this.getName()
    },
    membershipIsExpired: function () {
      return new Date(this.membershipEndDate).getTime() < Date.now()
    }
  })

  Object.assign(Model, {
    exportUrl: function (outputType, query) {
      return ENDPOINT_URL + '/member.' + outputType + '?' + queryString.stringify(query)
    }
  })

  return Model
}
