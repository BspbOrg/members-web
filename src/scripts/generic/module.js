var moduleName = 'bspb.generic'

module.exports = require('angular')
  .module(moduleName, [
    require('ng-toast') && 'ngToast',
    require('@uirouter/angularjs').default,
    require('angular-translate')
  ])
  .config(require('./config/animation'))
  .controller('ListController', require('./controllers/ListController'))
  .controller('ModelController', require('./controllers/ModelController'))
  .controller('TranslationController', require('./controllers/TranslationController'))
  .directive('buttonDelete', require('./directives/ButtonDelete'))
  .directive('buttonEdit', require('./directives/ButtonEdit'))
  .directive('buttonNew', require('./directives/ButtonNew'))
  .directive('buttonSave', require('./directives/ButtonSave'))
  .directive('confirm', require('./directives/Confirm'))
  .directive('pageFooter', require('./directives/PageFooter'))
  .directive('pageHeader', require('./directives/PageHeader'))
  .directive('fileModel', require('./directives/FileModel'))
  .filter('default', require('./filters/defaultFilter'))
  .filter('lCurrency', require('./filters/lCurrency'))
