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
                { id: 'student', label: 'Студент' },
                { id: 'regular', label: 'Редовен' },
                { id: 'retired', label: 'Пенсионер' }
              ],
              label: 'MEMBER_IMPORT_CATEGORY'
            }
          ]
        },
        fileExample: function () {
          return 'accessId; cardId; firstName; middleName; lastName; Country;  postalCode; address;   city;    email;          username; phone;        membershipStartDate; category\n' +
            '100;      500;    Ivan;      Ivanov;     Ivanov;   Bulgaria; 1330;       Address 1; Plovdiv; ivan@test.test; user1;    359899111222; 2017-05-20;          regular'
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
                { id: 'card', label: 'Банкова карта' },
                { id: 'epay', label: 'E-pay' },
                { id: 'bank', label: 'Платежно нареждане' },
                { id: 'office', label: 'в офиса на БДЗП' }
              ],
              label: 'PAYMENT_IMPORT_PAYMENT_TYPE'
            },
            {
              name: 'membershipType',
              values: [
                { id: 'regular', label: 'Индивидуално (лица над 18г.)' },
                { id: 'family', label: 'Семейно (родители и деца, живеещи на един адрес)' },
                { id: 'discounted', label: 'Младежи (под 18г.) и пенсионери' },
                { id: 'group', label: 'Групово членство (мин. 5 човека)' }
              ],
              label: 'PAYMENT_IMPORT_MEMBERSHIP_TYPE'
            }
          ]
        },
        fileExample: function () {
          return 'billingMember.accessId; paymentDate; amount; paymentType;   membershipType; paymentYear; isFamilyPayment; info\n' +
            '101;                    2018-05-08;  60;     банков превод; ;               2006;        1;               30 EUR'
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
        translationPrefix: function () { return 'FAMILY' },
        fileExample: function () {
          return 'cardId; familyCardId\n' +
            '100;    101\n' +
            '103;    105'
        }
      }
    })
}
