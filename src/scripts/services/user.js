/**
 * Created by groupsky on 11.11.15.
 */
var angular = require('angular')

require('../app')
  .service('user', /* @ngInject */function ($q, $cookies, api, CSRF_COOKIE, CSRF_HEADER) {
    var service = this

    var _identity

    service.isResolved = function () {
      return angular.isDefined(_identity)
    }

    service.isAuthenticated = function () {
      return angular.isDefined($cookies.get(CSRF_COOKIE))
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
        $cookies.remove(CSRF_COOKIE)
      }
    }

    service.authenticate = function (credentials) {
      if (credentials == null) {
        service.logout()
        return $q.when(null)
      }
      return api.session.login(credentials).then(function (response) {
        if (response.data.success) {
          $cookies.put(CSRF_COOKIE, response.data.token)
          service.setIdentity(response.data.data)
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
        if (response.data.success) {
          service.setIdentity(response.data.data)
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
