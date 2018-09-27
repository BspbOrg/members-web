module.exports = /* @ngInject */function () {
  return {
    transclude: true,
    template: '<a ui-sref="auth.members.detail({id: member.id})" ng-transclude></a>',
    scope: { member: '<' },
    replace: true
  }
}
