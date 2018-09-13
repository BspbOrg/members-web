module.exports = /* @ngInject */function ($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disable).)*$/)
}
