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
  controller.count = null

  controller.updateFilter = function () {
    var filter = mapValues(controller.filter, function (value) {
      return value && angular.isFunction(value.toJSON) ? value.toJSON() : value
    })
    delete filter.id
    if (angular.equals(filter, $stateParams)) { return }
    filter.filtersOpen = controller.filtersOpen
    $state.go('.', filter, {
      notify: false
    })
    // controller.requestRows()
  }

  controller.filtersCount = function () {
    return Object
      .keys(controller.filter)
      .filter(function (key) {
        return key !== '#' && key !== 'limit' && key !== 'offset' && controller.filter[key] && key !== 'filtersOpen'
      })
      .length
  }
  controller.filtersOpen = controller.filtersCount() > 0

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
    controller.exportUrlCsv = controller.exportUrl('csv')
    controller.exportUrlCsvCard = controller.exportUrl('csv', { context: 'card-print' })
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
        return $translate(controller.translationPrefix + '_SUCCESS_DELETE', { count: rows.length })
          .then(function (message) {
            ngToast.create({
              className: 'success',
              content: message
            })
          })
          .then(function () { return res })
      })
      .catch(function (error) {
        Raven.captureMessage(JSON.stringify(error.data || error))
        $translate(controller.translationPrefix + '_ERROR_DELETE')
          .then(function (message) {
            ngToast.create({
              className: 'danger',
              content: '<p>' + message + '</p><pre>' + (error && error.data ? error.data.error : JSON.stringify(error.data || error, null, 2)) + '</pre>'
            })
          })
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
    var q = controller.loading = angular.extend({}, query, { context: controller.context })
    controller.pending = model.query(q)
    controller.pending.$promise
      .then(function (rows) {
        if (!angular.equals(controller.loading, q)) return
        controller.count = rows.$$response && rows.$$response.data && rows.$$response.data.$$response && rows.$$response.data.$$response.count
        controller.rows = [].concat(controller.rows, rows)
        controller.endOfPages = !rows.length
        controller.loading = false
        controller.pending = null
      })
    return controller.pending.$promise
  }

  controller.exportUrl = function (outputType, opts) {
    var selection = []
    if (controller.selectedRows && controller.selectedRows.length > 0 && !controller.allSelected && controller.canExport) {
      selection = controller.selectedRows.map(function (row) { return row.id })
    }
    return model.exportUrl(outputType, angular.extend(
      {},
      controller.filter,
      {
        limit: -1,
        offset: undefined,
        outputType: outputType,
        context: 'export'
      },
      selection ? { selection: selection } : {},
      opts || {}))
  }

  controller.export = function (outputType) {
    var selection = []
    if (controller.selectedRows && controller.selectedRows.length > 0 && !controller.allSelected && controller.canExport) {
      selection = controller.selectedRows.map(function (row) { return row.id })
    }
    return model
      .export(angular.extend({}, controller.filter, {
        limit: -1,
        offset: 0,
        outputType: outputType
      }, selection ? { selection: selection } : {}))
      .$promise
      .then(function (res) {
        return $translate(controller.translationPrefix + '_SUCCESS_EXPORT')
          .then(function (message) {
            if (!message.type) return message
            return $translate(message.type, message)
          })
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

  controller.exportUrlCsv = controller.exportUrl('csv')
  controller.exportUrlCsvCard = controller.exportUrl('csv', { context: 'card-print' })

  controller.requestRows = function () {
    controller.rows = []
    controller.count = null
    controller.endOfPages = false
    controller.filter.limit = controller.recordPerPage
    controller.filter.order = controller.order && controller.order.key
    controller.filter.asc = controller.order && !controller.order.reverse
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

  controller.order = {}
  controller.orderBy = function (event, key) {
    var element = angular.element(event.currentTarget)

    if (controller.order.elem) { controller.order.elem.removeClass('sorted asc desc') }
    controller.order.reverse = controller.order.key === key && !controller.order.reverse
    controller.order.key = key
    controller.order.elem = element

    element.addClass('sorted').addClass(controller.order.reverse ? 'desc' : 'asc')
    controller.requestRows()
  }
}
