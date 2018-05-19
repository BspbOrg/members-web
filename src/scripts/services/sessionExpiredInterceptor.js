/**
 * Created by groupsky on 29.03.16.
 */

require('../app').factory('sessionExpiredInterceptor', /* @ngInject */function ($q, $injector, $cookies, CSRF_HEADER, CSRF_COOKIE) {
  var loginPromise = false
  var user
  var $uibModal
  var $http
  var api

  function autoLogin () {
    return $q.resolve($cookies.get(CSRF_COOKIE))
      .then(function (sessionKey) {
        if (!sessionKey) return $q.reject('no session key')
        return (api || (api = $injector.get('api'))).session.restore({
          skipSessionExpiredInterceptor: true
        })
      })
      .then(function (response) {
        if (!response.data.$$response.success) return $q.reject(response.data)
        user.setIdentity(response.data)
        return response.data
      })
  }

  function manualLogin () {
    $uibModal = $uibModal || $injector.get('$uibModal')
    return $uibModal
      .open({
        templateUrl: '/views/session/login-dialog.html'
      }).result.then(function (result) {
        return user.authenticate(result)
      })
  }

  return {
    responseError: function (rejection) {
      if (rejection && rejection.config && rejection.config.skipSessionExpiredInterceptor) {
        return $q.reject(rejection)
      }
      if (rejection.status === 401) {
        console.log('Unauthorized', rejection)
        user = user || $injector.get('user')
        $http = $http || $injector.get('$http')
        return (loginPromise || (loginPromise = $q.resolve(autoLogin()).catch(manualLogin)))
          .then(function retryRequest () {
            rejection.config.headers[CSRF_HEADER] = $cookies.get(CSRF_COOKIE)
            return $http(rejection.config)
          })
          .catch(function (rejection) {
            console.log('rejection', rejection)
            return $q.reject(rejection)
          })
      }
      return $q.reject(rejection)
    }
  }
})
