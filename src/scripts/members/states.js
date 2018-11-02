module.exports = /* @ngInject */function ($stateProvider) {
  $stateProvider
    .state('auth.members', {
      url: '/members?q&category&expiredMembership&paymentFromDate&paymentToDate',
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
          controller: 'MemberController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        options: function () { return { getArgs: { context: 'view' } } }
      }
    })
    .state('auth.members.detail.edit', {
      url: '/edit',
      views: {
        'content@auth': {
          templateUrl: '/views/members/edit.html',
          controller: 'MemberController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        options: function () { return { getArgs: { context: 'edit' } } }
      }
    })
    .state('auth.members.new', {
      url: '/new',
      views: {
        'content@auth': {
          templateUrl: '/views/members/edit.html',
          controller: 'ModelController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        options: function () { return { getArgs: { context: 'edit' } } }
      }
    })
}
