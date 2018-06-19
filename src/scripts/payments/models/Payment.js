module.exports = /* @ngInject */function ($resource, ENDPOINT_URL) {
  var Model = $resource(ENDPOINT_URL + '/payment/:id', {
    id: '@id'
  }, {
    // api methods
    query: {method: 'get', isArray: true, cancellable: true}
  })

  // methods
  Object.assign(Model.prototype, {
    validate: function() {
      if (this.members.indexOf(this.billingMemberId) === -1) {
        throw new Error("MISSING_BILLING_MEMBER_IN_MEMBERS")
      }
    }
  })

  return Model
}
