var queryString = require('query-string')

module.exports = /* @ngInject */function ($resource, ENDPOINT_URL, defaultResourceResponseInterceptor) {
  var Model = $resource(ENDPOINT_URL + '/payment/:id', {
    id: '@id'
  }, {
    // api methods
    query: { method: 'get', isArray: true, cancellable: true, interceptor: { response: defaultResourceResponseInterceptor } },
    export: { method: 'POST', url: ENDPOINT_URL + '/export/payment' }
  })

  // methods
  Object.assign(Model.prototype, {
    validate: function () {
      if (this.members.indexOf(this.billingMemberId) === -1) {
        throw new Error('MISSING_BILLING_MEMBER_IN_MEMBERS')
      }
    }
  })

  Object.assign(Model, {
    exportUrl: function (outputType, query) {
      return ENDPOINT_URL + '/payment.' + outputType + '?' + queryString.stringify(query)
    }
  })

  return Model
}
