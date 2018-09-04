var mapValues = require('lodash.mapvalues')
var angular = require('angular')
module.exports = /* @ngInject */function ($state, $stateParams, $q, $translate, model, ngToast, Raven, translationPrefix) {
  var controller = this

  controller.canExport = true
  controller.filter = angular.copy($stateParams)
  delete controller.filter.id
  controller.maxExportCount = 20000
  controller.recordPerPage = 50
  controller.selectedRows = []
  controller.translationPrefix = translationPrefix
  controller.endOfPages = false

  controller.updateFilter = function () {
    var filter = mapValues(controller.filter, function (value) {
      return value && angular.isFunction(value.toJSON) ? value.toJSON() : value
    })
    if (angular.equals(filter, $stateParams)) { return }
    $state.go('.', filter, {
      notify: false
    })
    angular.extend($stateParams, filter)
    delete controller.filter.id
    controller.requestRows()
  }

  controller.toggleSelected = function (row) {
    if (!row) {
      var selected = !controller.allSelected
      controller.rows.forEach(function (row) {
        row.$selected = selected
      })
      controller.allSelected = selected
      controller.selectedRows = selected ? controller.rows : []
    } else {
      row.$selected = !row.$selected
      controller.selectedRows = controller.rows.filter(function (row) {
        return row.$selected
      })
      controller.allSelected = controller.selectedRows.length === controller.rows.length
    }
  }

  controller.deleteRows = function (rows) {
    $q.all(rows.map(function (row) {
      return row.$delete().then(function (res) {
        var idx = controller.rows.indexOf(row)
        if (idx !== -1) {
          controller.rows.splice(idx, 1)
        }
        return res
      })
    }))
      .then(function (res) {
        return $translate(controller.translationPrefix + '_SUCCESS_DELETE', {count: rows.length})
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
        $translate(controller.translationPrefix + '_ERROR_DELETE')
          .then(function (message) {
            ngToast.create({
              className: 'danger',
              content: '<p>' + message + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
            })
          })
        return $q.reject(error)
      })
  }

  function cancelPending () {
    controller.loading = false
    if (controller.pending && controller.pending.$cancelRequest) {
      controller.pending.$cancelRequest()
    }
    controller.pending = null
  }

  function fetch (query) {
    cancelPending()
    var q = controller.loading = angular.extend({}, query, {context: controller.context})
    controller.pending = model.query(q)
    controller.pending.$promise
      .then(function (rows) {
        if (!angular.equals(controller.loading, q)) return
        controller.count = rows.$$response && rows.$$response.data && rows.$$response.data.$$response && rows.$$response.data.$$response.count
        Array.prototype.push.apply(controller.rows, rows)
        controller.endOfPages = !rows.length
        return controller.rows
      })
      .finally(function () {
        if (angular.equals(controller.loading, q)) {
          controller.loading = false
          controller.pending = null
        }
      })
    return controller.pending.$promise
  }

  controller.export = function (outputType) {
    var selection = []
    if (controller.selectedRows && controller.selectedRows.length > 0 && !controller.allSelected && controller.canExport) {
      angular.forEach(controller.selectedRows, function (row) {
        selection.push(row.id)
      })
    }
    return model
      .export(angular.extend({}, controller.filter, {
        limit: -1,
        offset: 0,
        outputType: outputType,
        selection: selection
      }))
      .$promise
      .then(function (res) {
        return $translate(controller.translationPrefix + '_SUCCESS_EXPORT')
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
        $translate(controller.translationPrefix + '_ERROR_EXPORT')
          .then(function (message) {
            ngToast.create({
              className: 'danger',
              content: '<p>' + message + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
            })
          })
        return $q.reject(error)
      })
  }

  controller.requestRows = function () {
    controller.rows = []
    controller.endOfPages = false
    controller.filter.limit = controller.recordPerPage
    fetch(controller.filter)
  }
  if (!controller.endOfPages) {
    controller.requestRows()
  }

  controller.setRows = function (rows) {
    cancelPending()
    controller.rows = rows
    controller.endOfPages = true
  }

  controller.nextPage = function (count) {
    fetch(angular.extend({}, controller.filter, {
      offset: controller.rows.length,
      limit: count || controller.recordPerPage
    }))
  }
}
