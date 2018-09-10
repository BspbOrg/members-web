module.exports = /* @ngInject */function ($translate, $filter) {
  var currencyFilter = $filter('currency')

  return function (value) {
    return currencyFilter(value, $translate.instant('CURRENCY_SUFFIX'))
  }
}
