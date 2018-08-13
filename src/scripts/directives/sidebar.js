require('../app').directive('sidebar', /* @ngInject */function () {
  return {
    templateUrl: '/views/_sidebar.html',
    scope: {},
    controller: /* @ngInject */function ($state) {
      this.isImportCollapsed = !$state.includes('auth.import')
    },
    controllerAs: '$ctrl'
  }
})
