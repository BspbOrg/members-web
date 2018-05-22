var moduleName = 'bspb.members'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default
  ])
  .config(require('./states'))
  .factory('Member', require('./models/Member'))
