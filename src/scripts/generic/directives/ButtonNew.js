module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/partials/_buttonNew.html',
    scope: {
      translationPrefix: '@?',
      translationParams: '<?'
    },
    replace: true,
    bindToController: true,
    controller: /* @ngInject */function () {},
    controllerAs: '$ctrl'
  }
}
