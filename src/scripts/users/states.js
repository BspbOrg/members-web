module.exports = /* @ngInject */ function ($stateProvider) {
  $stateProvider

  /// ////////
  // Users //
  /// ////////
    .state('auth.users', {
      url: '/users',
      views: {
        'content': {
          templateUrl: '/views/users/list.html',
          controller: 'ListController',
          controllerAs: 'usersController'
        }
      },
      resolve: {
        model: /* @ngInject */function (User) {
          return User
        }
      }
    })

    /// ////////
    // Users //
    /// ////////
    .state('auth.users.detail', {
      url: '/{id:int}',
      views: {
        'content@auth': {
          templateUrl: '/views/users/detail.html',
          controller: 'UserController',
          controllerAs: 'user'
        }
      }
    })

    /// ////////
    // User New //
    /// ////////
    .state('auth.users.new', {
      url: '/new',
      views: {
        'content@auth': {
          templateUrl: '/views/users/detail.html',
          controller: 'UserController',
          controllerAs: 'user'
        }
      }
    })

    /// ////////
    // User Change Password //
    /// ////////
    .state('auth.users.changepw', {
      url: '/password',
      views: {
        'content@auth': {
          templateUrl: '/views/users/changepw.html',
          controller: 'UserController',
          controllerAs: 'user'
        }
      }
    })
}
