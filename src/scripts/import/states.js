module.exports = /* @ngInject */function ($stateProvider) {
  $stateProvider
    .state('auth.import', {
      url: '/import',
      abstract: true
    })
    .state('auth.import.members', {
      url: '/members',
      views: {
        'content@auth': {
          templateUrl: '/views/import/members.html',
          controller: 'ImportController',
          controllerAs: '$ctrl'
        }
      }
    })
}
