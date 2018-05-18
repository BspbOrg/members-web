/**
 * Created by groupsky on 28.10.16.
 */

var angular = require('angular')

require('../app').run(/* @ngInject */function ($rootScope, $uibModal) {
  $rootScope.showTos = function () {
    $uibModal.open({
      ariaLabeledBy: 'modal-title',
      ariaDescribeBy: 'modal-body',
      templateUrl: '/views/tos.html',
      size: 'lg'
    })
      .result.then(null, angular.noop) // fix possibly unhandled rejection: undefined
  }
})
