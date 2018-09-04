module.exports = /* @ngInject */function ($stateProvider) {
  $stateProvider
    .state('auth.payments', {
      url: '/payments',
      views: {
        'content': {
          templateUrl: '/views/payments/list.html',
          controller: 'ListController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        model: /* @ngInject */function (Payment) { return Payment },
        translationPrefix: function () { return 'PAYMENT' }
      }
    })
    .state('auth.payments.detail', {
      url: '/{id:int}',
      views: {
        'content@auth': {
          templateUrl: '/views/payments/detail.html',
          controller: 'ModelController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        options: function () { return {getArgs: {context: 'view'}} }
      }
    })
    .state('auth.payments.detail.edit', {
      url: '/edit',
      views: {
        'content@auth': {
          templateUrl: '/views/payments/edit.html',
          controller: 'PaymentController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        options: function () { return {getArgs: {context: 'edit'}} }
      }
    })
    .state('auth.payments.new', {
      url: '/new?{billingMemberId:int}',
      views: {
        'content@auth': {
          templateUrl: '/views/payments/new.html',
          controller: 'PaymentController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        options: function () { return {getArgs: {context: 'edit'}} }
      }
    })
}
