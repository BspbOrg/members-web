var module = require('../app')

module.config(/* @ngInject */function ($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true)

  $urlRouterProvider
    .otherwise('/')

  /// ///////////////////////
  // State Configurations //
  /// ///////////////////////

  // Use $stateProvider to configure your states.
  $stateProvider

    /// ////////
    // Login //
    /// ////////
    .state('login', {
      url: '/login?email',
      templateUrl: '/views/session/login.html',
      controller: 'SessionController',
      controllerAs: 'sessionController',
      title: 'TITLE_LOGIN'
    })

    /// ////////
    // Register //
    /// ////////
    .state('register', {
      url: '/register?email',
      templateUrl: '/views/session/register.html',
      controller: 'SessionController',
      controllerAs: 'sessionController',
      title: 'TITLE_REGISTER'
    })

    /// ////////
    // Forgot //
    /// ////////
    .state('forgot', {
      url: '/forgot?email',
      templateUrl: '/views/session/forgot.html',
      controller: 'SessionController',
      controllerAs: 'sessionController',
      title: 'TITLE_FORGOT_PASSWORD'
    })

    /// ////////
    // Reset //
    /// ////////
    .state('reset', {
      url: '/reset?email&token',
      templateUrl: '/views/session/reset.html',
      controller: 'SessionController',
      controllerAs: 'sessionController',
      title: 'TITLE_RESET_PASSWORD'
    })

    /// ////////
    // Auth //
    /// ////////
    .state('auth', {
      // parent: 'base',
      abstract: true,
      templateUrl: '/views/_layout.html',
      controller: 'MainController',
      controllerAs: 'main',
      data: {
        roles: [ 'admin' ]
      },
      resolve: {
        authorize: /* @ngInject */function (authorization) {
          return authorization.authorize()
        }
      }
    })

    /// ////////
    // Dashboard //
    /// ////////
    .state('auth.dashboard', {
      url: '/',
      views: {
        'content': {
          templateUrl: '/views/dashboard.html',
          controller: 'DashboardController as dashboard'
        }
      }
    })

    /// ////////
    // Users //
    /// ////////
    .state('auth.users', {
      url: '/users',
      views: {
        'content': {
          templateUrl: '/views/users/list.html',
          controller: 'UsersController',
          controllerAs: 'usersController'
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
})
  .run(/* @ngInject */function ($rootScope, $state, $stateParams, authorization, user) {
    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
      $rootScope.toState = toState
      $rootScope.toStateParams = toStateParams

      if (user.isResolved()) {
        if (!authorization.authorize()) { event.preventDefault() }
      }
    })
  })
