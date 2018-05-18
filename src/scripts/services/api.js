/**
 * Created by groupsky on 10.11.15.
 */

var angular = require('angular')
require('../app').service('api', /* @ngInject */function ($log, $http, $resource, $q, $window, ENDPOINT_URL) {
  var api = this

  api.session = {
    login: function (auth) {
      return $http({
        method: 'POST',
        url: ENDPOINT_URL + '/session',
        data: auth,
        withCredentials: true
      })
    },
    restore: function (opts) {
      return $http(angular.extend({
        method: 'GET',
        url: ENDPOINT_URL + '/me',
        withCredentials: true
      }, opts))
    },
    forgotPassword: function (auth) {
      return $http({
        method: 'POST',
        url: ENDPOINT_URL + '/session/' + auth.email + '/resetpw',
        data: auth
      })
    },
    resetPassword: function (auth) {
      return $http({
        method: 'POST',
        url: ENDPOINT_URL + '/session/' + auth.email + '/resetpw2',
        data: auth
      })
    },
    logout: function () {
      return $http({
        method: 'DELETE',
        url: ENDPOINT_URL + '/session',
        withCredentials: true
      })
    },
    changePassword: function (userId, oldPassword, newPassword) {
      return $http({
        method: 'PATCH',
        url: ENDPOINT_URL + '/user/' + $window.encodeURIComponent(userId),
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword
        }
      })
    }
  }
})
