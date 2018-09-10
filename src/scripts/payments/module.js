var moduleName = 'bspb.payments'

module.exports = require('angular')
  .module(moduleName, [
    require('angular-resource'),
    require('@uirouter/angularjs').default,

    'bspb.nomenclatures'
  ])
  .config(require('./states'))
  .controller('PaymentController', require('./controllers/PaymentController'))
  .directive('listPayments', require('./directives/ListPayments'))
  .directive('paymentLink', require('./directives/PaymentLink'))
  .directive('tablePayments', require('./directives/TablePayments'))
  .factory('Payment', require('./models/Payment'))
