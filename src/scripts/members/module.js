var moduleName = 'bspb.members'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default,

    'bspb.payments'
  ])
  .config(require('./states'))
  .controller('MemberController', require('./controllers/MemberController'))
  .directive('listMembers', require('./directives/ListMembers'))
  .directive('memberLink', require('./directives/MemberLink'))
  .directive('tableMembers', require('./directives/TableMembers'))
  .factory('Member', require('./models/Member'))
  .filter('member', require('./filters/member'))
