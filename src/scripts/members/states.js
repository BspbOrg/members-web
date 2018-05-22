module.exports = /* @ngInject */function ($stateProvider) {
  $stateProvider
    .state('auth.members', {
      url: '/members',
      views: {
        'content': {
          templateUrl: '/views/members/list.html',
          controller: 'ListController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        model: /* @ngInject */function (Member) { return Member },
        translationPrefix: function () { return 'MEMBER' }
      }
    })
    .state('auth.members.detail', {
      url: '/{id:int}',
      views: {
        'content@auth': {
          templateUrl: '/views/members/detail.html',
          controller: 'ModelController',
          controllerAs: '$ctrl'
        }
      }
    })
    .state('auth.members.new', {
      url: '/new',
      views: {
        'content@auth': {
          templateUrl: '/views/members/detail.html',
          controller: 'ModelController',
          controllerAs: '$ctrl'
        }
      }
    })
}
