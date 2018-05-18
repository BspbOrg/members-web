/**
 * Created by groupsky on 10.11.15.
 */

require('../app')
  .constant('CSRF_HEADER', 'x-csrf-token')
  .constant('CSRF_COOKIE', 'csrf-token')
  .constant('CSRF_PARAM', 'csrfToken')
  .config(/* @ngInject */function ($httpProvider, CSRF_HEADER, CSRF_COOKIE) {
    $httpProvider.defaults.xsrfHeaderName = CSRF_HEADER
    $httpProvider.defaults.xsrfCookieName = CSRF_COOKIE
    $httpProvider.interceptors.push('csrfInterceptor')
    $httpProvider.interceptors.push('sessionExpiredInterceptor')
  })
