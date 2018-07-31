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
      },
      resolve: {
        importItems: /* @ngInject */function (importApi) { return importApi.members },
        translationPrefix: function () { return 'MEMBER' }
      }
    })
    .state('auth.import.payments', {
      url: '/payments',
      views: {
        'content@auth': {
          templateUrl: '/views/import/members.html',
          controller: 'ImportController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        importItems: /* @ngInject */function (importApi) { return importApi.payments },
        translationPrefix: function () { return 'PAYMENT' }
      }
    })
    .state('auth.import.family', {
      url: '/family',
      views: {
        'content@auth': {
          templateUrl: '/views/import/members.html',
          controller: 'ImportController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        importItems: /* @ngInject */function (importApi) { return importApi.family },
        translationPrefix: function () { return 'FAMILY' }
      }
    })
}
