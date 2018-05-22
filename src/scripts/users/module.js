var moduleName = 'bspb.users'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default
  ])
  .config(require('./states'))
  .factory('User', require('./models/User'))
  .controller('UserController', require('./controllers/UserController'))
