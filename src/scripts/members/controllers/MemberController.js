module.exports = /* @ngInject */ function (
  $scope, $state, $stateParams,
  $injector, $controller,
  translationPrefix, Member) {
  var $ctrl = $controller('ModelController', {
    $scope: $scope,
    model: Member,
    translationPrefix: translationPrefix,
    options: {}
  })

  return $ctrl
}
