/**
 * Created by groupsky on 11.11.15.
 */
var angular = require('angular')

require('../app')
  .service('user', /* @ngInject */function ($q, $cookies, api) {
    var service = this

    var _identity

    var _sessionKey = service.sessionKey = 'bspb-csrf-token'

    service.isResolved = function () {
      return angular.isDefined(_identity)
    }

    service.isAuthenticated = function () {
      return angular.isDefined($cookies.get(_sessionKey))
    }
    service.hasRole = function (role) {
      if (!service.isAuthenticated()) return false
      return _identity.role === role
    }
    service.hasAnyRole = function (roles) {
      if (!service.isAuthenticated()) return false
      return roles.some(function (role) {
        return service.isInRole(role)
      })
    }

    service.isAdmin = function () {
      return service.hasRole('admin')
    }

    service.getIdentity = function () {
      return _identity
    }

    service.setIdentity = function (identity) {
      _identity = identity
      if (identity == null) {
        $cookies.remove(_sessionKey)
      }
    }

    service.authenticate = function (credentials) {
      if (credentials == null) {
        service.logout()
        return $q.when(null)
      }
      return api.session.login(credentials).then(function (response) {
        if (response.data.success) {
          $cookies.put(_sessionKey, response.data.csrfToken)
          service.setIdentity(response.data.user)
          return _identity
        }

        return $q.reject(response.data)
      })
    }

    service.logout = function () {
      api.session.logout()
      service.setIdentity(null)
    }

    service.resolve = function (silent) {
      var deferred = $q.defer()

      if (angular.isDefined(_identity)) {
        deferred.resolve(_identity)

        return deferred.promise
      }

      api.session.restore($cookies.get(_sessionKey), {
        skipSessionExpiredInterceptor: silent
      }).then(function (response) {
        if (response.data.success) {
          $cookies.put(_sessionKey, response.data.csrfToken)
          service.setIdentity(response.data.user)
          deferred.resolve(_identity)
        } else {
          deferred.reject(response.data)
        }
      }, function (response) {
        if (response.status === 400) {
          service.setIdentity(null)
          return deferred.reject(response.data)
        }
        deferred.reject(response)
      })

      return deferred.promise
    }

    return service
  })
