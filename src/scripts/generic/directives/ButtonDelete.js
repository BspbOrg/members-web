var TranslationController = require('../controllers/TranslationController')

module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/partials/_buttonDelete.html',
    scope: {
      badge: '@?',
      disabled: '<?',
      translationPrefix: '@?',
      translationParams: '<?'
    },
    replace: true,
    bindToController: true,
    controller: /* @ngInject */function ($attrs, $injector, $scope) {
      var $ctrl = $injector.invoke(TranslationController, this) || this

      var attributeDisabled = 'disabled' in $attrs
      var attributeBadge = 'badge' in $attrs

      if (!('disabled' in $attrs) || $attrs.$attr.disabled === 'disabled') {
        $ctrl.disabled = true
      }

      $scope.$on('$destroy', $scope.$parent.$watch('$ctrl.selectedRows.length', function (count) {
        if (!attributeBadge) {
          $ctrl.badge = count > 1 ? count : false
        }
        if (!attributeDisabled) {
          $ctrl.disabled = count === 0
        }
        if (count !== undefined) {
          $ctrl.translationParams = $ctrl.translationParams || {}
          $ctrl.translationParams.count = count
        }
      }))
    },
    controllerAs: '$ctrl'
  }
}
