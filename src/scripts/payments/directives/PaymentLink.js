module.exports = /* @ngInject */function () {
  return {
    transclude: true,
    template: '<a ui-sref="auth.payments.detail({id: payment.id})" ng-transclude></a>',
    scope: { payment: '<' },
    replace: true
  }
}
