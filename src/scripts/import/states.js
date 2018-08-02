module.exports = /* @ngInject */function ($stateProvider) {
  $stateProvider
    .state('auth.import', {
      url: '/import',
      resolve: {
        defaultValues: function () {
          return []
        }
      },
      abstract: true
    })
    .state('auth.import.members', {
      url: '/members',
      views: {
        'content@auth': {
          templateUrl: '/views/import/import.html',
          controller: 'ImportController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        importItems: /* @ngInject */function (importApi) { return importApi.members },
        translationPrefix: function () { return 'MEMBER' },
        defaultValues: function () {
          return [
            {
              name: 'category',
              values: [
                {id: 'student', label: 'Студент'},
                {id: 'regular', label: 'Редовен'},
                {id: 'retired', label: 'Пенсионер'}
              ],
              label: 'MEMBER_IMPORT_CATEGORY'
            }
          ]
        }
      }
    })
    .state('auth.import.payments', {
      url: '/payments',
      views: {
        'content@auth': {
          templateUrl: '/views/import/import.html',
          controller: 'ImportController',
          controllerAs: '$ctrl'
        }
      },
      resolve: {
        importItems: /* @ngInject */function (importApi) { return importApi.payments },
        translationPrefix: function () { return 'PAYMENT' },
        defaultValues: function () {
          return [
            {
              name: 'paymentType',
              values: [
                {id: 'card', label: 'Банкова карта'},
                {id: 'epay', label: 'E-pay'},
                {id: 'bank', label: 'Платежно нареждане'},
                {id: 'office', label: 'в офиса на БДЗП'}
              ],
              label: 'PAYMENT_IMPORT_PAYMENT_TYPE'
            },
            {
              name: 'membershipType',
              values: [
                {id: 'regular', label: 'Индивидуално (лица над 18г.)'},
                {id: 'family', label: 'Семейно (родители и деца, живеещи на един адрес)'},
                {id: 'discounted', label: 'Младежи (под 18г.) и пенсионери'},
                {id: 'group', label: 'Групово членство (мин. 5 човека)'}
              ],
              label: 'PAYMENT_IMPORT_MEMBERSHIP_TYPE'
            }
          ]
        }
      }
    })
    .state('auth.import.family', {
      url: '/family',
      views: {
        'content@auth': {
          templateUrl: '/views/import/import.html',
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
