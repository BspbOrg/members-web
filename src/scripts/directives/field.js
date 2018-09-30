/**
 * Created by groupsky on 11.01.16.
 */
var angular = require('angular')
var moment = require('moment')

require('../app').directive('field', /* @ngInject */function ($q) {
  var cnt = 0
  return {
    restrict: 'AE',
    scope: {
      name: '@?',
      label: '@?',
      labelXs: '@?',
      labelSm: '@?',
      labelMd: '@?',
      labelLg: '@?',
      placeholder: '@?',
      help: '@?',
      model: '=',
      nomenclature: '@?',
      select: '&?onSelect',
      match: '=?',
      format: '=?',
      context: '@?',
      values: '<?',
      min: '<?',
      max: '<?',
      newEntry: '&?onNewEntry',
      newEntryPlaceholder: '@?'
    },
    bindToController: true,
    require: '^form',
    templateUrl: function ($element, $attrs) {
      return '/views/fields/' + ($attrs.type || 'general') + '.html'
    },
    link: function ($scope, $element, $attrs, formCtrl) {
      $scope.form = formCtrl
    },
    controllerAs: 'field',
    controller: /* @ngInject */function ($scope, $attrs, $filter, $injector, $parse, $rootElement, $timeout, $translate) {
      var field = this

      while (!field.name || $rootElement.querySelectorAll('#' + field.name).length) {
        field.name = 'field' + ($attrs.type ? '_' + $attrs.type : '') + (cnt++)
      }

      field.$onInit = function () {
        field.form = $scope.form
        field.$attrs = $attrs
        field.type = $attrs.type
        field.required = angular.isDefined($attrs.required)
        field.readonly = 'readonly' in $attrs ? (angular.isDefined($attrs.readonly) ? $parse($attrs.readonly)($scope.$parent) : true) : false

        switch ($attrs.type) {
          case 'date':
            field.options = {}
            if (field.min) field.options.minDate = field.min
            if (field.max) field.options.maxDate = field.max
            break
        }
      }

      if ('disabled' in $attrs) {
        if (angular.isDefined($attrs.disabled)) {
          var disabledGetter = $parse($attrs.disabled).bind(null, $scope.$parent)
          $scope.$on('$destroy', $scope.$parent.$watch(disabledGetter, function (value) {
            field.disabled = value
          }))
        } else {
          field.disabled = true
        }
      } else {
        field.disabled = false
      }

      field.autocomplete = $attrs.autocomplete
      field.order = function (item) {
        return item && (item.label || item.toString()).replace(/\d+/g, function (digits) {
          return ((new Array(20).join('0')) + digits).substr(-20, 20)
        }).toLowerCase()
      }

      field.onNewEntry = function (entry) {
        if (angular.isFunction(field.newEntry)) {
          return field.newEntry({ entry: entry })
        }
      }

      field.onSelect = function (args, isAdding) {
        if (!args) {
          args = { isAdding: isAdding }
        } else {
          args = { arg: args, isAdding: isAdding }
        }
        $timeout(function () {
          if (angular.isFunction(field.select)) {
            field.select(angular.extend({}, args, { model: field.model }))
          }
        })
      }

      if ($attrs.valuesModel) {
        var valueModel = $injector.get($attrs.valuesModel)
        valueModel.query({ limit: -1, context: 'short' }).$promise.then(function (list) {
          field.values = $filter('orderBy')(list, field.order)
        })
      }

      Object.defineProperty(field, 'values', {
        get: function () { return field._values },
        set: function (v) {
          field._values = v.map(function (item) {
            return {
              id: item.id,
              label: item.label ? $translate.instant(item.label) : item.toString()
            }
          })
        }
      })

      switch ($attrs.type) {
        case 'date':
        case 'time':
          $scope.$watch('field.model', function () {
            if (angular.isString(field.model)) {
              field.model = moment(field.model).toDate()
            }
          })
          break
      }
    }
  }
})
