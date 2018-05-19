/**
 * Created by groupsky on 12.11.15.
 */

var angular = require('angular')

require('../app').factory('User', /* @ngInject */function ($resource, $translate, ENDPOINT_URL) {
  var User = $resource(ENDPOINT_URL + '/user/:id', {
    id: '@id'
  }, {
    // api methods
  })

  // methods
  angular.extend(User.prototype, {
    getName: function () {
      return [ this.firstName, this.lastName ].filter(function (s) { return !!s }).join(' ')
    },
    isInRole: function (role) {
      if (!this.roles) return false
      return this.roles.indexOf(role) !== -1
    },
    toString: function () {
      return this.getName()
    }
  })

  return User
})
