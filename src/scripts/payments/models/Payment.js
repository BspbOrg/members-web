module.exports = /* @ngInject */function ($resource, ENDPOINT_URL) {
  var Model = $resource(ENDPOINT_URL + '/payment/:id', {
    id: '@id'
  }, {
    // api methods
    query: {method: 'get', isArray: true, cancellable: true}
  })

  // methods
  Object.assign(Model.prototype, {})

  return Model
}
