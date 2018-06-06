var moduleName = 'bspb.generic'

module.exports = require('angular')
  .module(moduleName, [
    require('ng-toast') && 'ngToast',
    require('@uirouter/angularjs').default,
    require('angular-translate')
  ])
  .controller('ListController', require('./controllers/ListController'))
  .controller('TranslationController', require('./controllers/TranslationController'))
  .directive('buttonDelete', require('./directives/ButtonDelete'))
  .directive('buttonEdit', require('./directives/ButtonEdit'))
  .directive('buttonNew', require('./directives/ButtonNew'))
  .directive('buttonSave', require('./directives/ButtonSave'))
  .directive('pageFooter', require('./directives/PageFooter'))
  .directive('pageHeader', require('./directives/PageHeader'))
  .filter('default', require('./filters/defaultFilter'))