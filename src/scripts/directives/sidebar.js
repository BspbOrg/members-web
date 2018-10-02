require('../app').directive('sidebar', /* @ngInject */function () {
  return {
    templateUrl: '/views/_sidebar.html',
    scope: {},
    controller: /* @ngInject */function ($state, $stateParams) {
      this.isImportCollapsed = !$state.includes('auth.import')
      this.resetParams = function () {
        return Object.keys($stateParams).reduce(function (map, key) {
          map[key] = undefined
          return map
        }, {})
      }
    },
    controllerAs: '$ctrl'
  }
})
