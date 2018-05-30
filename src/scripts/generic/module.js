var moduleName = 'bspb.generic'

module.exports = require('angular')
  .module(moduleName, [
    require('ng-toast') && 'ngToast',
    require('@uirouter/angularjs').default,
    require('angular-translate')
  ])
  .controller('ListController', require('./controllers/ListController'))
  .directive('buttonDelete', require('./directives/ButtonDelete'))
  .directive('buttonNew', require('./directives/ButtonNew'))
  .directive('pageHeader', require('./directives/PageHeader'))
