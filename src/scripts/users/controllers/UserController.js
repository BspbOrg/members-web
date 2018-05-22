var angular = require('angular')

module.exports = /* @ngInject */function ($scope, $state, $stateParams, $q, $timeout, $translate, api, ngToast, user, User, Raven) {
  var controller = this

  var id = $stateParams.id || $stateParams.fromId

  controller.data = id ? User.get({id: id}) : new User()
  controller.data.id = id
  controller.roles = [
    {id: 'user', label: $translate.instant('USER_DETAIL_ROLE_USER')},
    {id: 'admin', label: $translate.instant('USER_DETAIL_ROLE_ADMIN')}
  ]
  controller.languages = $translate.getAvailableLanguageKeys().map(function (key) {
    return {
      id: key,
      label: $translate.instant('LANGUAGE_' + key.toUpperCase())
    }
  })

  controller.save = function () {
    $q.resolve(controller.data)
      .then(function (user) {
        return user.$save()
      })
      .then(function (res) {
        controller.form.$setPristine()
        return res
      })
      .then(function (res) {
        ngToast.create({
          className: 'success',
          content: $translate.instant('Profile changes are saved successfully')
        })
        return res
      }, function (error) {
        Raven.captureMessage(JSON.stringify(error))
        ngToast.create({
          className: 'danger',
          content: '<p>' + $translate.instant('Could not save changes to profile') + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
        })
        return $q.reject(error)
      })
      .then(function (res) {
        $state.go('^.detail', {id: res.id}, {location: 'replace'})
      })
  }

  controller.changePassword = function () {
    $q.resolve(controller.data)
      .then(function (data) {
        return api.session.changePassword(user.getIdentity().id, data.oldPassword, data.newPassword)
      })
      .then(function (response) {
        controller.data = {}
        controller.form.$setPristine()
        ngToast.create({
          className: 'success',
          content: $translate.instant('Password changed successfully')
        })
      }, function (error) {
        Raven.captureMessage(JSON.stringify(error))
        ngToast.create({
          className: 'danger',
          content: '<p>' + $translate.instant('Password change failed') + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
        })
        return $q.reject(error)
      })
  };

  (function () {
    var timeout = false
    var deregister = $scope.$watch(function () {
      if (timeout) $timeout.cancel(timeout)
      timeout = $timeout(function () {
        deregister()
        controller.hideFake = true
      })
    }, angular.noop)
  })()
}
