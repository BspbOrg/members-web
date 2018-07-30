module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/partials/_pageFooter.html',
    transclude: {
      actions: '?actions'
    }
  }
}
