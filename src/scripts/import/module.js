var moduleName = 'bspb.import'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default
  ])
  .config(require('./states'))
  .controller('ImportController', require('./controllers/ImportController'))
  .service('importApi', require('./api'))
