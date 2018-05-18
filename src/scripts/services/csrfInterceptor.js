/**
 * Created by groupsky on 13.11.15.
 */

require('../app').factory('csrfInterceptor', /* @ngInject */function ($q, $cookies, CSRF_COOKIE, CSRF_HEADER) {
  return {
    request: function (config) {
      var session = $cookies.get(CSRF_COOKIE)
      config.withCredentials = true
      config.headers[CSRF_HEADER] = session
      return config
    }
  }
})
