require('../app').service('localization', /* @ngInject */function ($rootScope, $translate) {
  $rootScope.$watch('$user.getIdentity().language', function (newVal) {
    if (newVal) {
      $translate.use(newVal)
    }
  })
  return this
})
