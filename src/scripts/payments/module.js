var moduleName = 'bspb.payments'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default
  ])
  .config(require('./states'))
  .directive('listPayments', require('./directives/ListPayments'))
  .factory('Payment', require('./models/Payment'))
