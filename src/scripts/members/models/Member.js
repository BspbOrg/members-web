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
    }
  })

  return Model
}
