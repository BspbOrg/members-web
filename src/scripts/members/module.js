var moduleName = 'bspb.members'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default,

    'bspb.payments'
  ])
  .config(require('./states'))
  .factory('Member', require('./models/Member'))
  .controller('MemberController', require('./controllers/MemberController'))
