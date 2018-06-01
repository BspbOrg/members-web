module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/members/_table.html',
    scope: {
      memberIds: '<'
    },
    bindToController: true,
    controller: /* @ngInject */function ($injector, Member) {
      var $ctrl = $injector.instantiate(require('../../generic/controllers/ListController'), {
        translationPrefix: 'MEMBER',
        model: Member,
        $stateParams: {}
      })
      Object.defineProperty($ctrl, 'memberIds', {
        get: function () { return $ctrl.filter.memberIds },
        set: function (v) {
          $ctrl.filter.memberIds = v
          $ctrl.requestRows()
        }
      })
      return $ctrl
    },
    controllerAs: '$ctrl'
  }
}
