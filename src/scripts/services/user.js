/**
 * Created by groupsky on 11.11.15.
 */
var angular = require('angular')

require('../app')
  .service('user', /* @ngInject */function ($cookies, $q, api, CSRF_COOKIE) {
    var service = this

    var _identity

    service.isResolved = function () {
      return angular.isDefined(_identity)
    }

    service.isAuthenticated = function () {
      return _identity && _identity.id
    }
    service.isInRole = function (role) {
      if (!service.isAuthenticated()) return false
      return _identity.role === role
    }
    service.isInAnyRole = function (roles) {
      if (!service.isAuthenticated()) return false
      return roles.some(function (role) {
        return service.isInRole(role)
      })
    }

    service.isAdmin = function () {
      return service.isInRole('admin')
    }

    service.getIdentity = function () {
      return _identity
    }

    service.setIdentity = function (identity) {
      _identity = identity
      if (identity == null) {
        $cookies.remove(CSRF_COOKIE)
      }
    }

    service.authenticate = function (credentials) {
      if (credentials == null) {
        service.logout()
        return $q.when(null)
      }
      return api.session.login(credentials).then(function (response) {
        if (response.data.$$response.success) {
          $cookies.put(CSRF_COOKIE, response.data.$$response.token)
          service.setIdentity(response.data)
          return _identity
        }

        return $q.reject(response.data)
      })
    }

    service.logout = function () {
      api.session.logout().then(function () {
        service.setIdentity(null)
      })
    }

    service.resolve = function (silent) {
      var deferred = $q.defer()

      if (angular.isDefined(_identity)) {
        deferred.resolve(_identity)

        return deferred.promise
      }

      api.session.restore({
        skipSessionExpiredInterceptor: silent
      }).then(function (response) {
        if (response.data.$$response.success) {
          service.setIdentity(response.data)
          deferred.resolve(_identity)
        } else {
          deferred.reject(response.data)
        }
      }, function (response) {
        service.setIdentity(null)
        if (response.status === 400) {
          return deferred.reject(response.data)
        }
        if (response.status === 401) {
          $cookies.remove(CSRF_COOKIE)
        }
        deferred.reject(response)
      })

      return deferred.promise
    }

    return service
  })
