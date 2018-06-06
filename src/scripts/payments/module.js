var moduleName = 'bspb.payments'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default
  ])
  .config(require('./states'))
  .controller('paymentController', require('./controllers/PaymentController'))
  .directive('listPayments', require('./directives/ListPayments'))
  .directive('tablePayments', require('./directives/TablePayments'))
  .factory('Payment', require('./models/Payment'))
