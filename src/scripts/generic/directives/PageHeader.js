module.exports = /* @ngInject */function () {
  return {
    templateUrl: '/views/partials/_pageHeader.html',
    transclude: {
      actions: '?actions'
    }
  }
}
