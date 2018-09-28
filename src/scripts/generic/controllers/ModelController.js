var angular = require('angular')
var cleanUndefined = require('../utils/cleanUndefined')

/**
 * @param $state
 * @param $stateParams
 * @param $q
 * @param $translate
 * @param ngToast
 * @param Raven
 * @param model
 * @param translationPrefix
 * @param {Object} options
 * @param {Object} options.getArgs
 * @param {Object} options.modelArgs
 * @param {Object} options.listArgs
 */
module.exports = /* @ngInject */function (
  $state, $stateParams,
  $q, $translate, ngToast, Raven,
  model, translationPrefix, options) {
  var controller = this
  var Model = model

  if (!options) options = {}

  controller.translationPrefix = translationPrefix

  // if updating existing item, load the data
  if ($stateParams.id) {
    controller.data = Model.get(angular.extend({}, cleanUndefined(options.getArgs), { id: $stateParams.id }))
  } else {
    controller.data = new Model(angular.extend({}, cleanUndefined(options.modelArgs), cleanUndefined($stateParams)))
  }

  // load the previous/next items to allow navigating
  if (angular.isDefined($stateParams.offset)) {
    var q = angular.extend({}, options.listArgs, $stateParams, {
      offset: Math.max(0, $stateParams.offset - 1),
      limit: $stateParams.offset > 0 ? 3 : 2,
      id: null
    })
    Model
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
    return $q
      .resolve(new Model(controller.data))
      // process validation if any
      .then(function (data) {
        if (angular.isFunction(data.validate)) {
          return $q
            .resolve(data.validate())
            .then(function () { return data })
        }
        return data
      })
      // process preSave hook if any
      .then(function (data) {
        if (angular.isFunction(controller.preSave)) {
          return controller.preSave(data)
        }
        return data
      })
      // process save
      .then(function (data) {
        return data.$save()
      })
      .then(function (res) {
        if (controller.form) {
          controller.form.$setPristine()
        }
        controller.data = res
        $state.go('^', { id: res.id }, { location: 'replace' })
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
        return $translate(controller.translationPrefix + '_ERROR_SAVE')
          .then(function (message) {
            ngToast.create({
              className: 'danger',
              content: '<p>' + message + '</p><pre>' + (error && error.message ? error.message : JSON.stringify(error, null, 2)) + '</pre>'
            })
          })
      })
      .catch(angular.noop) // fix Possibly unhandled rejection
  }
}
