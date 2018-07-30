var TranslationController = require('../controllers/TranslationController')

module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/partials/_buttonSave.html',
    scope: {
      disabled: '<?',
      form: '=?',
      translationPrefix: '@?',
      translationParams: '<?'
    },
    replace: true,
    require: [ 'buttonSave', '?^^form' ],
    bindToController: true,
    link: function ($scope, $element, $attrs, $ctrls) {
      var $ctrl = $ctrls[0]
      var formCtrl = $ctrls[1]
      if (!$ctrl.form) $ctrl.form = formCtrl
    },
    controller: /* @ngInject */function ($attrs, $injector, $scope) {
      var $ctrl = $injector.invoke(TranslationController, this) || this

      var attributeDisabled = 'disabled' in $attrs

      if (!('disabled' in $attrs) || $attrs.$attr.disabled === 'disabled') {
        $ctrl.disabled = true
      }

      if (!attributeDisabled) {
        $scope.$watch(function () {
          if (!$ctrl.form) return true
          return $ctrl.form.$pristine || $ctrl.form.$invalid
        }, function (disabled) {
          $ctrl.disabled = disabled
        })
      }
    },
    controllerAs: '$ctrl'
  }
}
