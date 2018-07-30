module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/payments/_table.html',
    scope: {
      memberId: '<'
    },
    bindToController: true,
    controller: /* @ngInject */function ($injector, Payment) {
      var $ctrl = $injector.instantiate(require('../../generic/controllers/ListController'), {
        translationPrefix: 'PAYMENT',
        model: Payment,
        $stateParams: {}
      })
      Object.defineProperty($ctrl, 'memberId', {
        get: function () { return $ctrl.filter.memberId },
        set: function (v) {
          $ctrl.filter.memberId = v
          $ctrl.requestRows()
        }
      })
      return $ctrl
    },
    controllerAs: '$ctrl'
  }
}
