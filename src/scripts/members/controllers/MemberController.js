module.exports = /* @ngInject */ function ($state, $stateParams, $injector, translationPrefix, Member) {
  var $ctrl = this

  $ctrl.translationPrefix = translationPrefix

  $ctrl.data = Member.get({id: $stateParams.id})
  $ctrl.data.id = $stateParams.id
}
