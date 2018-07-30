require('../app').directive('sidebar', /* @ngInject */function () {
  return {
    templateUrl: '/views/_sidebar.html',
    scope: {},
    controller: /* @ngInject */function ($scope, $q, $state, api) {
      this.isImportCollapsed = !$state.includes('auth.import')
    },
    controllerAs: '$ctrl'
  }
})
