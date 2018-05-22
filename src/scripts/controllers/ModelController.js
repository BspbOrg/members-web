var angular = require('angular')

require('../app').controller('ModelController', /* @ngInject */function ($state, $stateParams, $q, $translate, model, ngToast, Raven, translationPrefix) {
  var controller = this

  controller.translationPrefix = translationPrefix

  // if updating existing item, load the data
  if ($stateParams.id) {
    controller.data = model.get({id: $stateParams.id})
  }

  // load the previous/next items to allow navigating
  if (angular.isDefined($stateParams.offset)) {
    var q = angular.extend({}, $stateParams, {
      offset: Math.max(0, $stateParams.offset - 1),
      limit: $stateParams.offset > 0 ? 3 : 2,
      id: null
    })
    model
      .query(q).$promise
      .then(function (neighbours) {
        var lastIdx = 2
        if ($stateParams.offset > 0) {
          controller.prevParams = {
            offset: $stateParams.offset - 1,
            id: neighbours[0].id
          }
        } else {
          lastIdx = 1
        }
        if (neighbours.length > lastIdx) {
          controller.nextParams = {
            offset: $stateParams.offset + 1,
            id: neighbours[lastIdx].id
          }
        }
      })
  }

  controller.save = function () {
    var data = new model(controller.data) // eslint-disable-line new-cap
    if (angular.isFunction(data.preSave)) data.preSave()
    data
      .$save()
      .then(function (res) {
        if (controller.form) {
          controller.form.$setPristine()
        }
        controller.data = res
        $state.go('^.detail', {id: res.id}, {location: 'replace'})
        return res
      })
      .then(function (res) {
        return $translate(controller.translationPrefix + '_SUCCESS_SAVE')
          .then(function (message) {
            ngToast.create({
              className: 'success',
              content: message
            })
          })
          .then(function () { return res })
      })
      .catch(function (error) {
        Raven.captureMessage(JSON.stringify(error))
        $translate(controller.translationPrefix + '_ERROR_SAVE')
          .then(function (message) {
            ngToast.create({
              className: 'danger',
              content: '<p>' + message + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
            })
          })
          .catch(angular.noop) // fix Possibly unhandled rejection
        return $q.reject(error)
      })
  }
})
