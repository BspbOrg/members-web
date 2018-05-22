/**
 * Created by groupsky on 08.01.16.
 */

var mapValues = require('lodash.mapvalues')
var angular = require('angular')
require('../app').controller('ListController', /* @ngInject */function ($state, $stateParams, $q, $translate, model, ngToast, Raven) {
  var controller = this

  controller.recordPerPage = 50
  controller.maxExportCount = 20000
  controller.filter = angular.copy($stateParams)
  controller.canExport = true

  controller.updateFilter = function () {
    var filter = mapValues(controller.filter, function (value) {
      return value && angular.isFunction(value.toJSON) ? value.toJSON() : value
    })
    if (angular.equals(filter, $stateParams)) { return }
    $state.go('.', filter, {
      notify: false
    })
    angular.extend($stateParams, filter)
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
    })).then(function () {
      ngToast.create({
        className: 'success',
        content: $translate.instant('Deleted {{num}} records', { num: rows.length })
      })
      controller.selectedRows = []
    }, function (error) {
      Raven.captureMessage(JSON.stringify(error))
      ngToast.create({
        className: 'danger',
        content: '<p>' + $translate.instant('Error during deletion') + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
      })
      return $q.reject(error)
    })
  }

  function fetch (query) {
    controller.loading = true
    return model.query(angular.extend({}, query, { context: controller.context })).$promise
      .then(function (rows) {
        controller.count = rows.$$response.data.$$response.count
        Array.prototype.push.apply(controller.rows, rows)
        controller.endOfPages = !rows.length
        return controller.rows
      })
      .finally(function () {
        controller.loading = false
      })
  }

  controller.export = function (outputType) {
    var selection = []
    if (controller.selectedRows && controller.selectedRows.length > 0 && !controller.allSelected && controller.canExport) {
      angular.forEach(controller.selectedRows, function (row) {
        selection.push(row.id)
      })
    }
    return model.export(angular.extend({}, controller.filter, {
      limit: -1,
      offset: 0,
      outputType: outputType,
      selection: selection
    })).$promise
      .then(function (res) {
        ngToast.create({
          className: 'success',
          content: $translate.instant('You will be notified by email when your export is ready')
        })
      })
      .catch(function (error) {
        ngToast.create({
          className: 'danger',
          content: '<p>' + $translate.instant('Error during export') + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error, null, 2)) + '</pre>'
        })
      })
  }

  controller.requestRows = function () {
    controller.rows = []
    controller.endOfPages = false
    controller.filter.limit = controller.recordPerPage
    fetch(controller.filter)
  }
  controller.requestRows()

  controller.nextPage = function (count) {
    fetch(angular.extend({}, controller.filter, {
      offset: controller.rows.length,
      limit: count || controller.recordPerPage
    }))
  }
})
