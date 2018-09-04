module.exports = /* @ngInject */function () {
  return {
    templateUrl: function (tElement, tAttrs) {
      return '/views/members/' + (tAttrs.template || '_table') + '.html'
    },
    scope: {
      members: '<?',
      memberIds: '<?'
    },
    bindToController: true,
    controller: /* @ngInject */function ($injector, Member) {
      var $ctrl = $injector.instantiate(require('../../generic/controllers/ListController'), {
        translationPrefix: 'MEMBER',
        model: Member,
        $stateParams: {}
      })
      Object.defineProperty($ctrl, 'members', {
        get: function () { return $ctrl.rows },
        set: function (v) {
          $ctrl.setRows(v)
        }
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
