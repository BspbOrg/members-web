var angular = require('angular')

var raven = require('raven-js')
  .config('https://b7d66b3c92b74195915d541bff4c782f@sentry.io/1206743')

var bulk = require('bulk-require')
var info = require('../../package.json')

var dependencies = [
  'ngLocale',
  require('angular-cookies'),
  require('angular-resource'),
  require('angular-sanitize'),
  require('angular-animate'),

  require('@uirouter/angularjs').default,
  require('angular-ui-bootstrap'),
  require('ui-select'),

  require('nya-bootstrap-select'),
  require('ng-toast') && 'ngToast',
  require('ng-infinite-scroll'),
  require('angular-loading-bar'),
  require('raven-js/plugins/angular').moduleName,
  require('angular-filter'),
  require('angulartics'),
  require('angulartics-google-analytics'),
  require('angular-file-upload') && 'angularFileUpload',
  require('ngstorage').name,
  require('angular-bootstrap-lightbox') && 'bootstrapLightbox',
  require('angular-translate')
]

var app = module.exports = angular.module('members', dependencies)

raven
  .addPlugin(require('raven-js/plugins/angular'), angular)
  .install()

app.run(/* @ngInject */function ($rootScope) {
  $rootScope.$system = info
})

// semicolon is required because bulk is transformed into ({}) and that is evaluated as a function call to above statement
; // eslint-disable-line semi
// include all js files
bulk(__dirname, [ './**/!(app|*.spec).js' ])
